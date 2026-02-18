---
slug: v40-hi-fi-leap-dac-journey
title: "eduLAB v4.0: The Hi-Fi Leap — 17 Days of I2S, DMA Buffers, and Real-Time Humility"
authors: [mati]
tags: [embedded, esp32, i2s, dac, pcm5102a, dsp, realtime, freertos, debugging, audio, architecture]
---

import PDFViewer from '@site/src/components/PDFViewer';
import useBaseUrl from '@docusaurus/useBaseUrl';

PWM got me “sound”. It did not get me **audio**.

The day I plugged a PCM5102A into a breadboard, eduLAB stopped being a buzzer experiment and became a real signal chain: **44.1kHz, 16-bit, stereo clocks, DMA buffers, and a brutal real-time budget**.

This post documents the 17 days it took to make that transition stable.

<!-- truncate -->

---

## From v3.8 to v4.0 — The Line in the Sand

Before the DAC, there was PWM.

![v3.8 final before v4.0](/img/projects/V4/V3.8-final-before-V4.0.jpg)

v3.8 taught switching behavior, timing, and how digital signals approximate analog reality. But PWM reconstruction relies on parasitics and load characteristics. It is educational — not architectural.

v4.0 is where the system became:

- Sample-accurate  
- Clock-verified  
- DMA-driven  
- Architecturally separated  

---

## The v4.0 Hardware Reality

### Breadboard Integration

![v4.0 breadboard zoom](/img/projects/V4/v40-breadboard-wiring.jpg)

![v4.0 DAC wiring close-up](/img/projects/V4/v40-dac-wiring.jpg)

This is not a PCB.  
This is deliberate exposure to parasitics.

The PCM5102A module is strapped:

| Pin | Connection | Purpose |
|------|------------|----------|
| FLT | GND | filter mode |
| FMT | GND | I2S format |
| XSMT | 3.3V | disable soft mute |
| SCK | GND | internal clock mode |

I2S wiring:

| Signal | ESP32-S3 GPIO |
|--------|---------------|
| BCK | GPIO 39 |
| LRCK | GPIO 38 |
| DIN | GPIO 40 |

---

## Official v4.0 Schematic

This is the logical schematic (not breadboard chaos).

<div style={{ marginBottom: '2rem' }}>
  <PDFViewer fileUrl={useBaseUrl('/files/schematic-v4.0.pdf')} />

  <div style={{ textAlign: 'left', marginTop: '0.5rem', fontSize: '1rem' }}>
    <a href={useBaseUrl('/files/schematic-v4.0.pdf')} download="schematic-v4.0.pdf">
      Click here to download the full PDF
    </a>
  </div>
</div>

---

## I2S — Measured, Not Assumed

If you don’t measure the clocks, you don’t “have I2S”.

### The Required Relationship

$$
\textbf{BCK} = F_s \cdot bits \cdot channels
$$

$$
= 44100 \cdot 16 \cdot 2 = 1{,}411{,}200 \text{ Hz}
$$

$$
\textbf{LRCK} = F_s = 44{,}100 \text{ Hz}
$$

### Scope Verification

#### LRCK = 44.1kHz

![LRCK scope](/img/projects/V4/LRCK=44.1kHz.jpg)

#### BCK ≈ 1.4112MHz

![BCK scope](/img/projects/V4/BCK=1.4112MHz.jpg)

Notice the ringing on BCK.

There is no series damping resistor.  
There are long jumpers.  
There is breadboard capacitance and inductance.

This is expected behavior in this topology.

---

## I2S Frame Structure

![I2S transmission diagram](/img/projects/V4/i2s-transmission.jpg)

Swapping BCK and LRCK once cost me an entire debugging session.

The scope solved it instantly.

---

## The First Clean Analog Output

The first moment of real audio:

![DAC POC 440Hz sine](/img/projects/V4/DAC-POC-demo-wave.jpg)

This was the first time eduLAB output a true reconstructed waveform — not PWM residue.

---

## Square Wave + Ringing (Physics Reminder)

![Square wave ringing](/img/projects/V4/SquareWave+ringing.jpg)

This is what harmonics + bandwidth limits + non-ideal edges look like.

Now add Nyquist:

$$
f_{max} = \frac{F_s}{2}
$$

At 44.1kHz:

$$
f_{max} = 22.05kHz
$$

Anything beyond that folds back.

![Nyquist folding diagram](/img/projects/V4/folding-def-nyquist.jpg)

v4.0 does naive synthesis deliberately.  
Band-limited synthesis is future work.

---

## DMA: The Conveyor Belt You Cannot Stop

![DMA conveyor diagram](/img/projects/V4/DMA_diagram.png)

The DAC consumes samples continuously.  
If you fail to refill on time:

Underrun → Click → Humiliation.

---

## Buffer Budget Math (The Dictator)

Buffer chunk: 128 stereo frames

$$
T_{buffer} = \frac{128}{44100}
$$

$$
T_{buffer} \approx 2.9ms
$$

In practice, effective audio window ≈ 5–6ms.

OLED update time:

~10–12ms

10ms > 5ms  
→ starvation  
→ click

This was not a bug.  
It was math.

---

## Phase Accumulator DSP Core

$$
\Delta\phi = 2\pi \frac{f}{F_s}
$$

$$
\phi_{n+1} = \phi_n + \Delta\phi
$$

Wrap at \(2\pi\).

![Phase accumulator diagram](/img/projects/V4/v40-phase-accumulator.png)

Waveforms are normalized:

$$
x \in [-1,1]
$$

Scaled:

$$
y = \text{clip}(x \cdot 32767)
$$

---

## Logarithmic Frequency Mapping (Fixing UX with Math)

Linear mapping feels robotic.

Used mapping:

$$
f(t)=f_{min}\cdot\left(\frac{f_{max}}{f_{min}}\right)^t
$$

$$
t = \frac{ADC}{4095}
$$

![Linear vs Log mapping](/img/projects/V4/v40-log-mapping.png)

Bass requires resolution.  
Log mapping restores musical feel.

---

## The Architectural Fix: Dual-Core Separation

![Dual-core architecture diagram](/img/projects/V4/v40-dual-core.png)

Core 0:
- Audio engine
- i2s_write()

Core 1:
- Encoder
- Pots
- OLED (blocking allowed)

After separation:  
No audible underruns.

No hacks.  
Architecture.

---

## Polyphony POC (Headroom Matters)

`MAX_VOICES = 4`

POC demo: 3 voices (major chord).

Mixer:

$$
x_{mix} = \frac{1}{N}\sum x_i
$$

Safe scaling.  
No clipping.

---

## The Bug Wall (No Screenshots, Just Reality)

- NULL pointer in `i2s_write()` → Guru Meditation
- Watchdog reset when entering MENU (UI blocking)
- `map()` integer truncation destroying frequency resolution
- Noise waveform triggering mutex panic (FreeRTOS contention)
- Mixer accumulator not reset → runaway amplitude
- Swapped I2S wires
- Phantom encoder events from capacitive coupling

Not one of these was solved by guessing.

All were solved by measurement and reasoning.

---

## Known Breadboard Limitations

- I2S ringing (long jumpers)
- Rail noise
- ADC jitter (EMA mitigated)
- Mechanical encoder noise (solved logically)

---

## v4.0 Final Bench

![v4.0 final bench shot](/img/projects/V4/v40-final-bench.jpg)

---

## What the DAC Actually Taught Me

The DAC was not the hard part.

The hard part was learning that:

- Audio is timing  
- Timing is buffers  
- Buffers are budgets  
- Budgets are architecture  

17 days was the cost of respecting that.

v4.0 is complete.

And for the first time, eduLAB produces real audio — not fast toggling.