---
sidebar_position: 1
title: "eduLAB Synthesis Engine"
description: "A hands-on DSP education sandbox built from first principles to explore digital synthesis, analog circuits, and real-world signal behavior"
slug: /edulab-synthesis-engine/intro
---

# eduLAB Synthesis Engine

> A hands-on hardware platform for learning digital signal processing by building, measuring, and debugging real circuits.

---

## What Is This?

eduLAB is an embedded DSP education platform — not a product, not a synthesizer, and not a consumer device.

Its purpose is to take abstract signal-processing theory and force it to survive contact with real hardware.

Instead of treating signals as numbers inside software, eduLAB treats them as voltages you can:

- Generate digitally  
- Convert to analog  
- Physically manipulate on breadboards  
- Measure with instruments  
- Break  
- Fix  
- Understand  

Every stage of the signal chain is intentionally exposed.

---

## Why I Built This

I built eduLAB out of curiosity for how signals behave in the real world.

Not just in equations.  
Not just inside IDEs.  
But on oscilloscopes.

While researching electrical engineering career paths in Israel, I realized something important: credentials open doors — but depth builds engineers.

I was waitlisted for Unit 8200. That shaped my perspective, but it is not the motivation behind this project.

The real motivation is simpler:

- I enjoy hardware.  
- I enjoy debugging.  
- I enjoy understanding why things fail.  

If I’m going to invest years into engineering, I want the work to demonstrate depth — not familiarity with libraries.

That means:

- Designing from first principles  
- Measuring everything  
- Documenting failures as carefully as successes  

eduLAB grew naturally from that mindset.

---

## The Philosophy: No Black Boxes

I explicitly avoid what I call *“Vibe Engineering”* — making things work without understanding why they work.

The rule is simple:

> **If I can’t explain it, I don’t use it.**

Before connecting any component, I ask:

- What physical effect am I relying on?
- What assumptions am I making?
- What breaks if I’m wrong?

If I can’t answer — I stop and learn first.

---

## The Big Idea

eduLAB is a **physical DSP learning instrument**.

It is not:

- A commercial audio product  
- A performance synthesizer  
- A polished consumer device  

It is:

- An engineering education platform  
- A DSP and analog experimentation sandbox  
- A system where digital signals are intentionally routed through user-built analog circuits  

The goal is not convenience.  
The goal is understanding.

---

## The DSP Education Sandbox

**Important clarification:** eduLAB is not “a synthesizer with extras.”

It is a **closed-loop learning system**:

1. Generate a signal digitally.
2. Convert it to analog.
3. Modify it using physical circuits.
4. Measure what actually happened.

That feedback loop is the core of the project.

![eduLAB Signal Flow](/img/projects/flowchart-intro-docs-file.png)

---

# Current State — v4.0: The Hi-Fi Leap

v4.0 marks the transition from PWM-based experimentation to true digital signal processing.

This is no longer “fake DSP through duty cycle tricks.”  
This is real I2S audio, real phase accumulation synthesis, and real architecture.

### Hardware Core

| Component | Implementation |
|-----------|---------------|
| MCU | ESP32-S3-N16R8 (Dual-core @ 240 MHz) |
| Audio Protocol | I2S |
| DAC | PCM5102A |
| Audio Quality | 16-bit / 44.1 kHz stereo |
| Output | Line-level via DAC module |
| Display | 0.91” OLED (SSD1306) |
| Inputs | 2× potentiometers + rotary encoder + button |

I2S clocks were scope-verified:
- **LRCK:** 44.1 kHz  
- **BCK:** 1.4112 MHz  

This version generates mathematically correct waveforms using a phase accumulator:


phase += 2π × frequency / sampleRate


Waveforms implemented:

- Sine  
- Triangle  
- Square  
- Sawtooth  
- Noise  

---

### Software Architecture

v4.0 replaced a 450-line monolithic file with a clean multi-file OOP architecture.

Core concepts:

- **WaveformGenerator (polymorphic hierarchy)**
- **Voice class (independent oscillator units)**
- **AudioEngine (I2S + mixer + DMA buffer)**
- **StateMachine (UI control flow)**
- **Dual-core separation (Core 0 = audio, Core 1 = UI)**

Real-time audio runs independently from display updates, eliminating buffer underruns and clicks.

Polyphony proof-of-concept:
- 4-voice engine
- 3-voice chord demonstration
- Software mixer with clipping prevention

This is the first version that qualifies as actual DSP work.

---

### What v4.0 Achieved

- Clean 16-bit audio output via I2S  
- Logarithmic frequency mapping for perceptual control  
- Phase-accurate waveform synthesis  
- Software polyphony  
- Real-time dual-core architecture  
- Measured and debugged clock integrity  

v4.0 is stable and fully operational.

---

# Version History — v3.8: The Transistor Era

Before v4.0, the project focused on fundamentals.

v3.8 used:


PWM → 2N2222 transistor → 8Ω speaker


It was intentionally primitive.

That version existed to understand:

- Transistor switching
- Inductive kickback
- PWM resolution limits
- ADC noise and filtering
- Why DACs exist in the first place

It was not meant to be impressive.  
It was meant to build intuition.

Those lessons made v4.0 possible.

---

# Next Step — v5.0: The Platform Leap

The next phase is migration from ESP32 to **Teensy 4.1 (ARM Cortex-M7 @ 600 MHz)**.

Objective:

- Preserve the OOP DSP architecture  
- Port the audio engine  
- Implement I2S + DMA natively  
- Exploit hardware FPU  
- Introduce MCLK for lower jitter  

v5.0 does **not** add features.

It proves that the architecture is portable and scalable.

---

# The Grand Vision

The long-term target is a bench-top DSP education workstation with:

| Component | Target |
|-----------|--------|
| Processor | Teensy 4.1 |
| Audio | 16-bit / 44.1 kHz stereo |
| Displays | Dual TFT |
| Controls | Encoders, faders, switches |
| Analog Lab | Breadboards with ±12V rails |
| Measurement | Built-in oscilloscope + analysis |

A tool designed to answer one clear question:

> What actually happens to a signal when I change this?

---

## Project Status

| Version | Status |
|----------|--------|
| v4.0 | ✅ Complete |
| v5.0 | 🔄 Planned (Platform migration) |
| v6.0+ | 📋 UI & Lab Expansion |

**Last updated:** February 2026

---

## Explore Further

- [Hardware Design](./hardware-design)
- [Software Architecture](./software-architecture)
- [Replication Status](./replication-status)

For detailed debugging stories and technical deep-dives, see the blog posts tagged `edulab-synthesis-engine`.

---

## Closing

> *From breadboard tinkerer to hardware designer.*

eduLAB exists because understanding is more satisfying than imitation.

