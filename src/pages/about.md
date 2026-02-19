---
title: About
description: About me - an 18-year-old Israeli student building embedded hardware systems from first principles
---

# About

Hi, I'm Mati Dashkov, an 18-year-old Israeli pre-military student focused on embedded systems and hardware engineering.

This blog documents the evolution of **eduLAB** — a hands-on DSP and embedded audio platform built from first principles, measured with real instruments, and architected intentionally.

The goal isn’t to “make something work.”  
The goal is to understand *why* it works — electrically, mathematically, and architecturally.

---

## Why This Exists

I’ve been drawn to electronics and embedded systems since I was around 12 years old — not because of trends or career pressure, but because physical systems behave in ways that demand explanation.

Signals distort.  
Clocks drift.  
Buffers underrun.  
Transistors saturate.

Software can abstract those realities away.  
Hardware forces you to confront them.

Over time, I realized something important:

> Strong engineering isn’t demonstrated by credentials — it’s demonstrated by systems you can explain from the signal level up.

This blog is that demonstration.

Every architectural decision in eduLAB is documented.  
Every mistake is recorded.  
Every measurement is verified.

---

## My Philosophy: “No Black Boxes”

I avoid what I call *Vibe Engineering* — assembling systems without understanding the underlying physics or math.

Copy-pasting Arduino code.  
Connecting components “because the tutorial said so.”  
Using abstractions without understanding what they hide.

**My rule is simple:**

> **If I can’t explain it, I don’t use it.**

If I connect a capacitor, I must answer:

- What is the time constant \( \tau = RC \)?
- What frequency does this filter?
- Why this value and not another?

If I configure I2S:

- What is LRCK?
- Why is BCK 1.4112 MHz at 44.1 kHz / 16-bit stereo?
- Where does jitter come from?
- What is the DMA buffer refill window?

If I can’t answer — I stop and learn first.

This approach is slower.  
But it builds real engineering intuition.

---

## Current Focus: eduLAB Synthesis Engine

eduLAB is an evolving embedded DSP education platform.

It began as a PWM + transistor learning experiment (v3.8) and evolved into a structured digital audio system (v4.0).

### Current Version: v4.0 (Hi-Fi Architecture)

- ESP32-S3 (dual-core)
- 44.1 kHz / 16-bit I2S audio
- PCM5102A DAC (self-clocked mode)
- DMA-driven buffer filling
- Dual-core real-time separation (Audio vs UI)
- Modular OOP architecture
- Polyphonic DDS synthesis engine
- Logarithmic frequency mapping
- Breadboard-validated analog output stage

v4.0 is the first version where the system resembles a real embedded audio architecture — not just a learning prototype.

→ [Read the full project documentation](/projects/edulab-synthesis-engine/intro)

---

## Broader Engineering Interests

While eduLAB focuses on embedded audio, my interests span across:

- Digital Signal Processing & Real-Time Systems
- Analog Circuit Design & Mixed-Signal Systems
- PCB Design & Layout
- FPGA Development (Verilog basics)
- RF & Wireless Systems
- Silicon Architecture & Low-Level Systems
- Robotics & Autonomous Systems

The philosophy:

> Touch everything. Understand deeply. Then specialize.

eduLAB is the first flagship system — not the last.

---

## Skills (Honest Assessment)

### Proficient

- **Embedded C/C++** — Real-time firmware, ISR handling, peripheral control  
- **Hardware Debugging** — Oscilloscope/DMM usage, systematic troubleshooting  
- **Digital Audio Fundamentals** — I2S timing, DMA buffering, sample-accurate pipelines  
- **Circuit Analysis** — Component selection, signal integrity awareness  
- **Tools** — Git, PlatformIO, LTspice (basic simulation)

### Intermediate

- **Analog Design** — Op-amps, filtering, output stages, noise considerations  
- **DSP Implementation** — DDS synthesis, buffer mixing, fixed-rate sampling  
- **Dual-Core Embedded Systems** — FreeRTOS task separation, blocking yield models  

### Actively Developing

- **KiCad** — Schematic capture and PCB layout for future revisions  
- **Teensy 4.1 Bare-Metal Audio** — DMA callback-driven buffer models (v5.0)  
- **FPGA Development** — Hardware description & timing reasoning  
- **Professional PCB Design** — Impedance control, EMI mitigation  

---

## Academic Path

I am currently studying Computer Science prerequisites at the Open University of Israel as part of the **Afeq Ma’avar** transfer track.

Long-term academic goal:

**Technion — Electrical Engineering + Physics (Excellence Track)**

Military service will temporarily reduce development pace, but:

- Active learning continues  
- Documentation continues  
- eduLAB evolution continues  

Engineering progress is cumulative.

---

## Roadmap

### Current Phase — v4.0 Stabilization

- Complete architectural documentation
- Publish deep-dive technical posts
- Refine measurement-based analysis
- Strengthen analog experimentation layer

### Next Phase — v5.0 (Teensy Migration)

- Port DSP core to Teensy 4.1
- Remove FreeRTOS dependency
- Implement DMA callback-driven buffer filling
- Expand analog sandbox (op-amp experiments)
- Move toward PCB-based implementation

### Long-Term Direction

- Build a complete DSP education workstation
- Integrate measurement tools directly into the system
- Design educational embedded hardware platforms
- Contribute to open-source embedded systems

---

## What I’m Studying

- **The Art of Electronics (Horowitz & Hill)**  
- **The Scientist and Engineer’s Guide to DSP (Steven W. Smith)**  
- Microcontroller reference manuals  
- Audio DAC datasheets  
- Real-time system architecture literature  

And a lot of oscilloscope traces.

---

## Contact

- **GitHub:** [MatiDashkov07](https://github.com/MatiDashkov07)  
- **LinkedIn:** [Mati Dashkov](https://www.linkedin.com/in/mati-dashkov-33740b375)  
- **Email:** [matidashkov5@gmail.com](mailto:matidashkov5@gmail.com)

---

This is a *learning in public* project.

I document failures, architectural rewrites, and measurement mistakes — not just polished results.

From breadboard experiments to structured embedded systems.

And this is only the beginning.