---
sidebar_position: 3
title: Software Architecture
---

# Software Architecture — v4.0

> Documentation of the current software implementation (v4.0 “The Hi-Fi Leap”).

---

## 1. What This Page Documents

This page describes the **v4.0 software architecture** exactly as it exists now — not as planned, not as imagined.

v4.0 marks the transition from:

- Monolithic procedural firmware (v3.8)
- PWM-based audio tricks

to:

- True I2S digital audio
- Multi-file OOP architecture
- Dual-core real-time separation
- Polyphonic synthesis engine

This is the first version where the software architecture is intentionally designed for **scalability, determinism, and portability**.

---

## 2. Architectural Objectives (v4.0)

The refactor had four strict goals:

###  Real-Time Audio Determinism  
Audio must never glitch because of UI rendering.

###  Separation of Concerns  
UI logic must never pollute DSP logic.

###  Portability  
The DSP core must be portable to Teensy 4.1 (v5.0).

###  Transparency  
Despite OOP abstraction, the signal path must remain explainable from first principles.

---

## 3. High-Level System Overview

![Software Architecture Overview — v4.0](/img/projects/software-architecture-v4-overview.png)

**Execution Model:** Dual-core FreeRTOS (ESP32-S3)

* **Core 0** → Dedicated Audio Task
* **Core 1** → UI + Control Loop

**Data Flow:**

1. UI Input
2. StateMachine
3. AudioEngine
4. I2S DMA
5. PCM5102A
6. Analog Output

Audio never waits for UI.  
UI never blocks audio.

That separation is the entire reason v4.0 exists.

---

## 4. Project Structure (Actual v4.0)

```text
lib/
├── AudioEngine/
│   ├── AudioEngine.h
│   ├── AudioEngine.cpp
│   └── Waveforms/
│       ├── WaveformGenerator.h
│       └── Waveforms.h
├── Voice/
│   ├── Voice.h
│   └── Voice.cpp
├── Menu/
├── StateMachine/
├── DisplayManager/
├── Button/
├── RotaryEncoder/
└── Potentiometer/
src/
└── main.cpp
```

Each module has a single responsibility.

This is no longer a single-file firmware.

---

## 5. Core Components

---

### 5.1 AudioEngine — The DSP Core

**Responsibilities:**
- I2S initialization
- DMA buffer management
- Mixing voices
- Feedback tone generation
- Master volume control

**Core mixing logic:**

```cpp
for (int i = 0; i < BUFFER_SIZE; i++) {
    float mixedSample = 0.0f;

    for (int v = 0; v < MAX_VOICES; v++) {
        if (voices[v].isActive()) {
            mixedSample += voices[v].getNextSample();
        }
    }

    mixedSample /= MAX_VOICES;
    mixedSample *= masterVolume;

    audioBuffer[i] = convertToInt16(mixedSample);
}
```

**Mathematically:**

$$y[n] = \left(\frac{1}{N} \sum_{i=1}^{N} v_i[n]\right) \cdot V_{master}$$

This prevents clipping even when multiple voices are active.

### 5.2 Voice — Independent Sound Unit

Each `Voice` owns:
- `phase`
- `frequency`
- `amplitude`
- `phaseIncrement`
- `WaveformGenerator*`

Wave generation uses a phase accumulator:

$$\text{phase} \mathrel{+}= \frac{2\pi f}{F_s}$$



This is true Direct Digital Synthesis (DDS).  
Not PWM.  
Not duty-cycle tricks.  
Actual waveform mathematics.

### 5.3 WaveformGenerator (Abstract Base)

**Polymorphic interface:**

```cpp
virtual float getSample(float phase) = 0;
```

**Implementations:**
- Sine
- Triangle
- Square
- Saw
- Noise

All normalized to: $[-1.0, 1.0]$

This allows waveform swapping without changing engine logic.

### 5.4 StateMachine — System Coordinator

```cpp
enum State { MUTE, MENU, PLAYING };
```

הנה הקטע שביקשת, מעוצב בדיוק לפי הכללים עם בלוק הקוד סגור כהלכה:

Markdown
**Responsibilities:**
- Transition logic
- Mode selection
- Timeout handling
- Feedback triggering

**Important principle:** `StateMachine` never generates audio directly. It instructs `AudioEngine` what to do.

### 5.5 Input Modules

Encapsulated hardware components:
- `Button`
- `RotaryEncoder`
- `Potentiometer`

The encoder now uses:
- Gray-code state table decoding
- No time-based debounce
- ISR-safe static wrapper
- Half-step resolution

This removed false direction detection present in v3.8.

---

## 6. Dual-Core Real-Time Architecture



### Core 0 — Audio Task

```cpp
while (true) {
    audioEngine.update();
    i2s_write(...);  // blocks ≈ 5.8ms
}
```

The blocking `i2s_write()` call is intentional.

**Buffer configuration:**
- 256 samples
- 44.1 kHz
- ≈ 5.8 ms per buffer

This is the real-time heartbeat of the system.

### Core 1 — UI Loop

```cpp
void loop() {
    button.update();
    encoder.update();
    pot.update();
    stateMachine.update();
    displayManager.update();
    delay(10);
}
```

Display I2C operations take 10–12 ms.  
Without core separation, audio would underrun.  
This was experimentally verified before refactoring.

---

## 7. I2S Configuration

**Configured as:**
- 44.1 kHz sample rate
- 16-bit
- Stereo (mono duplicated L/R)
- DMA buffering
- Master mode

**Measured on oscilloscope:**
- LRCK: 44.1 kHz
- BCK: 1.4112 MHz



**Audio is now clock-driven — not event-driven.**

---

## 8. Logarithmic Frequency Mapping

Linear mapping feels robotic. v4.0 implements:

$$
f(t) = f_{min} \cdot \left(\frac{f_{max}}{f_{min}}\right)^t
$$

Where:

$$
t = \frac{\text{ADC}}{4095}
$$

**Result:**
- Sub-Hz precision at low frequencies
- Smooth perceptual sweep
- No stepping artifacts



---

## 9. Polyphony (Proof of Concept)

```cpp
#define MAX_VOICES 4
```

**Demonstrated:**
- Root
- Major third
- Perfect fifth

Software mixing only.  
Single DAC handles all voices.

> **Note:** Noise waveform remains monophonic due to ESP32 `random()` mutex behavior.

---

## 10. Timing Model (v4.0)

Unlike v3.8:
- Audio is sample-accurate
- Buffer refill is deterministic
- UI jitter does not affect audio
- No mid-period frequency jumps

System is clock-locked to 44.1 kHz.

---

## 11. Known Software Limitations

From MASTER_SOT Section 4.5:
- Noise waveform mutex limitation
- ADC jitter ±30–50 LSB (filtered)
- Breadboard-induced signal integrity noise
- Cross-core shared variables require `volatile`

All documented. None hidden.

---

## 12. What’s NOT Here (Deliberately)

v4.0 does not include:
- DSP filters
- ADSR envelopes
- LFO modulation
- Sample playback
- FFT analysis
- Bare-metal audio (Teensy v5.0)
- DMA interrupt callback model (v5.0)

v4.0 proves architecture.  
v5.0 proves portability.

---

## 13. Architectural Lessons

- Real-time systems must have blocking yield points.
- Display updates are dangerously slow.
- Refactoring exposes hidden bugs.
- OOP enables portability.
- Audio must be clock-driven, not event-driven.
- DSP code should be hardware-agnostic.

---

## 14. Version History Reference

For the monolithic PWM implementation:  
→ See **Software Architecture — v3.8 (Transistor Era)**

v4.0 is the first architecture that resembles a professional embedded audio system.

---

## 15. Next Step — v5.0 Migration

Designed so that:
- `Voice`
- `WaveformGenerator`
- `fillBuffer()`

can be ported to Teensy 4.1 with minimal modification.

**Only major rewrites required:**
- I2S initialization
- DMA callback model
- Removal of FreeRTOS dependency

---

### Related Documentation
- [Hardware Design](#) *(Add correct Docusaurus link here)*
- [Replication Status](#) *(Add correct Docusaurus link here)*

---

### Closing

> v3.8 proved that I could make sound.  
> v4.0 proves that I understand how digital audio systems are architected.  
> The code is no longer a toy.  
> It is a foundation.