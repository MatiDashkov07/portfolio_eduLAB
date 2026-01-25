---
sidebar_position: 1
slug: /intro
---

# eduLAB Synthesis Engine: Overview

Welcome to the technical documentation of the **eduLAB Synthesis Engine**. 
This project is a deep dive into embedded systems, digital signal processing (DSP), and mixed-signal hardware design.

## The Goal
To build a high-performance, playable polyphonic synthesizer from scratch, moving away from high-level libraries to understand the underlying physics and mathematics of sound synthesis.

## System Specifications (v3.8)
Current stable build features:
- **Processor:** ESP32-S3 / Teensy 4.1
- **Synthesis:** Dual Oscillator (Sine, Square, Saw, Triangle)
- **Audio Output:** Mixed-signal stage with custom RC filtering and Op-Amp buffering
- **Interface:** I2C OLED Display + Rotary Encoder for parameter control
- **Safety:** Integrated protection against inductive kickback (flyback diodes) and voltage spikes

## Architecture Snapshot
The system is divided into three main layers:
1. **The Digital Core:** Waveform generation and envelope control (ADSR).
2. **The Communications Layer:** I2C for UI and (upcoming) I2S for high-fidelity audio data.
3. **The Analog Stage:** Low-pass filtering to remove high-frequency noise and impedance matching for headphones.

## Development Status
- [x] **v1.0 - v3.0:** Breadboard prototyping, PWM audio, basic oscillators.
- [x] **v3.8:** Stable mixed-signal output, protection circuitry, optimized C++ code.
- [ ] **v4.0 (In Progress):** Transition to I2S (PCM5102 DAC), Teensy 4.1 integration, and polyphonic voice management.

---

*Explore the sidebar to dive into specific Hardware Design, Software Architecture, and Lab Results.*