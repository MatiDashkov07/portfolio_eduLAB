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

eduLAB is an embedded audio workstation built as a **learning tool**, not a product.  
Its purpose is to take abstract DSP concepts and force them to survive contact with real hardware.

Instead of treating signals as numbers on a screen, eduLAB treats them as voltages you can probe, distort, filter, and analyze. Every part of the signal chain — from waveform generation to analog output — is intentionally exposed.

![eduLAB v3.8 breadboard prototype — ESP32 driving a speaker via transistor stage](/img/projects/edulab-v3.8-overview.jpg)

*Current eduLAB v3.8 setup — a working breadboard prototype focused on transistor switching, PWM audio, and real measurements.*


---

## Why I Built This

I started this project out of genuine curiosity for how signals behave in the real world — not just in theory, and not just in software.

While researching career paths in electrical engineering in Israel, I became aware that many early opportunities are influenced by military background. I was waitlisted for Unit 8200. That fact shaped my perspective, but it is **not** the motivation behind this project.

The real motivation is much simpler: I enjoy hardware. I enjoy understanding why circuits behave the way they do. I enjoy debugging things that don't work.

What I *did* take from that reality is a useful constraint: if I'm going to invest years into engineering, I want my work to demonstrate **depth**, not credentials. That means:

- Designing circuits from first principles  
- Measuring real signals instead of trusting assumptions  
- Documenting failures as carefully as successes  

This project grew naturally from that mindset.

---

## The Philosophy: No Black Boxes

I explicitly avoid what I call *"Vibe Engineering"* — making things work without understanding why they work.

The guiding rule is simple:

> **If I can't explain it, I don't use it.**

Before connecting any component, I expect to answer questions like:

- What physical effect am I relying on?
- What assumptions am I making?
- What happens if those assumptions are wrong?

If I can't answer — I stop and learn first.

---

## The Big Idea

eduLAB is a **physical learning instrument**.

It is not:
- A commercial audio product  
- A performance synthesizer  
- A polished consumer device  

It *is*:
- An engineering education platform  
- A sandbox for DSP and analog experimentation  
- A system where digital signals are intentionally routed through user-built analog circuits  

The goal is not convenience — it's understanding.

---

## The DSP Education Sandbox

**Important clarification:** eduLAB is not "a synthesizer with extras".

It is a **DSP Education Sandbox** designed to demonstrate:

- Digital waveform generation  
- Analog filtering and amplification  
- Noise behavior and mitigation  
- Real-time signal analysis  

### Signal Flow Architecture

Digital signals are generated in firmware, converted to analog form, physically modified using breadboard circuits, and then measured again.  
That closed loop is the core of the project.

![eduLAB Signal Flow](/img/projects/flowchart-intro-docs-file.svg)
<!-- [PLACEHOLDER: Signal Flow Diagram from SOT — ASCII art or generated diagram] -->

---

## Vision Preview

The long-term goal is a **bench-top DSP education workstation** — something you would expect to see in a university lab rather than a music studio.

A tool designed to answer one question clearly:

> What actually happens to a signal when I change this?

---

## Current State — v3.8: The Transistor Era

**Design focus:** understanding transistor switching, inductive loads, and PWM-based audio *before* introducing DACs and abstraction layers.

This version is intentionally primitive.  
The objective is not sound quality — it's insight.

### Hardware Overview

| Component | Specification | Status |
|----------|---------------|--------|
| MCU | ESP32-S3-N16R8 | In use |
| Audio Output | PWM → 2N2222 → 8Ω speaker | Scope verified |
| Audio Quality | ~8-bit equivalent | Intentional |
| Display | 0.91" OLED (SSD1306) | In use |
| Inputs | 2× potentiometers, 1× encoder | In use |
| Waveforms | Square, saw, triangle, noise | Code verified |

PWM audio exposes:
- Duty cycle vs. perceived timbre  
- Resolution limits  
- Filtering requirements  
- Why proper DACs exist  

![eduLAB v3.8 output stage — transistor, flyback diode, and speaker](/img/projects/v3.8-breadboard.jpg)
<!-- [PLACEHOLDER: v3.8 breadboard photo — real hardware build] -->

### Software Architecture

- **Language:** C++17 (Arduino framework)
- **Structure:** Single-file, procedural
- **UI:** Finite state machine
- **Input handling:** Interrupt-driven encoder
- **ADC stability:** EMA filtering with hysteresis

Modularity comes later. First, the fundamentals.

### Engineering Lessons Learned

Problems solved through measurement and reasoning:

- **GPIO current collapse** and load driving limits  
- **Inductive kickback** observed and clamped  
- **PWM timer conflicts** discovered via oscilloscope  
- **ADC noise** filtered with explicit trade-offs  

Detailed write-ups are available on the blog.

![Oscilloscope capture showing inductive kickback before flyback clamping](/img/projects/kickback-scope-trace.jpg)

*Current eduLAB v3.8 setup — a working breadboard prototype focused on transistor switching, PWM audio, and real measurements.*

---

## Next Step — v4.0: The Hi-Fi Leap

The next iteration focuses on **signal integrity**, not features.

Planned changes include:

- I2S audio output  
- PCM5102A DAC  
- Op-amp buffered line output  
- True mathematical waveform synthesis  
- Full OOP refactor  

This is a technical evolution, not a redesign.

<!-- [PLACEHOLDER: v3.8 vs v4.0 comparison table] -->

---

## The Grand Vision

The final form of eduLAB will be a complete DSP learning platform:

| Component | Target |
|----------|--------|
| Processor | Teensy 4.1 (ARM Cortex-M7 @ 600 MHz) |
| Audio | 16-bit / 44.1 kHz stereo I2S |
| Displays | 2× TFT LCD |
| Controls | Encoders, faders, switches |
| Analog Section | Breadboards with ±12 V rails |
| Measurement | Built-in signal analysis |

![eduLAB concept visualization — future DSP education workstation](/img/projects/AI-mockup-eduLAB-final-vision.png)

*Concept visualization — target long-term vision. Current version (v3.8) is a working breadboard prototype focused on fundamentals.*


---

## Project Status & Documentation

| Version | Status | Notes |
|--------|--------|------|
| v3.8 | ✅ Stable | Breadboard prototype |
| v4.0 | 🔄 In progress | Components ordered |
| v5.0+ | 📋 Planned | Full workstation |

**Last updated:** January 2026

### Explore Further

- [Hardware Design](./hardware-design) — Schematics, circuit analysis, power supply design
- [Software Architecture](./software-architecture) — Code structure, DSP algorithms, OOP refactor
- [Build Guide](./build-guide) — Replicate v3.8, component selection

For debugging stories and design decisions, see the  
[blog posts tagged edulab-synthesis-engine](/blog/tags/edulab-synthesis-engine).

---

## Closing

> *From breadboard tinkerer to hardware designer.*

This project exists because I enjoy understanding how things work — deeply, physically, and honestly.  
Everything else is secondary.