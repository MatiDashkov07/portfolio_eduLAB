# eduLAB Synthesis Engine
# MASTER SOURCE OF TRUTH (SOT)
## Version 3.0

> **Last Updated:** February 17, 2026  
> **Current Phase:** v4.0 (I2S Audio / OOP Architecture) — COMPLETE  
> **Next Phase:** v5.0 (Teensy 4.1 Platform Migration) — PLANNED  
> **Author:** Mati Dashkov  
> **Status:** Active Development  
> **Document Purpose:** This is the single authoritative reference for the entire eduLAB project. All blog posts, documentation, README files, and external communications MUST align with this document.

---

# ⚠️ GROUND TRUTH RULES — READ FIRST ⚠️

**This section defines how AI systems (and humans) should interpret this document.**

## Rule 1: Authority Hierarchy
```
THIS DOCUMENT > Any previous conversation > AI's training knowledge > Assumptions
```
If there is a conflict between this document and anything else, **this document wins**.

## Rule 2: Unknown = Unknown
If a detail is **not explicitly stated** in this document, treat it as **UNKNOWN**. Do not infer, guess, or hallucinate. Ask the user for clarification.

## Rule 3: Assumptions Must Be Labeled
Any statement that is not directly verified must be labeled with one of:
- `[VERIFIED]` — Confirmed by measurement, testing, or direct observation
- `[HYPOTHESIS]` — Educated guess, not yet tested
- `[ESTIMATE]` — Approximate value, may change
- `[PLAN]` — Intended future action, not yet implemented
- `[UNVERIFIED]` — Stated but not confirmed

## Rule 4: Facts vs. Plans Separation
This document distinguishes between:
- **FACTS** — Things that exist NOW, have been built, tested, or verified
- **PLANS** — Things intended for the FUTURE, not yet implemented

When referencing this document:
- Section 4 (Current Version) = **FACTS**
- Section 5 (Next Version) = **PLANS**
- Section 3 (Grand Vision) = **LONG-TERM PLANS**

## Rule 5: Verification Evidence
For hardware claims, verification types include:
- `[SCOPE]` — Verified by oscilloscope measurement
- `[DMM]` — Verified by digital multimeter
- `[PHOTO]` — Documented with photograph
- `[CODE]` — Verified in source code
- `[DATASHEET]` — Per manufacturer specifications

## Rule 6: Change Log Discipline
Any modification to this document must include:
1. **What** changed
2. **Why** it changed
3. **Evidence** (commit hash, scope screenshot, photo, etc.)

See "DOCUMENT CONTROL" section at the end for revision history.

## Rule 7: No Belief Amplification
If something is written as a fact here, AI systems will treat it as true. Therefore:
- Uncertain claims are explicitly labeled
- Opinions are marked as opinions
- Estimates include ranges, not false precision

---

# 📊 QUICK REFERENCE: FACTS vs. PLANS

## CURRENT REALITY (FACTS) — v4.0
| Aspect | Status | Verification |
|--------|--------|--------------|
| MCU | ESP32-S3-N16R8 | `[IN USE]` |
| Audio Output | I2S via PCM5102A DAC → 3.5mm jack | `[SCOPE VERIFIED]` |
| Audio Quality | 16-bit / 44.1kHz stereo | `[SCOPE VERIFIED]` |
| Display | 0.91" OLED SSD1306 | `[IN USE]` |
| Input | 2× Pots + 1× Encoder + 1× Button | `[IN USE]` |
| Waveforms | Sine, Triangle, Square, Saw, Noise | `[CODE VERIFIED]` |
| Code Architecture | Full OOP, multi-file, dual-core | `[CODE]` |
| Polyphony | 3-voice POC (hardcoded chord) | `[VERIFIED]` |

## FUTURE PLANS (NOT YET BUILT)
| Aspect | Target Version | Status |
|--------|----------------|--------|
| Teensy 4.1 Migration | v5.0 | `[PLAN]` |
| TFT Display + Multi-Encoder UI | v6.0 | `[PLAN]` |
| Built-in Oscilloscope | v7.0 | `[LONG-TERM PLAN]` |
| DSP Sandbox (Filters + Effects) | v8.0 | `[LONG-TERM PLAN]` |
| Custom PCB | v9.0 | `[LONG-TERM PLAN]` |

## VERSION ROADMAP
```
v4.0 ✅  I2S + OOP + Polyphony POC (COMPLETE)
v5.0 🔄  Teensy 4.1 migration (Platform)
v6.0 📋  TFT + Multi-encoder + Polyphony UI (Experience)
v7.0 📋  Oscilloscope from scratch (Measurement)
v8.0 📋  Sandbox + filters + effects (Education)
v9.0 📋  KiCad + PCB prototype (Production)
```

---

# TABLE OF CONTENTS

1. [THE ENGINEER — Who is Mati?](#1-the-engineer--who-is-mati)
2. [THE PHILOSOPHY — Why Deep Learning Matters](#2-the-philosophy--why-deep-learning-matters)
3. [GRAND VISION — The End Game](#3-grand-vision--the-end-game)
4. [CURRENT VERSION (v4.0)](#4-current-version-v40--the-hi-fi-leap)
5. [NEXT VERSION (v5.0)](#5-next-version-v50--the-platform-leap)
6. [VERSION HISTORY](#6-version-history--the-evolution)
7. [BLOG POST TRACKER](#7-blog-post-tracker)
8. [TERMINOLOGY GLOSSARY](#8-terminology-glossary)
9. [BILL OF MATERIALS](#9-bill-of-materials-target-bom)

---

# 1. THE ENGINEER — Who is Mati?

## 1.1 Personal Background

**Name:** Mati Dashkov  
**Age:** 18 years old  
**Location:** Israel  
**Current Status:** מלש"ב (Pre-Military Service) — Enlisting in approximately 2 months  
**Academic Goal:** Dual degree in Electrical Engineering + Physics at the Technion (Excellence Track)

## 1.2 The Origin Story — Why This Project Exists

In Israel's tech industry, the first question at any job interview is: *"What unit did you serve in?"* The elite technology units (8200, 81, Talpiot) serve as gatekeepers to the high-tech world. They are the golden ticket.

**I was waitlisted for Unit 8200.**

This was a defining moment. I had two choices:
1. Accept that the path to tech success would be harder without elite military credentials
2. Build something so impressive that no one could remain indifferent

I chose option 2.

## 1.3 The Mission Statement

> **"I want to prove — to the world, and most importantly to myself — that I can succeed in the tech world without a career in an elite military unit. I want to show that impressive projects combined with academic excellence can take me further than any unit graduate. I want to be no less successful than them."**

This is not naive optimism. This is a calculated challenge. In a country where the tech industry is almost hermetically sealed to people without military tech experience, I intend to be the person who breaks through.

Not through blind ambition, but through **deep understanding** of everything I do, have done, and will do.

## 1.4 The Strategic Insight — Why Hardware/EE?

After extensive research, I discovered a critical difference between software/cyber and electrical engineering in Israel:

**Software/Cyber Reality:**
- Military unit = Entry ticket
- Without 8200/81/Talpiot = Extremely difficult to get junior positions
- Projects help but cannot replace credentials

**Electrical Engineering Reality:**
- **Degree = Absolute prerequisite** (99% of jobs require it)
- Military tech units barely do real hardware (circuit design, PCB, analog)
- Most EE engineers come from Technion/TAU/BGU, **NOT military units**
- Everyone starts from zero after their degree

**This is strategic gold.** In EE, there are no "8200 alumni who did circuit design for 5 years in the army" — because that simply doesn't exist. My projects + Technion degree will differentiate me from day one.

## 1.5 Academic Path

**Current:** Computer Science prerequisites at Open University of Israel (Course 20441 and others)

**Target:** Technion Dual Degree — Electrical Engineering + Physics (Excellence Track)

**Admission Strategy (Multiple Paths):**
1. **Path A:** Complete first year through Open University with 90+ average (challenging but possible)
2. **Path B:** Pass the mathematics placement exam (time-dependent)
3. **Path C:** Build a "Maker Portfolio" so impressive they have no choice but to accept me (inspired by American university applicants)

## 1.6 The Broader Vision — Not Just Embedded Systems

While this project focuses on embedded systems, my interests span the entire hardware engineering spectrum:

- Embedded Systems & Real-Time DSP
- Silicon Design & Chip Architecture
- Quantum Computing Hardware
- MEMS & Sensor Development
- Robotics & Autonomous Systems
- Navigation & Sensing Algorithms
- VHDL/Verilog & FPGA Development
- RF & Wireless Systems

**The philosophy:** Touch everything, understand deeply, then specialize. The eduLAB project is the first flagship — there will be many more.

## 1.7 Military Service Reality

Starting in approximately 2 months, I will have very limited time for projects — especially in the first 6 months when I'll barely be home. Development pace will slow significantly, but **progress will never stop completely**. Even small commits, documentation updates, or theoretical learning count as forward momentum.

---

# 2. THE PHILOSOPHY — Why Deep Learning Matters

## 2.1 The Anti-Pattern: "Vibe Engineering"

I explicitly reject what I call "Vibe Engineering" — the practice of making things work without understanding why they work. Copy-pasting Arduino code, following tutorials blindly, connecting components "because that's what the schematic shows."

This creates **impostor syndrome**. I experienced it in software. I refuse to repeat it in hardware.

## 2.2 The 4-Step Iteration Methodology

### Step 1: The Probe (טעימה)
Initial exposure to a new topic. Testing for emotional and intellectual connection. This is a filter — some fields resonate, others don't.

*Example: I discovered DSP only after getting an oscilloscope. Initially thought it would be boring. Turned out to be fascinating.*

### Step 2: The Baseline (פרויקט בסיס)
Build a Minimum Viable Product. See "signs of life" (blinking LED, sensor reading data). This creates **friction with reality** — revealing gaps between theory and practice.

### Step 3: The North Star Capstone (כוכב הצפון)
Define an ambitious end-goal project at academic capstone level. This serves as an **anchor for all subsequent learning**. Every theory learned, every component understood, serves this larger goal.

*For eduLAB: The North Star is a complete DSP education workstation.*

### Step 4: Incremental Complexity (טיפוס אבולוציוני)
Add layers of complexity one at a time. Each new component requires theoretical learning: **"Why does this happen?"** before **"How do I connect it?"**

## 2.3 Iron Principles

### No Black Boxes
Never use a component or library without understanding the physics or logic behind it. If you can't explain it, you don't use it.

### The "Why" Logic
Before every connection on a breadboard, explain the electron flow or information flow.

**Example:** Don't connect a capacitor "because that's what the tutorial said." Connect it because you calculated the time constant τ = R × C and you know exactly what frequency you're filtering.

### The Litmus Test
If I'm about to connect a capacitor to a circuit, I must be able to answer:
- What is the time constant τ = RC?
- What frequency does this filter?
- Why this value and not another?

**If I can't answer — I don't connect it. I learn first.**

### Real-Time Theory Integration
Theoretical learning happens **alongside** practical work. Theory solves the problems that practice raises. They are not separate phases.

## 2.4 The Motto

> **"From breadboard tinkerer to hardware designer."**

---

# 3. GRAND VISION — The End Game

## 3.1 What eduLAB Actually Is

**CRITICAL CLARIFICATION:** eduLAB is NOT just a synthesizer. It is fundamentally different.

eduLAB is a **DSP Education Sandbox** — a physical product that can demonstrate:
- Digital Signal Processing concepts
- Analog filter design
- Amplifier circuits
- Noise filtering techniques
- Audio signal analysis

It's a product where you can **control what you generate digitally** and **physically manipulate what comes out through analog circuits you build yourself**.

## 3.2 The Core Concept

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      eduLAB AUDIO WORKSTATION                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────┐              ┌─────────────────┐                  │
│  │   OSCILLOSCOPE  │              │   DSP CONTROL   │                  │
│  │     DISPLAY     │              │     DISPLAY     │                  │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓  │              │  Freq: 440Hz    │                  │
│  │  Waveform View  │              │  Wave: Sine     │                  │
│  └─────────────────┘              └─────────────────┘                  │
│                                                                         │
│  ┌─ CONTROL SURFACE ───────────────────────────────────────────────┐   │
│  │  [ENC1] [ENC2] [ENC3] [ENC4]    ═══ ═══ ═══                     │   │
│  │   Freq  Filter  Res   Env      PITCH FILTER LFO                 │   │
│  │                                                                  │   │
│  │  [SW1] [SW2] [SW3] [SW4] [SW5]  ← Mode Selection Switches       │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─ ANALOG EXPERIMENTATION LAB ─────────────────────────────────────┐   │
│  │  ┌──────────────────────┐    ┌──────────────────────┐           │   │
│  │  │ ░░░░░░░░░░░░░░░░░░░ │    │ ░░░░░░░░░░░░░░░░░░░ │           │   │
│  │  │ ░░ BREADBOARD 1 ░░░ │    │ ░░ BREADBOARD 2 ░░░ │           │   │
│  │  │ ░░░░░░░░░░░░░░░░░░░ │    │ ░░░░░░░░░░░░░░░░░░░ │           │   │
│  │  │   [Op-Amps, Caps,   │    │   User-built        │           │   │
│  │  │    Resistors...]    │    │   Filter Circuits   │           │   │
│  │  └──────────────────────┘    └──────────────────────┘           │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  SIGNAL IN ●────► BREADBOARD ────► SCOPE ●  ◄── Analyze anywhere      │
│            (from signal generator)                                      │
└─────────────────────────────────────────────────────────────────────────┘
```

## 3.3 The Inspiration

**Primary Inspiration:** Educational laboratory equipment that combines theoretical concepts with hands-on experimentation.

**Secondary Inspirations:**
- Tektronix laboratory instruments (professional, serious aesthetic)
- MIT Media Lab prototypes (experimental, educational focus)

## 3.4 Signal Flow Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   DIGITAL    │     │   ANALOG     │     │   USER-BUILT │     │   ANALYSIS   │
│  SYNTHESIS   │────►│  OUTPUT      │────►│   CIRCUITS   │────►│  (SCOPE)     │
│              │     │  STAGE       │     │  (Breadboard)│     │              │
│ • Sine       │     │ • DAC        │     │ • Filters    │     │ • Waveform   │
│ • Square     │     │ • Buffer     │     │ • Amplifiers │     │ • FFT        │
│ • Triangle   │     │ • Line Out   │     │ • Custom     │     │ • Measurements│
│ • Sawtooth   │     │              │     │              │     │              │
│ • Noise      │     │              │     │              │     │              │
│ • Mixed      │     │              │     │              │     │              │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

**The Key Differentiator:** The user can take the digital signal, route it through **physical analog circuits they build on the breadboards**, and then analyze the results on the built-in oscilloscope. This creates a complete learning loop for DSP and analog design.

## 3.5 Target Specifications (Final Product)

### Digital Core
| Specification | Target |
|---------------|--------|
| Processor | Teensy 4.1 (ARM Cortex-M7 @ 600MHz) |
| Audio Quality | 16-bit / 44.1kHz Stereo |
| Audio Protocol | I2S to External DAC |
| DAC | PCM5102A (×2 for stereo) |
| ADC | PCM1808 (for scope input) |
| Polyphony | 6-8 concurrent voices |

### Signal Generator Capabilities
| Waveform | Description |
|----------|-------------|
| Sine | Pure tone, fundamental frequency |
| Square | Harmonic-rich, variable duty cycle |
| Triangle | Softer harmonics than square |
| Sawtooth | Full harmonic series |
| Noise | White/Pink noise for testing |
| Combined | Any waveform + noise overlay |

### User Interface
| Component | Specification |
|-----------|---------------|
| Main Displays | 2× 2.8" TFT LCD (ILI9341, SPI) |
| Encoders | 4× EC11 with LED halos |
| Faders | 3× 60mm linear slide potentiometers |
| Switches | 5× DPDT metal toggle switches |
| VU Meters | 2× 10-segment LED bar graphs |
| Indicators | Assorted status LEDs |

### Analog Section
| Component | Purpose |
|-----------|---------|
| Breadboards | 2× 830-point solderless boards |
| Op-Amps | TL072 (×10), NE5532 (×5) |
| Power Rails | ±12V dual rail supply |
| Protection | 3.3V Zener diodes on all inputs |

### Connectivity
| Port | Specification |
|------|---------------|
| Scope Inputs | 2× BNC connectors (Channel A/B) |
| Power | Banana jacks (+12V, GND, -12V) |
| Audio Out | 3.5mm stereo jack |
| Speakers | 2× 40mm 3W/4Ω drivers |
| Headphones | 3.5mm with dedicated amp |
| Digital | USB (programming + MIDI) |

### Physical Design
| Aspect | Specification |
|--------|---------------|
| Construction | Layered acrylic + FR4 PCB sandwich |
| Panel | Matte black PCB with white silkscreen |
| Angle | 6° tilted front panel |
| Mounting | Stainless steel standoffs |
| Aesthetic | Industrial laboratory instrument |

## 3.6 The Educational Purpose

The final product should be suitable for:
- University electronics labs
- Self-learners studying DSP
- Audio engineering education
- Analog circuit design courses
- Anyone wanting to understand "what happens to a signal"

**It makes the invisible visible.**

## 3.7 Full Signal Path Vision (Future)

The PCM5102A DAC module currently in use includes a built-in op-amp buffer and integrated 3.5mm stereo jack. This does **not** mean the final eduLAB design will skip these stages. The final signal path will be:

```
┌─────────────┐
│   ESP32/    │
│   Teensy    │
│   (DSP)     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  PCM5102A   │  ← Raw I2S output
│    (DAC)    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Op-Amp     │  ← Impedance matching
│  Buffer     │     + gain control
│ (TL072/etc) │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   LPF with  │  ← User-adjustable
│   Slider    │     reconstruction filter
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ BREADBOARD  │  ← **The Sandbox**
│  SECTION    │     User builds circuits here:
│             │     - Filters (RC, LC, active)
│             │     - Amplifiers (BJT, op-amp)
│             │     - Clippers, rectifiers
│             │     - Mixing circuits
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Output     │  ← 3.5mm jack
│  Jack       │     To scope/speakers
└─────────────┘
```

The DAC's built-in jack is **perfect for rapid prototyping and testing**, but the final product will have **full analog signal path control** for educational purposes.

---

# 4. CURRENT VERSION (v4.0) — "The Hi-Fi Leap"

## 4.1 Version Overview

| Parameter | Value |
|-----------|-------|
| Version | v4.0 "The Hi-Fi Leap" |
| Status | ✅ COMPLETE |
| Completion Date | February 2026 |
| Theme | Migration from PWM to true I2S digital audio with full OOP architecture |

**What v4.0 accomplished:** Replaced PWM-based "fake DSP" with true digital signal processing using I2S protocol and external DAC (PCM5102A). Complete code refactoring from 450-line monolithic procedural code to clean multi-file OOP architecture. Implemented dual-core real-time audio architecture. Proved 3-voice polyphony concept.

## 4.2 Hardware Configuration

### Microcontroller
| Parameter | Value |
|-----------|-------|
| Model | ESP32-S3-N16R8 (DevKitC) |
| Architecture | Dual-core Xtensa LX7 |
| Clock | 240 MHz |
| Flash | 16 MB |
| PSRAM | 8 MB |
| Power | 5V USB input, 3.3V logic |

### Audio Output — I2S + DAC
| Component | Specification | Purpose |
|-----------|---------------|---------|
| DAC | PCM5102A Module | 16-bit I2S stereo DAC |
| Protocol | I2S (Inter-IC Sound) | Digital audio transport |
| Sample Rate | 44,100 Hz | CD-quality audio |
| Bit Depth | 16-bit signed integer | High dynamic range |
| Output | Built-in op-amp buffer + 3.5mm stereo jack | Line-level output |

### I2S Pinout (ESP32-S3 → PCM5102A)
| Signal | GPIO Pin | Function |
|--------|----------|----------|
| BCK (Bit Clock) | GPIO 39 | 1.4112 MHz clock `[SCOPE VERIFIED]` |
| LRCK (Word Select) | GPIO 38 | 44.1 kHz sample clock `[SCOPE VERIFIED]` |
| DIN (Data In) | GPIO 40 | Serial audio data |

### PCM5102A Module Configuration
| Pin | Connection | Purpose |
|-----|------------|---------|
| FLT | GND (direct) | Normal latency filter mode |
| FMT | GND (direct) | I2S format (not Left-Justified) |
| XSMT | 3.3V (direct) | Soft-mute disabled (always on) |
| SCK | GND | Internal clock generation (no external MCLK) |

### Input Interface
| Component | Pin | Function | Notes |
|-----------|-----|----------|-------|
| Potentiometer 1 | GPIO 1 (ADC) | Pitch Control | RV09 type, logarithmic mapping |
| Potentiometer 2 | GPIO 2 (ADC) | Not in use (reserved for future) | RV09 type |
| Rotary Encoder CLK | GPIO 6 | Menu Navigation | HW-040 (EC11 clone) |
| Rotary Encoder DT | GPIO 7 | Menu Navigation | Gray code state machine decoder |
| Encoder Button | GPIO 15 | Selection/Mute | Debounced, short/long press |

### Display
| Parameter | Value |
|-----------|-------|
| Type | 0.91" OLED |
| Resolution | 128×32 pixels |
| Interface | I2C (SDA: GPIO 4, SCL: GPIO 5) |
| Address | 0x3C |
| Driver | SSD1306 |

## 4.3 Software Architecture

### Overview
| Aspect | Value |
|--------|-------|
| Language | C++17 |
| Framework | Arduino (via PlatformIO) |
| Structure | Multi-file OOP architecture |
| Real-time | Dual-core FreeRTOS (Core 0: Audio, Core 1: UI) |
| Audio | I2S with DMA buffering |

### File Structure
```
lib/
├── AudioEngine/
│   ├── AudioEngine.h
│   ├── AudioEngine.cpp
│   └── Waveforms/
│       ├── WaveformGenerator.h    (abstract base class)
│       └── Waveforms.h            (5 waveform implementations)
├── Voice/
│   ├── Voice.h
│   └── Voice.cpp
├── Menu/
│   ├── Menu.h
│   └── Menu.cpp
├── StateMachine/
│   ├── StateMachine.h
│   └── StateMachine.cpp
├── DisplayManager/
│   ├── DisplayManager.h
│   └── DisplayManager.cpp
├── Button/
│   ├── Button.h
│   └── Button.cpp
├── RotaryEncoder/
│   ├── RotaryEncoder.h
│   └── RotaryEncoder.cpp
└── Potentiometer/
    ├── Potentiometer.h
    └── Potentiometer.cpp

src/
├── main.cpp
└── Utils.h                        (logarithmic mapping functions)
```

### Class Descriptions

**Potentiometer** — Reads analog input with EMA filter (alpha=0.15) and hysteresis threshold (40 LSB). Returns stable, filtered ADC values. `update()` returns true only when value changes beyond threshold.

**Button** — Detects short press vs. long press (800ms threshold) with 10ms debounce. Uses event consumption pattern: flags set internally, cleared on read via `wasShortPressed()` / `wasLongPressed()`. Fires long press at the moment threshold is crossed (not on release).

**RotaryEncoder** — Gray code state machine decoder for reliable direction detection on cheap HW-040 encoder. Uses static wrapper pattern for ISR compatibility. Half-step resolution (divide by 2) with modulo arithmetic to preserve incomplete rotations. Reliability achieved purely through Gray code state table decoding — no time-based debounce (removed in "Turbo Mode" optimization).

**Menu** — Holds 5 waveform modes: `{SINE, TRIANGLE, SQUARE, SAW, NOISE}` with `WaveMode` enum. Manages `currentIndex` (cursor position) and `selectedMode` (active waveform, -1 = none). Wrap-around navigation with `(index - 1 + 5) % 5`.

**StateMachine** — "Big Boss" coordinator with 3 states:
```
enum State { MUTE, MENU, PLAYING };
```
- **MUTE:** Safe boot state. Silent. White screen. Encoder ignored. Long press → MENU (if no mode selected) or PLAYING.
- **MENU:** Waveform selection. Encoder navigates. Short press selects → PLAYING. 10s timeout → PLAYING. Long press → MUTE.
- **PLAYING:** Active audio output. Encoder movement → MENU. Long press → MUTE.

Owns Menu instance via composition.

**DisplayManager** — Handles all OLED rendering. Separate render methods per state: `renderMuted()`, `renderMenu()`, `renderPlaying()`. Uses `drawCenteredText()` and `drawWaveIcon()` helpers. 50ms update interval.

**WaveformGenerator** (Abstract Base) — Pure virtual `getSample(float phase)` returning normalized float in [-1.0, 1.0]. Virtual destructor for safe polymorphic deletion. Stateless design: receives phase, returns sample.

**Five Waveform Implementations (all in Waveforms.h):**
- `SineWave`: `sin(phase)`
- `TriangleWave`: Linear ramp up (0→π) then down (π→2π)
- `SquareWave`: `(phase < PI) ? 1.0 : -1.0`
- `SawWave`: Linear ramp -1→1 over full period
- `NoiseWave`: `random(-32767, 32767) / 32767.0f`

**Voice** — Independent sound unit with own `phase`, `frequency`, `amplitude`, `phaseIncrement`, and `WaveformGenerator*` pointer. `isActive` flag prevents unnecessary computation. `noteOn()` resets phase and activates. `noteOff()` deactivates. `getNextSample()` advances phase and returns scaled sample.

**AudioEngine** — Core audio processor. Manages array of 4 Voice objects, I2S driver initialization, and buffer filling. Key architecture:
- `fillBuffer()`: Double loop — outer iterates buffer samples, inner sums all active voices. Division by MAX_VOICES prevents clipping. Multiplication by `masterVolume` for global scaling.
- Feedback tone system: State machine (`NORMAL_PLAYBACK` / `FEEDBACK_TONE`) with sample counting for non-blocking beeps. Feedback amplitude capped at `min(masterVolume * 0.5f, 0.15f)` to prevent ear damage regardless of master volume setting — a deliberate UX safety measure.
- `amplitude` = 1.0 (constant), `masterVolume` = 0.5 (constant). Separate values designed for future polyphony where each voice has independent amplitude.

### Dual-Core Architecture
```
┌─────────────────────────────────┐
│         Core 0 (240MHz)         │
│     Dedicated Audio Task        │
│                                 │
│  audioTask() {                  │
│    while(true) {                │
│      audioEngine.update();      │
│      // i2s_write() blocks      │
│      // naturally ~5.8ms        │
│    }                            │
│  }                              │
│                                 │
│  CPU Usage: ~0.9%               │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│         Core 1 (240MHz)         │
│        UI / Control Loop        │
│                                 │
│  loop() {                       │
│    button.update();             │
│    potPitch.update();           │
│    encoder events → SM;         │
│    stateMachine.update();       │
│    displayManager.update();     │
│    delay(10);                   │
│  }                              │
│                                 │
│  CPU Usage: ~4.3%               │
└─────────────────────────────────┘
```

**Why dual-core:** Display I2C updates take 10-12ms (blocking). I2S audio buffer holds only 5.8ms of audio. Without separation, display updates starve the audio buffer, causing audible clicks and pops. `[SCOPE VERIFIED]`

**Cross-core safety:** `volatile` keyword on shared variables (`audioState`, `feedbackSamplesRemaining`, `feedbackFrequency`).

### Logarithmic Frequency Mapping

Implementation in `Utils.h`:
```
f(t) = f_min × (f_max / f_min)^t
where t = ADC_value / 4095
```

Behavior:
- At 20Hz: ~0.8Hz per 10 ADC steps (fine bass control)
- At 200Hz: ~2Hz per 10 ADC steps
- At 2kHz: ~20Hz per 10 ADC steps
- At 20kHz: ~50Hz per 10 ADC steps (perceptually irrelevant)

Asymmetric dead zones: 50 LSB at low end (1.2%), 200 LSB at high end (4.9%) to lock endpoints and prevent oscillation near ADC limits.

### I2S Configuration
```cpp
i2s_config_t:
  .mode = I2S_MODE_MASTER | I2S_MODE_TX
  .sample_rate = 44100
  .bits_per_sample = 16-bit
  .channel_format = RIGHT_LEFT (stereo)
  .communication_format = I2S_COMM_FORMAT_STAND_I2S
  .dma_buf_count = 8
  .dma_buf_len = 64
  .tx_desc_auto_clear = true
```

Buffer: 256 samples (128 stereo pairs) = 5.8ms of audio per fill. Mono signal duplicated to both L/R channels.

## 4.4 Key Technical Achievements

### 1. I2S Audio Integration `[SCOPE VERIFIED]`
Successfully replaced PWM audio with I2S protocol. BCK measured at 1.4112 MHz, LRCK at 44.1 kHz on oscilloscope. Clean 16-bit stereo output through PCM5102A DAC.

### 2. Logarithmic Frequency Mapping `[VERIFIED]`
Implemented perception-matched frequency control. Sub-Hz precision at bass frequencies (20-200Hz). Eliminated the "robotic stepping" of linear mapping. Asymmetric dead zones prevent endpoint oscillation.

### 3. Dual-Core Real-Time Architecture `[VERIFIED]`
Eliminated audio buffer underruns caused by blocking I2C display operations. Only 5 lines of FreeRTOS wrapper code needed — direct payoff of clean OOP architecture. 82% of DSP code reusable for future Teensy migration.

### 4. Phase Accumulator Synthesis `[CODE]`
True mathematical waveform generation: `phase += TWO_PI * frequency / SAMPLE_RATE`. All 5 waveforms normalized to [-1.0, 1.0] with proper phase wrapping. Gibbs phenomenon observed on oscilloscope for square wave — proof of correct band-limited behavior.

### 5. Polyphony POC (4-Voice Engine, 3-Voice Demo) `[VERIFIED]`
Engine architecture supports 4 simultaneous voices (`MAX_VOICES = 4`). Demonstrated with hardcoded major chord: Voice 0 = root frequency, Voice 1 = root × 1.25 (major third), Voice 2 = root × 1.5 (perfect fifth). Voice 3 available but unused in current demo. Software mixer with clipping prevention (divide by MAX_VOICES). No additional DAC required — single PCM5102A handles all voices.

### 6. Complete OOP Refactoring `[CODE]`
Migrated from 450-line monolithic procedural code to 8+ class architecture with proper separation of concerns. Header/source separation, forward declarations, composition patterns, polymorphic waveform hierarchy.

### 7. Bug Hunting Victories

**Guru Meditation / NULL Pointer Crash:** `i2s_write()` received NULL pointer for `bytes_written` parameter. Caused `StoreProhibited` crash at address 0x00000000. Fix: Provide valid `size_t` variable.

**masterVolume Stuck at Zero:** `setMasterVolume(0)` called during MUTE but never restored on unmute. Fix: Use `memset(audioBuffer, 0, ...)` for silence instead of modifying global volume.

**Integer map() Trap:** `map(val, 0, 4095, 0, 1.0)` returns `long`, not `float`. All values below 4095 mapped to 0, making amplitude permanently zero. Fix: Use floating-point division instead.

**Noise Waveform Mutex Panic:** 4 voices × `random()` at 44.1kHz = 176,000+ calls/second. Triggered FreeRTOS mutex lock on ESP32's `random()` implementation → Watchdog reset. Decision: Noise remains monophonic.

**I2S Pin Swap:** BCK and LRCK physically swapped on breadboard. Oscilloscope showed LCK at 1.4MHz (should be 44.1kHz). Diagnosed by measuring each signal independently.

**Feedback Tone Silent After Mute:** `return` statement in MUTE handling exited `update()` before feedback tone check. Fix: Reorder priority — feedback tones checked first (highest priority), then mute state.

**Watchdog Crash on MENU Entry:** Entering MENU state while audio was playing caused `rst:0x8 (TG1WDT_SYS_RST)` — Watchdog Timer Reset. Root cause: `AudioEngine::update()` could enter a path where `i2s_write()` was never called, causing the audio task on Core 0 to spin indefinitely without yielding. Fix: Restructured `update()` logic so that every code path always ends with an `i2s_write()` call, ensuring the DMA-blocking behavior acts as the natural task yield point. This is a classic real-time systems lesson — a task that never blocks will starve the watchdog.

**Accumulator Bug in Mixer:** `mixedSample` not reset to 0.0 between samples in buffer loop. Signal grew to infinity. Fix: Initialize `float mixedSample = 0.0f` at start of each sample iteration.

## 4.5 Known Limitations (Documented & Accepted)

### Hardware Limitations (Breadboard Prototype)

**1. Power Rail Noise**
- Breadboard has 10+ jumper wires sharing same power rail
- Minor background hiss in audio output
- Accepted for breadboard phase; PCB will resolve `[PLAN]`

**2. LCK Signal Integrity**
- Oscilloscope shows inductive spikes on LCK line (Vmax=5V, Vmin=-2.2V)
- Long breadboard jumper wires create parasitic inductance
- Does not affect audio quality (I2S protocol is robust)
- PCB with controlled trace impedance will resolve `[PLAN]`

**3. Potentiometer Jitter**
- Frequency display jumps ±30-70Hz when pot untouched
- ESP32 ADC noise: ±30-50 LSB on breadboard
- Mitigated by EMA filter (alpha=0.15), hysteresis (40 LSB), logarithmic mapping
- Trade-off: stability vs. responsiveness (favors stability)
- Future: Replace with high-quality rotary encoder `[PLAN]`

**4. HW-040 Encoder Quality**
- Cheap EC11 clone with half-step detents
- Requires software compensation (Gray code state machine + half-step resolution)
- Direction detection: 100% accurate after fix
- Future: Upgrade to Bourns or Alps encoder `[PLAN]`

**5. Noise Waveform Monophonic Only**
- ESP32's `random()` function uses FreeRTOS mutex internally
- 4-voice polyphonic noise causes mutex panic and Watchdog reset
- Noise remains single-voice; will be re-evaluated on Teensy `[PLAN]`

**6. Encoder Reacts to Touch**
- Touching DAC wires / breadboard jumpers causes encoder to register phantom events
- Caused by capacitive coupling on shared noisy ground
- Accepted for breadboard; PCB with proper grounding will resolve `[PLAN]`

## 4.6 Success Criteria Status

| Criterion | Status | Notes |
|-----------|--------|-------|
| Clean 16-bit audio via I2S DAC | ✅ Complete | Zero clicks/pops with dual-core architecture `[SCOPE VERIFIED]` |
| True sine wave generation | ✅ Complete | 5 mathematically correct waveforms `[SCOPE VERIFIED]` |
| Op-amp buffered output stage | ✅ Present* | *Built into PCM5102A DAC module (temporary; external op-amp in future versions) |
| 3.5mm stereo jack output | ✅ Present* | *Built into PCM5102A DAC module (temporary; dedicated jack in future versions) |
| Full OOP code architecture | ✅ Complete | 8+ classes, clean separation of concerns, multi-file structure |
| 2-voice polyphony | ✅ POC (4-voice engine, 3-voice demo) | Hardcoded major chord generator. 4th voice available. UI for per-voice control deferred to v6.0 |
| Boot screen with version info | ✅ Complete | "eduLAB" splash screen, 2-second duration, centered text |
| No sound until mode selected | ✅ Complete | MUTE → MENU → PLAYING flow, safe boot |
| Smooth pitch control (sub-Hz) | ✅ Complete | Logarithmic mapping, ~0.8Hz precision at 20Hz |

---

# 5. NEXT VERSION (v5.0) — "The Platform Leap"

## 5.1 Version Focus

**Theme:** Platform Migration — ESP32 → Teensy 4.1

**Objective:** Port all v4.0 functionality to a platform capable of true DSP work. Validate that the OOP architecture built in v4.0 is genuinely portable.

**What v5.0 IS:** A clean migration. Same functionality, better platform, proven architecture.

**What v5.0 is NOT:** No new features. No TFT display. No new encoders. No new UI. **Only migration.**

## 5.2 Why Teensy 4.1

| Parameter | ESP32-S3 | Teensy 4.1 |
|-----------|----------|------------|
| CPU | 240MHz dual-core Xtensa LX7 | 600MHz single-core ARM Cortex-M7 |
| FPU | Software emulation | **Hardware FPU** (single & double precision) |
| I2S | ESP-IDF driver, quirky | Native, DMA-based |
| RTOS | FreeRTOS mandatory | Optional (bare metal possible) |
| `sin()` call | ~230 cycles | **~10 cycles** (hardware FPU) |
| RAM | 512KB SRAM | 1MB+ with PSRAM |
| MCLK | Not available | **Can generate Master Clock** for DAC |

**Practical meaning for DSP:**
- 4-voice polyphony on ESP32 = ~17% CPU
- 4-voice polyphony on Teensy = ~1% CPU
- Opens the door to 16+ voices, real-time filters, and effects in future versions

## 5.3 Development Phases

### Phase 1: Platform Familiarization
- Blink LED on Teensy — verify toolchain works
- Serial communication — verify debug capability
- Read IMXRT1062 datasheet: Cortex-M7 architecture, pin mapping
- **Critical Decision:** Audio Library vs. I2S from scratch (see Section 5.4)

### Phase 2: I2S from Scratch on Teensy
- Read IMXRT1062 Reference Manual — SAI (I2S) section
- Implement I2S init: MCLK, BCLK, LRCK, DIN
- Understand DMA on Teensy (different from ESP32!)
- **Milestone:** Clean sine tone from PCM5102A

### Phase 3: DSP Code Port
**What should port without changes (OOP payoff):**
- `WaveformGenerator` hierarchy ✅
- `Voice` class ✅
- `fillBuffer()` logic ✅
- `mapLogarithmic()` utils ✅

**What will require changes:**
- `AudioEngine::begin()` — I2S initialization is completely different
- `AudioEngine::update()` — DMA callback instead of FreeRTOS task
- Pin definitions — entirely different pinout
- FreeRTOS tasks — may not be needed at all on Teensy

**Milestone:** All 5 waveforms playing, polyphony working, identical to ESP32.

### Phase 4: Teensy-Specific Optimizations
**MCLK (Master Clock):**
- Teensy can generate MCLK for DAC (ESP32 could not)
- PCM5102A works better with external MCLK
- Result: Lower clock jitter, higher audio quality
- **Measure on scope: before vs. after**

**FPU Optimization:**
- Verify compilation with `-mfpu=fpv5-d16 -mfloat-abi=hard`
- Measure `fillBuffer()` execution time before/after
- Result: Massive headroom for future polyphony

**Frequency Accuracy:**
- ESP32 had clock drift from FreeRTOS scheduling
- Teensy with hardware timer = more accurate frequencies
- **Measure:** frequency error before/after

### Phase 5: UI Port
**Should port without changes:**
- `Menu` class ✅
- `StateMachine` class ✅
- `Button` class ✅
- `DisplayManager` class ✅ (probably)

**Will require changes:**
- Pin assignments
- I2C address verification
- Interrupt pins for encoder (Teensy has more interrupt-capable pins)

**Milestone:** Full UI working on Teensy, identical to ESP32.

### Phase 6: Testing & Validation
**Required tests:**
- All 5 waveforms play ✅
- Polyphony — 3 voices simultaneously ✅
- Encoder navigation ✅
- Potentiometer frequency control ✅
- Logarithmic mapping ✅
- Feedback tones ✅
- Boot sequence ✅
- **No watchdog crashes** ✅

**Scope measurements:**
- Sine wave THD: ESP32 vs. Teensy comparison
- Square wave rise time, Gibbs phenomenon comparison
- LRCK = 44.1kHz ✅
- BCK = 1.4112MHz ✅
- Noise floor comparison: ESP32 vs. Teensy

## 5.4 Critical Decision: Audio Library

**Option A: Teensy Audio Library**
- Advantage: "Just works", optimized, community support
- Disadvantage: Black box — contradicts "No Black Boxes" philosophy

**Option B: I2S from Scratch (Recommended)**
- Advantage: Full understanding, portable code, true learning
- Disadvantage: Additional 2-3 hours debugging

**Recommendation:** Option B, but **read** the Teensy Audio Library source code as reference. This is exactly the "No Black Boxes" philosophy in action — understand the reference implementation, then build your own.

## 5.5 What's NOT in v5.0

| Feature | Reason |
|---------|--------|
| TFT display | That's v6.0 (Experience Leap) |
| Multiple encoders | That's v6.0 |
| Per-voice UI control | That's v6.0 |
| Oscilloscope | That's v7.0 (Measurement) |
| Filters/effects | That's v8.0 (Education) |
| PCB design | That's v9.0 (Production) |

**Purpose:** Prevent scope creep. v5.0 is ONLY about proving the platform migration works.

## 5.6 Success Criteria

| Criterion | Metric |
|-----------|--------|
| Audio quality | Noise floor lower than ESP32 (scope measurement) |
| Frequency accuracy | <1Hz error at 440Hz |
| CPU headroom | `fillBuffer()` < 5% CPU usage |
| Code portability | >80% code identical to v4.0 |
| Stability | 30 minutes continuous runtime without crash |
| Polyphony | 3 voices simultaneously, no clipping |

## 5.7 Known Risks

**1. I2S Initialization Learning Curve**
- ESP32 used `driver/i2s.h` (high-level API)
- Teensy requires direct register manipulation or DMA callbacks
- IMXRT1062 Reference Manual (SAI section) is the key document

**2. DMA Callbacks — New Concept**
- ESP32 used FreeRTOS task that called `i2s_write()` in a loop
- Teensy's correct approach: DMA interrupt callback triggers buffer refill
- This is interrupt-driven audio — **important lesson** in real-time systems

**3. Noise Waveform Mutex Issue**
- ESP32 crashed due to FreeRTOS mutex on `random()`
- Teensy has no FreeRTOS mutex, so this might resolve automatically
- Must verify during testing

## 5.8 What You'll Learn in v5.0

- **DMA:** Direct Memory Access at the physics level — what it is, why it matters
- **Cortex-M7 Architecture:** Pipeline, FPU, cache
- **Hardware Timers:** Why they're more accurate than RTOS scheduling
- **MCLK:** Its role in I2S and how it affects clock jitter
- **Porting:** How to move embedded code between platforms — the practical reality

---

# 6. VERSION HISTORY — The Evolution

## 6.1 Complete Version Timeline

### v1.0 — "The First Beep" (Early 2025)
**Hardware:** ESP32-C3, Buzzer, Single Potentiometer

**What I Built:**
- Potentiometer connected directly to ESP32-C3
- Buzzer connected directly to GPIO (no transistor!)
- Basic `tone()` function usage

**What I Learned:**
- How ADC works (voltage divider concept)
- PWM basics
- **Near-disaster:** Direct GPIO connection to buzzer could have destroyed the MCU

**Key Mistake:** No current limiting, no protection. Got lucky.

---

### v2.0 — "Transistor Protection" (Mid 2025)
**Hardware:** ESP32-C3, Buzzer, Potentiometer, 2N2222 Transistor, Flyback Diode

**What Changed:**
- Added NPN transistor as switch
- Added flyback diode for inductive protection

**What I Learned:**
- Transistor switching fundamentals
- Inductive kickback physics (Faraday's Law)
- Why protection circuits matter

**Key Achievement:** First oscilloscope measurements of flyback spike

---

### v3.0 — "Dual Control" (Late 2025)
**Hardware:** ESP32-S3, Buzzer, 2× Potentiometers, Transistor Driver

**What Changed:**
- Migrated from ESP32-C3 to ESP32-S3
- Added second potentiometer for duty cycle control
- Now controlling both frequency AND waveform shape

**What I Learned:**
- ESP32-S3 LEDC peripheral differences
- Dual-core considerations (though not fully exploited)
- Duty cycle affects perceived timbre

**Key Challenge:** Dual-core synchronization issues (not fully resolved)

---

### v3.5 — "The Screen" (December 2025)
**Hardware:** Added 0.91" OLED, Rotary Encoder

**What Changed:**
- I2C OLED display for visual feedback
- Rotary encoder for menu navigation
- State machine UI architecture

**What I Learned:**
- I2C protocol fundamentals
- Display buffer management
- State machine design patterns
- Interrupt-driven encoder reading

**Key Challenge:** Balancing display refresh rate with audio stability

---

### v3.8 — "The Transistor Era" (January 2026)

#### Hardware Specifications

**Microcontroller:**
| Parameter | Value |
|-----------|-------|
| Model | ESP32-S3-N16R8 (DevKitC) |
| Architecture | Dual-core Xtensa LX7 |
| Clock | 240 MHz |
| Flash | 16 MB |
| PSRAM | 8 MB |
| Power | 5V USB input, 3.3V logic |

**Audio Output Stage:**
| Component | Specification | Purpose |
|-----------|---------------|---------|
| Driver Transistor | 2N2222 NPN | Common-emitter switching |
| Load | 8Ω Speaker (replaced buzzer) | Sound output |
| Protection | 1N4007 Flyback Diode | Inductive kickback clamping |
| Signal Type | PWM (LEDC Peripheral) | Tone generation |
| Resolution | 8-bit equivalent | Lo-Fi intentionally |

**Input Interface:**
| Component | Pin | Function | Notes |
|-----------|-----|----------|-------|
| Potentiometer 1 | GPIO 1 (ADC) | Pitch Control | RV09 type |
| Potentiometer 2 | GPIO 2 (ADC) | Duty Cycle/Shape | RV09 type |
| Potentiometer 3 | Series with speaker | Volume | **LIMITATION: Impedance mismatch** |
| Rotary Encoder | GPIO 6, 7 | Menu Navigation | HW-040 (EC11) |
| Encoder Button | GPIO 15 | Selection/Mute | With debounce |

**Display:**
| Parameter | Value |
|-----------|-------|
| Type | 0.91" OLED |
| Resolution | 128×32 pixels |
| Interface | I2C (SDA: GPIO 4, SCL: GPIO 5) |
| Address | 0x3C |
| Driver | SSD1306 |

**Complete Schematic (Conceptual):**
```
                                    +5V (USB)
                                      │
                                      │
    ┌─────────────────────────────────┼─────────────────────────────────┐
    │                                 │                                 │
    │  ┌──────────────────────────────┴──────────────────────────────┐  │
    │  │                         ESP32-S3                            │  │
    │  │                                                             │  │
    │  │  GPIO 16 ──────┐                                           │  │
    │  │                │                                           │  │
    │  │  GPIO 1 ◄──────┼──── POT1 (Pitch) ──── GND                │  │
    │  │  GPIO 2 ◄──────┼──── POT2 (Duty) ───── GND                │  │
    │  │                │                                           │  │
    │  │  GPIO 6 ◄──────┼──── Encoder CLK                          │  │
    │  │  GPIO 7 ◄──────┼──── Encoder DT                           │  │
    │  │  GPIO 15 ◄─────┼──── Encoder SW ────── GND                │  │
    │  │                │                                           │  │
    │  │  GPIO 4 ◄──────┼──── OLED SDA                             │  │
    │  │  GPIO 5 ◄──────┼──── OLED SCL                             │  │
    │  │                │                                           │  │
    │  └────────────────┼────────────────────────────────────────────┘  │
    │                   │                                               │
    │                   │ PWM Signal                                    │
    │                   │                                               │
    │                   ▼                                               │
    │              ┌────┴────┐                                         │
    │              │   1KΩ   │  Base Resistor                          │
    │              └────┬────┘                                         │
    │                   │                                               │
    │                   ▼                                               │
    │              ┌────┴────┐                                         │
    │              │ 2N2222  │  NPN Transistor                         │
    │              │   NPN   │  (Common Emitter)                       │
    │              └────┬────┘                                         │
    │                   │ Collector                                     │
    │                   │                                               │
    │         ┌────────┴────────┐                                     │
    │         │                  │                                     │
    │         ▼                  ▼                                     │
    │    ┌────┴────┐       ┌────┴────┐                                │
    │    │ 1N4007  │       │ Speaker │                                │
    │    │ (Diode) │       │   8Ω    │                                │
    │    └────┬────┘       └────┬────┘                                │
    │         │                  │                                     │
    │         └────────┬─────────┘                                     │
    │                  │                                               │
    │                  ▼                                               │
    │                 GND                                              │
    │                                                                   │
    └───────────────────────────────────────────────────────────────────┘
    
    Note: Flyback diode (1N4007) is ANTI-PARALLEL to speaker
          (Cathode to +5V rail, Anode to Collector)
```

#### Software Architecture

| Aspect | Current State |
|--------|---------------|
| Language | C++17 |
| Framework | Arduino (via PlatformIO) |
| Structure | **Single-file project** (main.cpp) |
| OOP | **NOT implemented** (classes exist but not full OOP architecture) |
| Lines of Code | ~450 |

**Code Structure:**
```cpp
// File: main.cpp (SINGLE FILE)

// 1. HARDWARE CONFIGURATION
//    - Pin definitions
//    - Constants (frequencies, thresholds)

// 2. CLASS: Potentiometer (EMA Filter)
//    - Exponential Moving Average for noise reduction
//    - Hysteresis threshold for stability

// 3. UI STATE MACHINE
//    - STATE_PLAYING: Normal operation
//    - STATE_MENU: Mode selection
//    - Timeout auto-return to playing

// 4. WAVEFORM MODES
//    - Mode 0: Square
//    - Mode 1: Sawtooth (via duty cycle)
//    - Mode 2: Triangle (via duty cycle)
//    - Mode 3: Noise (randomized frequency/duty)

// 5. INTERRUPT SERVICE ROUTINE
//    - Encoder reading (FALLING edge on DT)
//    - Atomic position updates

// 6. setup()
//    - I2C initialization
//    - OLED initialization
//    - LEDC (PWM) configuration
//    - Interrupt attachment

// 7. loop()
//    - Button handling (short press / long press)
//    - Encoder position reading (with atomic protection)
//    - UI state management
//    - Potentiometer reading
//    - Audio output (PWM frequency/duty control)
```

**Key Technical Details:**

EMA Filter: `filteredValue = alpha * newReading + (1 - alpha) * filteredValue` (alpha=0.15, threshold=40)

PWM Audio: `ledcChangeFrequency()` + `ledcWrite()` pair (NOT `ledcWriteTone()` which corrupts duty cycle)

Atomic Encoder: `noInterrupts()` / `interrupts()` around ISR variable reads

#### Known Issues & Limitations

| Issue | Description | Impact |
|-------|-------------|--------|
| Pitch Quantization | Minimum pitch jumps ~15Hz due to aggressive hysteresis | Sound feels robotic |
| Encoder Quality | HW-040 requires multiple rotations to register | Frustrating UX |
| Power Rail Noise | Multiple components sharing power rail | Affects audio quality |
| Volume Control | Series potentiometer creates impedance mismatch | Non-linear volume, affects tone |
| No boot screen | System starts immediately without visual feedback | Poor UX |
| Sound before mode selection | Audio plays before user selects a mode | Unexpected behavior |

#### Debugging Victories (Portfolio Gold)

**1. GPIO Current Collapse `[VERIFIED: DMM]`**
- Symptom: Buzzer voltage dropped from 3.3V to 1.5V when connected directly to GPIO
- Investigation: Measured current draw: 220mA `[DMM]`. GPIO max: 40mA `[DATASHEET]`.
- Root Cause: Buzzer is an inductive load that demands more current than GPIO can provide
- Solution: NPN transistor (2N2222) as low-side switch with current-limiting base resistor

**2. Inductive Kickback (Back-EMF) `[VERIFIED: SCOPE]`**
- Symptom: Oscilloscope showed -400mV negative spikes on falling edges
- Root Cause: Inductor (speaker coil) generates back-EMF when current is cut: V = -L(di/dt)
- Solution: 1N4007 flyback diode anti-parallel to speaker coil
- Verification: Post-fix oscilloscope trace shows spikes clamped to ~0.7V

**3. PWM Timer Conflict ("Phantom Duty Cycle Bug") `[VERIFIED: SCOPE + CODE]`**
- Symptom: Oscilloscope showed 12% duty cycle despite code commanding 50%
- Root Cause: `ledcWriteTone()` internally resets duty cycle, conflicting with `ledcWrite()`
- Solution: Use `ledcChangeFrequency()` + `ledcWrite()` pair instead

**4. ADC Noise / Jitter `[VERIFIED: SCOPE + CODE]`**
- Symptom: Frequency jumping between 10-15 values
- Root Cause: Breadboard capacitance + floating inputs + no filtering
- Solution: EMA filter (alpha=0.15) + hysteresis threshold (40 LSB)

#### Success Criteria for v3.8

- [x] Stable square wave output via 2N2222 transistor
- [x] Inductive spikes clamped below 3.6V (GPIO safe)
- [x] OLED displays real-time parameters
- [x] Multiple waveform modes (Square, Saw, Triangle, Noise)
- [x] Rotary encoder navigation (functional, though not perfect)
- [x] Potentiometer control with noise filtering
- [x] State machine UI with timeout behavior
- [x] Safe boot sequence (starts muted)
- [ ] Smooth pitch control (blocked by quantization issue — resolved in v4.0)
- [ ] Clean power rails (blocked by noise issue — hardware limitation)

---

### v4.0 — "The Hi-Fi Leap" (Completed: February 2026)

**Summary:** The most significant upgrade in the project's history. Replaced PWM-based "fake DSP" with true I2S digital audio through PCM5102A DAC. Complete code refactoring from single-file procedural to multi-file OOP architecture. Implemented dual-core real-time audio processing. Proved 3-voice polyphony concept with hardcoded major chord generator.

**Key Achievements:**
- I2S audio integration with PCM5102A DAC at 16-bit/44.1kHz
- 5 mathematically correct waveforms (Sine, Triangle, Square, Saw, Noise)
- Full OOP architecture: 8+ classes with clean separation of concerns
- Dual-core architecture: Core 0 dedicated audio, Core 1 UI (eliminated buffer underruns)
- Logarithmic frequency mapping for perception-matched control
- 3-voice polyphony POC (software mixer with clipping prevention)
- Phase accumulator synthesis with proper phase wrapping

**Major Bugs Resolved:**
- Guru Meditation NULL pointer crash in `i2s_write()`
- masterVolume stuck at 0 after MUTE → UNMUTE transition
- Integer `map()` returning 0 for all sub-1.0 float targets
- I2S pin swap (BCK/LRCK physically reversed on breadboard)
- Feedback tone priority inversion (checked after MUTE return, never played)
- Watchdog crash on MENU entry (AudioEngine::update path without i2s_write blocked Core 0 indefinitely)
- Display array overflow (5 waveforms but only 4 entries in display array)
- Noise waveform FreeRTOS mutex panic (176K+ random() calls/second)
- Buffer accumulator not reset between samples (signal grew to infinity)
- Audio buffer underruns from blocking I2C display operations (10-12ms blocking vs 5.8ms buffer)
- Encoder "Delayed Beep" bug (long press detected on release instead of hold)
- Encoder bypass in MUTE state (rotation woke system unexpectedly)
- Broken first unmute (selectedMode=-1 caused display/audio failure)

**Lessons Learned:**
- OOP architecture pays off exponentially — dual-core implementation needed only 5 lines of wrapper code
- Refactoring exposes hidden bugs, it doesn't create them
- `map()` returns integers, not floats — a classic Arduino trap
- Display I2C operations are surprisingly slow (~10-12ms) and will starve real-time audio
- Logarithmic frequency mapping is essential for human-perceptual control
- Gibbs phenomenon on scope is proof of correct operation, not a bug
- Virtual destructors are mandatory for polymorphic class hierarchies
- Cross-core communication requires `volatile` keyword

**Blog Post:** [Coming Soon — "v4.0 Complete: The Journey from PWM to I2S"]

---

## 6.2 Lessons Learned Summary

| Version | Key Lesson |
|---------|------------|
| v1.0 | Always check current requirements before connecting loads |
| v2.0 | Inductors fight current changes — always add flyback diodes |
| v3.0 | Platform migration requires understanding peripheral differences |
| v3.5 | State machines simplify complex UI logic |
| v3.8 | Noise filtering is a trade-off between stability and responsiveness |
| v4.0 | Clean OOP architecture enables rapid platform adaptation; real-time audio demands dedicated resources |

---

# 7. BLOG POST TRACKER

## 7.1 Published Posts

| Date | Slug | Title | Tags | Status |
|------|------|-------|------|--------|
| 2026-01-18 | `welcome` | Welcome to eduLAB | announcement, vision | ✅ Live |
| 2026-01-18 | `inductive-kickback-analysis` | Saved by Physics: Analyzing Inductive Kickback & Back EMF | hardware, debugging, theory, oscilloscope, esp32, analog-design, measurements, circuit-protection | ✅ Live |
| 2026-01-18 | `never-connect-buzzer-directly` | Why You Should NEVER Connect a Buzzer Directly to a Microcontroller | hardware, safety, gpio, transistor-drivers | ✅ Live |
| 2026-02-02 | `oop-refactoring` | OOP Refactoring: From 450 Lines to Clean Architecture | software, architecture, oop, refactoring | ✅ Live |

## 7.2 High Priority — Write Now

| Title | Priority | Content Source |
|-------|----------|----------------|
| 🔴 **v4.0 Complete: The Journey from PWM to I2S** | IMMEDIATE | Full v4.0 development documentation (~100 pages). Cover PWM→I2S migration, dual-core architecture, polyphony POC, all major bugs and solutions. |

## 7.3 Planned Posts

| Title | Source | When to Write |
|-------|--------|---------------|
| 🟡 Why Your Synthesizer Sounds Robotic: Logarithmic Frequency Mapping | Documented in v4.0 sessions (Feb 11) | Now (content ready) |
| 🟡 I2S Deep Dive: How Digital Audio Really Works | Documented in v4.0 sessions | Now (content ready) |
| 🟡 Dual-Core Architecture: Why Audio Needs Its Own Core | Documented in v4.0 sessions (Feb 12) | Now (content ready) |
| 🟡 The Polyphony Problem: Building a Software Mixer | Documented in v4.0 sessions (Feb 13-14) | Now (content ready) |
| 🟡 Debugging on Embedded Systems: Scope + Serial = Everything | Cross-cutting lesson from all v4.0 work | Now (content ready) |
| 🟡 Phase Accumulators: The Math Behind Digital Waveforms | Theory post, documented in v4.0 sessions | Now (content ready) |
| 🟡 The Gibbs Phenomenon: When Your Square Wave Isn't Square | Observation from scope during v4.0 | Now (content ready) |
| 🟡 From FreeRTOS to Bare Metal: Migrating to Teensy 4.1 | v5.0 migration experience | During v5.0 |
| 🟡 DMA Explained: Why Polling Audio is Fundamentally Wrong | v5.0 DMA implementation | During v5.0 |
| 🟡 The Transistor as a Switch: A Deep Dive | Theory + practice from v3.8 era | When time allows |
| 🟡 How I Design a Schematic: First Timer's Perspective | Process documentation | When time allows |
| 🟡 Why I Added a Digital Filter to My Code | EMA filter explanation with measurements | When time allows |
| 🟡 My Journey Through Oscilloscope Screenshots | Visual history of project evolution | When time allows |

## 7.4 Blog Post Template

Every blog post should follow this structure:

```markdown
---
slug: unique-url-slug
title: "Compelling Title That Explains Value"
authors: [mati]
tags: [relevant, tags, here]
---

[Hook paragraph that captures attention and states the problem/question]

<!-- truncate -->

## The Context
[What was I trying to do? What was the setup?]

## The Problem / Question
[What went wrong? What did I observe? What was unexpected?]

## The Investigation
[How did I diagnose? What tools did I use? What hypotheses did I test?]

## The Physics / Theory
[Deep dive into WHY this happens. Equations if relevant. First principles.]

## The Solution
[What I did to fix it. Schematic/code if relevant.]

## Verification
[How I confirmed the fix worked. Measurements, screenshots.]

## Lessons Learned
[What I'll do differently next time. Broader principles.]

## Next Steps
[What this enables. Where the project goes from here.]
```

---

# 8. TERMINOLOGY GLOSSARY

## 8.1 Project-Specific Terms

| Term | Definition |
|------|------------|
| **The Engine** | The C++ synthesis core (oscillators, modulators, audio pipeline) |
| **Direct Drive** | Driving speaker directly from transistor without DAC/amplifier |
| **Kickback** | Inductive voltage spike caused by speaker coil (Back-EMF) |
| **HAL** | Hardware Abstraction Layer — code that interfaces with physical pins |
| **EMA Filter** | Exponential Moving Average — digital filter for smoothing ADC readings |
| **North Star** | The ambitious end-goal project that anchors all learning |
| **Vibe Engineering** | Pejorative: Making things work without understanding why |
| **Phase Accumulator** | Counter that increments by `TWO_PI * freq / sampleRate` each sample, generating periodic waveforms |
| **Voice** | Independent sound unit with own phase, frequency, amplitude, and waveform — building block of polyphony |

## 8.2 Technical Terms

| Term | Definition |
|------|------------|
| **PWM** | Pulse Width Modulation — digital approximation of analog signal |
| **I2S** | Inter-IC Sound — standard protocol for digital audio between chips |
| **DAC** | Digital-to-Analog Converter — converts digital samples to voltage |
| **ADC** | Analog-to-Digital Converter — converts voltage to digital samples |
| **LEDC** | LED Control peripheral on ESP32 — used for PWM generation |
| **ISR** | Interrupt Service Routine — code that runs on hardware interrupt |
| **Back-EMF** | Voltage generated by inductor opposing current change |
| **Flyback Diode** | Diode that clamps inductive spikes (also: snubber, freewheeling diode) |
| **Hysteresis** | Dead zone that prevents oscillation around threshold |
| **Duty Cycle** | Percentage of time signal is HIGH in PWM period |
| **DMA** | Direct Memory Access — hardware transfers data without CPU involvement |
| **MCLK** | Master Clock — reference clock for I2S DAC synchronization |
| **BCK / BCLK** | Bit Clock — clock for individual audio data bits in I2S |
| **LRCK / WS** | Left-Right Clock / Word Select — indicates which stereo channel is active |
| **Gibbs Phenomenon** | Overshoot/ripple at discontinuities when representing signals with limited bandwidth |
| **FreeRTOS** | Real-Time Operating System for embedded systems, used on ESP32 |
| **Polyphony** | Ability to play multiple independent tones simultaneously |
| **Headroom** | Safety margin below maximum signal level to prevent clipping |

## 8.3 Component Shorthand

| Shorthand | Full Name | Notes |
|-----------|-----------|-------|
| ESP32-S3 | Espressif ESP32-S3-N16R8 | Current MCU (v4.0) |
| Teensy 4.1 | PJRC Teensy 4.1 | Target MCU (v5.0) |
| 2N2222 | 2N2222A NPN Transistor | Switching transistor (v3.8) |
| 1N4007 | 1N4007 Rectifier Diode | Flyback protection (v3.8) |
| PCM5102A | TI PCM5102A | I2S DAC (v4.0 current) |
| TL072 | TI TL072 | Dual JFET op-amp (future) |
| NE5532 | TI NE5532 | Low-noise dual op-amp (future) |
| SSD1306 | Solomon SSD1306 | OLED display driver |
| EC11 | Alps EC11 series | Rotary encoder |
| HW-040 | Generic EC11 clone | Current encoder (cheap, limited quality) |

---

# 9. BILL OF MATERIALS (Target BOM)

## 9.1 Digital Audio

| Item | Quantity | Purpose | Status |
|------|----------|---------|--------|
| PCM5102A DAC Module | 2 | Hi-Fi stereo output | ✅ 1 in use (v4.0), 1 spare |
| PCM1808 ADC Module | 1 | Line input for scope | To order |
| INMP441 Microphone Module | 1 | Digital I2S microphone | To order |
| PAM8403 Amplifier Module | 2 | 3W stereo speaker amp | ✅ Arrived |
| Speaker 3W 4Ω (40mm) | 2 | Stereo speakers | To order |

## 9.2 Display & Indication

| Item | Quantity | Purpose | Status |
|------|----------|---------|--------|
| 2.8" TFT LCD ILI9341 (SPI) | 1 | Main display (v6.0) | ✅ Arrived |
| 10-Segment LED Bar Graph | 2 | VU meters | To order |
| 5mm LED Assortment | 1 | Status indicators | To order |

## 9.3 Power

| Item | Quantity | Purpose | Status |
|------|----------|---------|--------|
| DC-DC 5V to ±12V Module | 1 | Dual rail for op-amps | Needs verification |

## 9.4 Analog Components

| Item | Quantity | Purpose | Status |
|------|----------|---------|--------|
| TL072 Op-Amp IC | 10 | General purpose, low noise | To order |
| NE5532 Op-Amp IC | 5 | Hi-Fi audio applications | To order |
| DIP-8 IC Sockets | 20 | Socketing ICs (no soldering) | To order |
| 3.3V Zener Diodes (1/2W) | 50 | Input protection | To order |
| 100nF Ceramic Capacitors | 50 | Decoupling | To order |
| Inductor Assortment Kit | 1 | Filters (10µH-10mH range) | To order |

## 9.5 Control Interface

| Item | Quantity | Purpose | Status |
|------|----------|---------|--------|
| EC11 Rotary Encoder Module | 4 | Parameter control (v6.0) | To order |
| Potentiometer Kit (WH148) | 1 | Various values + knobs | To order |
| Slide Potentiometer 10K Linear | 3 | Faders | To order |
| DPDT Toggle Switch | 5 | Mode selection | To order |

## 9.6 Connectivity

| Item | Quantity | Purpose | Status |
|------|----------|---------|--------|
| 3.5mm Audio Jack (Panel Mount) | 5 | Audio I/O | To order |
| BNC Female PCB Connector | 2 | Scope inputs | To order |
| Test Hook Clips / Grabbers | 1 set | Probing | Needs verification |
| 2.54mm Header Pins Male | 10 strips | Connections | To order |

## 9.7 Infrastructure

| Item | Quantity | Purpose | Status |
|------|----------|---------|--------|
| 830 Point Breadboard | 2 | Analog experimentation | To order |
| Premium Jumper Wires Set | 1 | High quality connections | To order |
| CD74HC4067 Multiplexer | 1 | Expand analog inputs | To order |
| Micro SD Card Module | 1 | Data storage backup | To order |

## 9.8 Already Owned

| Item | Quantity | Status |
|------|----------|--------|
| Teensy 4.1 | 1 | Ordered (AliExpress) — for v5.0 |
| ESP32-S3-N16R8 DevKitC | 1 | In use (v4.0) |
| PCM5102A DAC Module | 1 | In use (v4.0) |
| 0.91" OLED SSD1306 | 1 | In use |
| 2N2222 Transistors | Multiple | In stock (used in v3.8) |
| 1N4007 Diodes | Multiple | In stock (used in v3.8) |
| RV09 Potentiometers | 3 | In use (2 active, 1 spare) |
| HW-040 Rotary Encoder | 1 | In use |
| 8Ω Speaker | 1 | In stock (used in v3.8, replaced by DAC output in v4.0) |

---

# DOCUMENT CONTROL

## Revision History

| Version | Date | What Changed | Why | Evidence |
|---------|------|--------------|-----|----------|
| 1.0 | 2026-01-18 | Initial draft | Base prompt creation | N/A |
| 2.0 | 2026-01-18 | Complete rewrite: personal context, corrected grand vision (DSP sandbox not just synth), fixed software section (single-file, no OOP), expanded version history, added BOM, expanded blog tracker | User provided detailed input file with corrections | `/mnt/user-data/uploads/מידע_אישי.txt` |
| 2.1 | 2026-01-18 | Added GROUND TRUTH RULES preamble, verification tags on debugging victories | AI-proofing for cross-reference use | ChatGPT recommendation for anti-hallucination |
| 3.0 | 2026-02-17 | Major update: v4.0 moved to Current Version (Section 4), v5.0 Teensy migration plan added to Next Version (Section 5), v3.8 moved to Version History (Section 6), v4.0 entry added to Version History, Blog tracker updated with all v4.0-era planned posts, Version roadmap added (v4.0→v9.0), Grand Vision updated with full signal path diagram, Glossary expanded with I2S/DMA/polyphony terms, BOM updated with PCM5102A status | v4.0 development complete (Feb 2026). Based on ~100-page development documentation covering all v4.0 sessions. | v4.0 session logs, oscilloscope measurements, working prototype |

## Revision Template

When making changes, copy this template:
```
| X.X | YYYY-MM-DD | [WHAT changed] | [WHY it changed] | [EVIDENCE: commit hash / scope screenshot / photo / code link] |
```

## How to Use This Document

1. **Before writing any blog post:** Check Section 7 for existing posts and planned topics
2. **Before describing the project:** Reference Section 3 (Grand Vision) for accurate description
3. **Before discussing current state:** Reference Section 4 (Current Version) for accurate details
4. **Before using terminology:** Check Section 8 (Glossary) for consistent language
5. **When updating the project:** Update this document FIRST, then create derivative content

## Document Maintenance

This document should be updated:
- When any version milestone is reached
- When new blog posts are published
- When hardware or software architecture changes significantly
- When new components are ordered or integrated
- At minimum: Monthly review even if no changes

## AI Usage Instructions

When providing this document to any AI system (Claude, GPT, Gemini, etc.):

1. **Paste the GROUND TRUTH RULES section first** — It establishes interpretation rules
2. **Reference specific sections** — Don't rely on AI to "remember" the whole doc
3. **Ask AI to cite section numbers** — e.g., "According to Section 4.2..."
4. **Challenge hallucinations** — If AI states something not in this doc, ask for source
5. **Update this doc with corrections** — If AI reveals an error, fix it here first

---

## Changes Made in This Session (v3.0 Update — February 17, 2026)

### Section-by-Section Changes:

1. **Header:** Updated version to 3.0, current phase to v4.0 COMPLETE, next phase to v5.0 PLANNED, last updated date.

2. **Ground Truth Rules:** No changes (version-independent).

3. **Quick Reference Table:** Completely rewritten to reflect v4.0 as current reality. Added Version Roadmap (v4.0→v9.0).

4. **Table of Contents:** Updated section references (v4.0 current, v5.0 next).

5. **Section 1 (The Engineer):** No changes (version-independent).

6. **Section 2 (The Philosophy):** No changes (version-independent).

7. **Section 3 (Grand Vision):** Added Section 3.7 — Full Signal Path Vision with detailed diagram showing DAC → Op-Amp → LPF → Breadboard → Output architecture. Updated to clarify that PCM5102A's built-in op-amp/jack is temporary.

8. **Section 4 (Current Version):** Complete rewrite. Old v3.8 content moved to Section 6. New Section 4 documents v4.0 "The Hi-Fi Leap" with: 4.1 Version Overview, 4.2 Hardware Configuration (I2S pinout, PCM5102A config), 4.3 Software Architecture (full OOP class descriptions, dual-core diagram, logarithmic mapping, I2S config), 4.4 Key Technical Achievements (7 major + bug victories), 4.5 Known Limitations (6 documented items), 4.6 Success Criteria table.

9. **Section 5 (Next Version):** Complete rewrite from v4.0 plan to v5.0 "The Platform Leap" Teensy 4.1 migration plan. Includes: 5.1 Focus, 5.2 ESP32 vs Teensy comparison table, 5.3 Development Phases (6 phases), 5.4 Audio Library decision, 5.5 Scope exclusions, 5.6 Success criteria table, 5.7 Known risks, 5.8 Learning objectives.

10. **Section 6 (Version History):** Added complete v3.8 entry (full copy from old Section 4 — hardware specs, schematic, software architecture, bugs, success criteria). Added v4.0 entry with summary, achievements, bugs resolved, and lessons learned. Updated Lessons Learned table.

11. **Section 7 (Blog Posts):** Updated published posts (added buzzer post and OOP refactoring post). Added High Priority immediate post (v4.0 journey). Added 9 new planned posts from v4.0 sessions (logarithmic mapping, I2S deep dive, dual-core, polyphony, debugging, phase accumulators, Gibbs phenomenon, FreeRTOS→bare metal, DMA).

12. **Section 8 (Glossary):** Added new terms: Phase Accumulator, Voice, DMA, MCLK, BCK/BCLK, LRCK/WS, Gibbs Phenomenon, FreeRTOS, Polyphony, Headroom. Added Teensy 4.1 and HW-040 to component shorthand.

13. **Section 9 (BOM):** Updated PCM5102A status to "1 in use", added Teensy 4.1 purpose note, updated speaker status, added PCM5102A to "Already Owned".

### Items Resolved:
- OOP Refactoring blog post: Published 2026-02-02
- PAM8403 amplifier: Arrived
- TFT ILI9341 display: Arrived

---

**END OF MASTER SOURCE OF TRUTH**

*"From breadboard tinkerer to hardware designer."*
