---
slug: v50-i2s-from-scratch-teensy
title: "I2S Without Training Wheels: Writing Teensy 4.1 Audio from Scratch (and Surviving the Physics)"
authors: [mati]
tags: [embedded, audio, i2s, teensy, dma, signal-integrity, debugging, cpp, baremetal, measurements]
---

In v5.0 I made a deliberate choice: **no Teensy Audio Library, no “it just works” shortcuts**.  
If eduLAB is a DSP education sandbox, then the audio pipeline itself can’t be a black box.

<!-- truncate -->

## The Context

### What v5.0 Actually Is (and what it is NOT)

v5.0 is not a feature update.

It’s the platform leap: taking everything that worked on ESP32 in v4.0 and proving that the architecture is real by porting it to a much more serious DSP platform — **Teensy 4.1**.

- v5.0 = migration (ESP32 → Teensy 4.1), same functionality, stronger foundation.
- No TFT. No new UI. No “cool features”.
- Just one question: **can I run a real audio pipeline on real hardware, from scratch, and understand every bit?**

:::info
This post documents the *real* work: SAI registers, DMA ping-pong, ISR design patterns, and the analog reality of driving MHz clocks through breadboard wires.
:::

### The “No Black Boxes” Constraint

The Teensy Audio Library solves this in minutes.

That’s the problem.

I did use the library — not as a dependency — but as a **reference manual**: “How does Paul configure SAI? What does DMA do? Which registers matter?” Then I rewrote my own implementation inside `AudioEngineTeensy.cpp`, with full awareness of every register write.

---

## Timeline Overview (5 days that changed everything)

### Day 1 — Multi-board architecture in PlatformIO

I created a `v5-teensy` branch and turned PlatformIO into a multi-board project:

- `[env:esp32]` still exists (v4.0 baseline)
- `[env:teensy41]` added (v5.0 target)

The first “adult” lesson hit immediately:

**PlatformIO compiles everything in `lib/` for every environment by default.**  
So if you drop ESP32-specific code into `lib/`, Teensy will happily try to compile it and explode.

The fix is not spamming `#ifdef` across the codebase.  
The fix is telling the build system the truth: `lib_ignore`.


![Platform IO multi env screenshot](/img/projects/V5/platformIOscreenshotV5.0.png)

### Day 2 — First SAI bring-up attempt

This was the day I learned the difference between “writing C++” and “driving silicon”.

The SAI peripheral is not a function call. It’s a hardware state machine that does nothing unless:

- its clock is enabled,
- its pins are muxed correctly,
- its frame format is configured,
- and its DMA feed is stable.

### Day 3 — DMA ping-pong enters the chat

Even if you get BCK/LRCK toggling, you still don’t have audio.

Audio is a real-time stream. The CPU is not allowed to “try its best”.  
So I moved to the correct model: two buffers (ping-pong), DMA feeds SAI from one, and the ISR refills the other.

### Day 4 — The Great Recession (everything broke)

Hard resets. Corrupted stacks. Phantom bugs. A DAC that probably died.

This is where “I’m good at coding” stops helping, and “I can debug systems” begins.

### Day 5 — Proof of Life: a clean 440Hz sine

After the dust settled, I finally reached the moment that matters:

**A clean 440Hz sine wave**  
**Streamed via DMA ping-pong**  
**Through PCM5102A**  
**Without the Audio Library**


![DAC POC 440Hz sine](/img/projects/V4/DAC-POC-demo-wave.jpg)

---

## Phase 1 — Build System & Code Portability (PlatformIO done right)

### The solution: libraries as “platform adapters”

The lazy solution is scattering `#ifdef TEENSY_BUILD` everywhere, slowly turning the codebase into spaghetti. That kills portability.

So instead, I treated platforms like **adapters**:

- `lib/` contains reusable architecture and DSP logic.
- Platform glue lives behind an interface.
- Only the correct implementation gets compiled per environment.

```cpp
#ifndef AUDIOENGINE_ADAPTER_MINI_H
#define AUDIOENGINE_ADAPTER_MINI_H

#include <Arduino.h>
#include "Waveforms/WaveformGenerator.h"

class StateMachine;     // forward decl (same as your real header)
class Potentiometer;    // forward decl

class AudioEngine {
public:
    // Debug: DMA interrupt counter (Teensy)
    volatile uint32_t isrCount = 0;

    // Constructor: pins define the hardware backend wiring
    AudioEngine(int bck, int lrck, int din);

    // Bring up audio pipeline (ESP32: I2S driver / Teensy: SAI + DMA)
    void begin();

    // Control loop hook (kept identical across platforms)
    void update(const StateMachine &stateMachine,
                const Potentiometer &potPitch,
                const Potentiometer &potTone);

    // Core control API (portable “engine-facing” interface)
    void setWaveform(int voiceIndex, WaveformGenerator* waveform);
    void setFrequency(int voiceIndex, float freq);
    void setAmplitude(int voiceIndex, float amp);
    void setMasterVolume(float vol);
    void noteOn(int voiceIndex, float freq, float amp);
    void noteOff(int voiceIndex);

    // Optional: feedback system
    void playFeedbackTone(float frequency, int durationMs);

private:
    // Platform backend differs, but the interface remains stable.
};

#endif
```

![repo tree visualazation](/img/projects/V5/repo-tree-V5.png)

This is where v4.0’s OOP architecture paid off: same engine architecture, totally different hardware backend.

---

## Phase 2 — I2S on Teensy from Scratch (SAI registers)

### What “I2S” really means on i.MX RT1062

On Teensy 4.1, “I2S” is basically the SAI transmitter, bit clocks (BCK / SCK), word select (LRCK), and the data line (DIN).

A few key realities:

- **Clock gating:** If you didn’t enable the peripheral clock (e.g. in `CCM_CCGR5`), you’re writing to a dead block.
- **Frame format:** 32-bit words, MSB first, 2 channels, stereo framing.
- **Bitwise discipline:** Register updates are mask-and-or: `reg = (reg & ~MASK) | VALUE`.

### Clocking: where does 44.1kHz actually come from?

At CD-quality (44,100 Hz, 16-bit, 2 channels):

$$
BCK = 44100 \cdot 16 \cdot 2 = 1.4112\text{ MHz}
$$

And if you also route MCLK, you’re suddenly in the “MHz territory where breadboards stop behaving”.

![clock derivation ](/img/projects/V5/i2s-clock-calc-V5.png)

### Pin mux: the invisible failure mode

You can configure SAI perfectly and still see flat lines on the scope — because on i.MX RT, pins don’t “become I2S” unless their ALT function matches the SAI signal you need.

Pin mux bugs are brutal because they don’t crash. They just silently do nothing.

![teensy 4.1 pinout](/img/projects/V5/teensy4.1pinout.png)

---

## Phase 3 — DMA Ping-Pong Audio (the real-time leap)

### Memory Architecture: The `DMAMEM` trap (OCRAM vs DTCM)

Teensy 4.1 has multiple memory regions that behave very differently:

- **DTCM (RAM1):** insanely fast for CPU, but not DMA-friendly.
- **OCRAM (RAM2):** slower, but DMA-visible.

So you can fill a buffer perfectly… and DMA still reads stale/invalid data because the buffer lives in the wrong memory region.

How did I know it was a memory-region problem and not “just another DMA bug”?  
Because the DMA was clearly *streaming something* (clocks and transfer cadence were correct), but the output sounded like repeating garbage or pure silence instead of my live sine wave. The CPU was updating a buffer in one memory region, while DMA was reading from another.

Cache maintenance (flush/invalidate) alone wasn’t enough — the buffers had to live in DMA-visible memory using `DMAMEM`.

```cpp
#include <DMAChannel.h>

static DMAChannel dma;

DMAMEM static int32_t buffer_A[256] __attribute__((aligned(32)));
DMAMEM static int32_t buffer_B[256] __attribute__((aligned(32)));

static volatile bool dma_playing_A = true;
static int32_t* _fillTarget = nullptr;

AudioEngine* AudioEngine::_instance = nullptr;

// BUFFER_SIZE = 256 int32 words = 128 stereo frames (L/R interleaved)
```
### The DMA “One-Shot” bug

At one point DMA “worked”… for exactly one buffer. It played 512 bytes and then died forever.

When a DMA channel finishes a major loop, it reaches a completion state and effectively “locks” until explicitly re-armed. If you don’t re-arm it in the ISR, it never restarts.

```cpp
void AudioEngine::dmaISR() {
    dma.clearInterrupt();
    dma.clearComplete(); // CRITICAL: Clear the DMA DONE flag

    if (!_instance) return;          // Guard first
    _instance->isrCount++;           // Debug counter

    // Swap ping-pong buffers:
    // - DMA currently playing one buffer
    // - We refill the other one
    if (dma_playing_A) {
        _fillTarget = buffer_A;                      // refill A next
        dma.sourceBuffer(buffer_B, sizeof(buffer_B)); // DMA will play B now
    } else {
        _fillTarget = buffer_B;                      // refill B next
        dma.sourceBuffer(buffer_A, sizeof(buffer_A)); // DMA will play A now
    }
    dma_playing_A = !dma_playing_A;

    dma.enable();                 // CRITICAL: re-arm DMA for the next block

    _instance->fillBuffer();      // Fill the non-playing buffer
    arm_dcache_flush_delete(_fillTarget, sizeof(buffer_A)); // ensure DMA sees new data
}
```

### ISR design rule #1: no Serial, ever

I tried printing inside the ISR.

That created a fake horror show: crashes that looked like memory bugs, timing collapse, and violations that hid the real issue.

ISR rules are strict: deterministic, minimal, no allocations, no IO.

---

## The Great Recession — Debugging Hard Resets Like a Grown-Up

CrashReport showed `DACCVIOL` at `0xF380F74C` — an address that strongly suggested corrupted pointers / control flow.

```cpp
CrashReport: DACCVIOL @ 0xF380F74C
```

I had two options: guess, or prove. So I escalated into real debugging tools.

```cpp
arm-none-eabi-addr2line -e .pio/build/teensy41/firmware.elf -f -C 0x00000332

arm-none-eabi-objdump -S -d .pio/build/teensy41/firmware.elf \
  --start-address=0x000002d8 --stop-address=0x0000036c

arm-none-eabi-nm -n .pio/build/teensy41/firmware.elf | grep -E "fillBuffer|_fillTarget|buffer_A|buffer_B|dmaISR"
```

You don’t think. You locate.

### Root causes worth documenting

#### 1) Buffer overflow / stack corruption

`BUFFER_SIZE` was defined as 512, but `buffer_A` was only a 256-element array.  
The stereo filling loop `_fillTarget[i * 2 + 1]` pushed the index up to 511.

That didn’t just corrupt audio — it overwrote `_fillTarget` itself (a pointer). That’s the kind of bug that doesn’t merely “make noise”; it corrupts control flow (function pointers / vtables), so the failure mode looks like random hardware resets.

#### 2) Data alignment: 16-bit vs 32-bit (Little-Endian trap)

Why 32-bit if I’m generating 16-bit audio? Because the SAI frame format is configured for a 32-bit word width, and the PCM5102A DAC expects MSB-aligned data.

On a little-endian system, writing a 16-bit sample into a 32-bit slot lands it in the LSB — but I2S transmits MSB first.  
Result: the DAC receives “perfect silence” (16 MSB zeros).

Fix: use `int32_t` buffers and shift into the MSB lane.

```cpp
#include "../../include/Consts.h" // SAMPLE_RATE=44100, BUFFER_SIZE=256

void AudioEngine::fillBuffer() {
    bool anyActive = false;

    // buffer size is 256 int32 words => 128 stereo frames
    for (int i = 0; i < BUFFER_SIZE / 2; i++) {
        float mixedSample = 0.0f;

        for (Voice &voice : voices) {
            if (voice.getIsActive() && voice.getWaveform() != nullptr) {
                anyActive = true;
                mixedSample += voice.getNextSample();
            }
        }

        mixedSample *= masterVolume;

        // Convert to 16-bit PCM, then shift into the upper 16 bits of the 32-bit word
        int32_t sampleValue = (int32_t)(mixedSample * 32767.0f);

        _fillTarget[i * 2]     = sampleValue << 16; // Left
        _fillTarget[i * 2 + 1] = sampleValue << 16; // Right
    }

    if (audioState == FEEDBACK_TONE) {
        fillFeedbackBuffer();
        return;
    }

    if (!anyActive) {
        memset(_fillTarget, 0, sizeof(buffer_A)); // Silence
        return;
    }
}
```

#### 3) Pinmux / ALT mode — round 2 (the pin journey)

“ALT3 on pin 26” looked reasonable, but ALT3 on that pin is `SAI1_TX_BCLK`, not `TX_DATA`.

I was sending audio data into a clock pin.

The correct pin for `SAI1_TX_DATA0` was pin 7.

---

## Signal Integrity — When 3.3V Digital Turns Into 6V Spikes

The breadboard isn’t a circuit. It’s an RF experiment.

Fast edges + long wires + shared ground rails = parasitics. Every wire has inductance, every pin has capacitance, and you get ringing from an underdamped RLC system:

$$
V = L \cdot \frac{di}{dt}
$$

I saw spikes reaching ~6.5V on a 3.3V system — which is exactly how you kill a DAC.

(Measurement honesty: a standard scope probe’s long ground lead can exaggerate ringing. I used the shortest ground possible to see the real signal.)

![SCK V5 preLPF](/img/projects/V5/SCK-v5-preLPF.jpg)

### The fix: series resistors & physical grounding

Series resistors slow the edge rate just enough to stop the RLC from exploding.

| Line | Resistor | Why |
|---|---:|---|
| SCK | 270Ω | High frequency (~11MHz), severe ringing |
| BCK | 270Ω | Medium frequency (~1.4MHz), still sharp edges |
| DIN | 220Ω | Data line |
| LRCK | 220Ω | Large overshoot despite low frequency |

Then came crosstalk: parasitic capacitance between adjacent wires:

$$
I = C \cdot \frac{dV}{dt}
$$

What actually worked was routing physical GND wires between SCK and BCK to sink coupling to ground, plus cleaner/tighter routing on the data line.

![SCK V5 preLPF](/img/projects/V5/SCK-v5-postLPF.jpg)

---

## The Physical Reality

Before verification, this is what the system actually looked like on the bench.

Teensy 4.1 driving a PCM5102A over breadboard I2S at ~1.4112 MHz BCK, with series damping resistors and deliberately routed twisted ground returns between high-edge-rate lines. The wiring isn’t aesthetic — it’s signal-integrity mitigation to keep overshoot below ~3.9 V.

![Teensy 4.1 driving PCM5102A over breadboard with series resistors and twisted ground returns](/img/projects/V5/breadboard-routing.jpg)

---

## Verification — The Only Section That Matters

### Digital verification (clocks)

Targets met on the scope:

- LRCK = 44.1kHz
- BCK = 1.4112MHz
- DATA sampled on BCK edges

![i2s transmission](/img/projects/V5/i2s-transmission-revised.png)

### Audio verification (signal)

Clean sine 440Hz out of the PCM5102A.

ISR rate is exactly correct for buffer length (128 stereo frames):

$$
ISR\_rate = \frac{44100}{128} \approx 344\text{ Hz}
$$

(That 128-frame size is a deliberate tradeoff between audio latency and ISR CPU overhead.)

![v5 44Hz scope shot](/img/projects/V5/v5-440Hz.jpg)

---

## Lessons Learned (Rules I’m keeping forever)

1. **“No Black Boxes” forces you to learn the real system.** Painful, but permanent knowledge.
2. **If audio isn’t DMA-driven, it isn’t real-time.** Polling is pretending.
3. **ISR code must be deterministic and silent.** No Serial. No drama.
4. **Pin mux errors are not beginner mistakes — they’re invisible mistakes.** The worst kind.
5. **Breadboards + MHz clocks = signal integrity problems by default.** Assume ringing until proven otherwise.
6. **Debugging tools (`nm`/`objdump`/`addr2line`) are part of embedded.** Not “extra”.

---

## Open Issue: Mechanical Pops

The pipeline is perfectly stable, but moving the cables on the breadboard causes mechanical pops.

This isn’t a code issue — it’s microphonic/triboelectric noise from cheap jumper wires, breadboard contact noise, and capacitive coupling.

It’s a stark reminder of why we need a real PCB.

---

## Next Steps — Completing v5.0 (18-day plan)

- **Phase 3:** Port the DSP engine (WaveformGenerator + Voice + mixer).
- **Phase 4:** Teensy-specific upgrades (MCLK, jitter, headroom measurements).
- **Phase 5:** Port the UI (menu, encoder, OLED).
- **Phase 6:** Long-run stability tests + documentation.

Once v5.0 is stable, v6.0 can finally be “experience” — but only after the foundation is bulletproof.

---

