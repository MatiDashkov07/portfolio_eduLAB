---
sidebar_position: 4
title: Replication Status
---

# Replication Status

> **TL;DR:** v4.0 is the first replicable version of eduLAB. v3.8 remains documented for learning purposes only.

---

## Current Recommended Version: v4.0 (Hi-Fi Architecture)

v4.0 is the **first architecture designed with replication in mind**.

It represents the transition from an experimental learning prototype to a structurally sound embedded audio system.

### What v4.0 Includes

-  44.1 kHz / 16-bit I2S audio
-  PCM5102A DAC (self-clocked mode)
-  Sample-accurate timing (clock-driven, not event-driven)
-  Dual-core real-time separation (Audio vs UI)
-  Polyphonic DDS engine (4 voices)
-  Logarithmic frequency mapping
-  Clean line-level analog output
-  Fully modular OOP architecture

**Status:** Complete  
**Hardware:** Breadboard prototype (validated and measured)  
**Documentation:** Hardware + Software pages updated  
**Build Guide:** In preparation  

---

## Legacy Version: v3.8 (Transistor / PWM Era)

v3.8 is preserved for educational transparency.

It was built to understand:

- Transistor switching behavior
- Inductive kickback and flyback protection
- PWM audio limitations
- ISR interaction with main loop
- Real-time constraints without a sample clock

### Why v3.8 Is Not Recommended for Replication

-  ~8-bit equivalent PWM audio
-  No true DAC
-  Direct transistor → speaker drive
-  No reconstruction filtering
-  No proper output stage
-  Breadboard-only implementation
-  Audible jitter and pitch quantization

v3.8 is intentionally primitive.

It teaches fundamentals —  
but it is not the system eduLAB is evolving toward.

---

## What Replication Means in This Project

Replication does not mean:

- Copying a schematic blindly
- Ordering parts without understanding the signal chain

Replication means:

- Understanding the digital audio pipeline
- Knowing why I2S replaced PWM
- Being able to trace signal flow from UI input to DAC output
- Being aware of breadboard limitations

v4.0 is the first version where replication produces a **technically meaningful result**, not just a learning experiment.

---

## What You Can Do Now

### Option 1 — Study the Architecture

- [Hardware Design](./hardware-design)
- [Software Architecture](./software-architecture)

These pages document the system exactly as it exists.

---

### Option 2 — Explore the Code

The full repository is available:

- https://github.com/MatiDashkov07/eduLAB-Synthesis-Engine

v4.0 introduces:

- AudioEngine abstraction
- Voice + WaveformGenerator hierarchy
- Dual-core task separation
- DMA-driven audio buffering

---

### Option 3 — Wait for the Structured Build Guide

A formal step-by-step replication guide will include:

- Wiring diagram
- Verified I2S pin mapping
- PCM5102A strapping configuration
- Breadboard layout guidance
- Known pitfalls checklist

This will be published once documentation stabilizes.

---

## Bill of Materials — v4.0 Reference

Documented for transparency.

### Core Components

| Component | Part | Notes |
|-----------|------|-------|
| MCU | ESP32-S3 DevKitC | Dual-core FreeRTOS |
| DAC | PCM5102A module | I2S, self-clocked |
| Display | SSD1306 OLED | I2C interface |
| Encoder | EC11 / HW-040 | Menu navigation |
| Potentiometers | 10kΩ | Frequency / Control |
| Output | 3.5mm line out | Clean analog stage |

### Breadboard Disclaimer

This is still a **breadboard prototype**.

While functionally validated, breadboards introduce:

- Signal integrity noise
- Parasitic capacitance
- Ground impedance variation

v5.0 will move toward a more controlled hardware platform.

---

## Roadmap Context

- **v3.8:** PWM + transistor learning platform
- **v4.0:** I2S + modular DSP architecture (current)
- **v5.0:** Teensy 4.1 + bare-metal + improved analog sandbox

Replication is meaningful starting at v4.0.  
Architectural evolution continues in v5.0.

---

## FAQ

**Q: Can I still build v3.8?**  
Yes. It is documented for educational purposes. It is not recommended as a final system.

**Q: Is v4.0 production-ready?**  
No. It is architecturally correct and measured, but still a prototype platform.

**Q: Will PCB files be released?**  
Possibly in a future revision. v5.0 is a stronger candidate for PCB development.

**Q: Is this open for contributions?**  
Not at this stage. eduLAB is currently a controlled learning project.

---

## Closing

v3.8 proved fundamental understanding.

v4.0 proves architectural maturity.

Replication begins where engineering becomes intentional.