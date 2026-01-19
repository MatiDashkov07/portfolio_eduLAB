# eduLAB Synthesis Engine
# MASTER SOURCE OF TRUTH (SOT)
## Version 2.1

> **Last Updated:** January 18, 2026  
> **Current Phase:** v3.8 (Prototype / Direct Drive)  
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

## CURRENT REALITY (FACTS) — v3.8
| Aspect | Status | Verification |
|--------|--------|--------------|
| MCU | ESP32-S3-N16R8 | `[IN USE]` |
| Audio Output | PWM via 2N2222 → 8Ω Speaker | `[SCOPE VERIFIED]` |
| Audio Quality | 8-bit equivalent (Lo-Fi) | `[SCOPE VERIFIED]` |
| Display | 0.91" OLED SSD1306 | `[IN USE]` |
| Input | 2× Pots + 1× Encoder | `[IN USE]` |
| Waveforms | Square, Saw, Triangle, Noise | `[CODE VERIFIED]` |
| Code Architecture | Single-file, procedural | `[CODE]` |
| OOP | **NOT IMPLEMENTED** | `[CODE]` |

## FUTURE PLANS (NOT YET BUILT)
| Aspect | Target Version | Status |
|--------|----------------|--------|
| I2S Audio | v4.0 | `[PLAN]` |
| PCM5102A DAC | v4.0 | `[PLAN - ORDERED]` |
| True OOP Architecture | v4.0 | `[PLAN]` |
| Built-in Oscilloscope | v5.0+ | `[LONG-TERM PLAN]` |
| Teensy 4.1 Migration | v5.0+ | `[PLAN - ORDERED]` |
| Custom PCB | vFinal | `[LONG-TERM PLAN]` |
| DSP Sandbox (Full Product) | vFinal | `[GRAND VISION]` |

---

# TABLE OF CONTENTS

1. [THE ENGINEER — Who is Mati?](#1-the-engineer--who-is-mati)
2. [THE PHILOSOPHY — Why Deep Learning Matters](#2-the-philosophy--why-deep-learning-matters)
3. [GRAND VISION — The End Game](#3-grand-vision--the-end-game)
4. [CURRENT VERSION (v3.8)](#4-current-version-v38--the-transistor-era)
5. [NEXT VERSION (v4.0)](#5-next-version-v40--the-hi-fi-leap)
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

**Primary Inspiration:** [eduLABOR assembled](https://www.3quarks.com/en/Encyclopedias/Computer/) — Educational laboratory equipment that combines theoretical concepts with hands-on experimentation.

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

---

# 4. CURRENT VERSION (v3.8) — "The Transistor Era"

## 4.1 Design Philosophy

**Objective:** Understand transistor switching characteristics, inductive loads, and PWM audio generation **before** moving to abstract DACs and audio libraries.

**Motto:** "Low-Level Physics First"

This version is intentionally primitive. The goal is not good audio — it's **deep understanding** of what happens at the electron level.

## 4.2 Hardware Specifications

### Microcontroller
| Parameter | Value |
|-----------|-------|
| Model | ESP32-S3-N16R8 (DevKitC) |
| Architecture | Dual-core Xtensa LX7 |
| Clock | 240 MHz |
| Flash | 16 MB |
| PSRAM | 8 MB |
| Power | 5V USB input, 3.3V logic |

### Audio Output Stage
| Component | Specification | Purpose |
|-----------|---------------|---------|
| Driver Transistor | 2N2222 NPN | Common-emitter switching |
| Load | 8Ω Speaker (replaced buzzer) | Sound output |
| Protection | 1N4007 Flyback Diode | Inductive kickback clamping |
| Signal Type | PWM (LEDC Peripheral) | Tone generation |
| Resolution | 8-bit equivalent | Lo-Fi intentionally |

### Input Interface
| Component | Pin | Function | Notes |
|-----------|-----|----------|-------|
| Potentiometer 1 | GPIO 1 (ADC) | Pitch Control | RV09 type |
| Potentiometer 2 | GPIO 2 (ADC) | Duty Cycle/Shape | RV09 type |
| Potentiometer 3 | Series with speaker | Volume | **LIMITATION: Impedance mismatch** |
| Rotary Encoder | GPIO 6, 7 | Menu Navigation | HW-040 (EC11) |
| Encoder Button | GPIO 15 | Selection/Mute | With debounce |

### Display
| Parameter | Value |
|-----------|-------|
| Type | 0.91" OLED |
| Resolution | 128×32 pixels |
| Interface | I2C (SDA: GPIO 4, SCL: GPIO 5) |
| Address | 0x3C |
| Driver | SSD1306 |

### Complete Schematic (Conceptual)
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

## 4.3 Software Architecture

### Overview
| Aspect | Current State |
|--------|---------------|
| Language | C++17 |
| Framework | Arduino (via PlatformIO) |
| Structure | **Single-file project** (main.cpp) |
| OOP | **NOT implemented** (classes exist but not full OOP architecture) |
| Lines of Code | ~450 |

### Code Structure
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

### Key Technical Details

**EMA Filter Implementation:**
```cpp
class Potentiometer {
    float alpha = 0.15;      // Smoothing factor (higher = faster response)
    int threshold = 40;      // Hysteresis threshold (higher = more filtering)
    
    // filteredValue = alpha * newReading + (1 - alpha) * filteredValue
};
```

**PWM Audio Generation:**
```cpp
// CRITICAL: Order matters!
ledcChangeFrequency(LEDC_CHANNEL, targetFrequency, LEDC_RESOLUTION);
ledcWrite(LEDC_CHANNEL, targetDuty);

// Using ledcWriteTone() corrupts duty cycle settings!
// This was a major bug that took significant debugging to identify.
```

**Atomic Encoder Reading:**
```cpp
noInterrupts();
currentPos = virtualPosition;  // Read ISR variable safely
interrupts();
```

## 4.4 Known Issues & Limitations

### Critical Issues

| Issue | Description | Impact | Planned Fix |
|-------|-------------|--------|-------------|
| **Pitch Quantization** | Minimum pitch jumps of ~15Hz due to aggressive hysteresis filtering | Sound feels robotic, not smooth | Reduce threshold, add better filtering, or move to DAC |
| **Rotary Encoder Quality** | HW-040 encoder has poor response, often requires multiple rotations to register | Frustrating UX | Replace with higher quality encoder |
| **Power Rail Noise** | Multiple components sharing same power rail creates audible noise | Affects audio quality | Add decoupling capacitors, separate analog/digital grounds |
| **Volume Control** | Series potentiometer creates impedance mismatch | Volume control is non-linear and affects tone | Replace with proper attenuator or digital volume |

### UI Issues

| Issue | Description | Status |
|-------|-------------|--------|
| No boot screen | System starts immediately without visual feedback | To fix |
| Sound before mode selection | Audio plays before user selects a mode | To fix |
| No visual feedback on mute | Hard to tell if system is muted | To fix |

### Architectural Limitations

| Limitation | Description |
|------------|-------------|
| Single-file code | All code in one file, not modular |
| No true OOP | Classes exist but architecture is procedural |
| PWM audio | 8-bit equivalent quality, not hi-fi |
| No I2S | Using LEDC PWM, not proper audio protocol |

## 4.5 Debugging Victories (Portfolio Gold)

These are the problems I solved through engineering thinking, not Stack Overflow:

### 1. GPIO Current Collapse `[VERIFIED: DMM]`
- **Symptom:** Buzzer voltage dropped from 3.3V to 1.5V when connected directly to GPIO
- **Investigation:** Measured current draw: 220mA `[DMM]`. GPIO max: 40mA `[DATASHEET]`.
- **Root Cause:** Buzzer is an inductive load that demands more current than GPIO can provide
- **Solution:** NPN transistor (2N2222) as low-side switch with current-limiting base resistor
- **Lesson:** Always check load current requirements vs. source capability

### 2. Inductive Kickback (Back-EMF) `[VERIFIED: SCOPE]`
- **Symptom:** Oscilloscope showed -400mV negative spikes on falling edges `[SCOPE]`
- **Investigation:** Spikes exceeded GPIO absolute maximum rating (could damage chip) `[DATASHEET]`
- **Root Cause:** Inductor (speaker coil) generates back-EMF when current is cut: V = -L(di/dt)
- **Solution:** 1N4007 flyback diode anti-parallel to speaker coil
- **Verification:** Post-fix oscilloscope trace shows spikes clamped to ~0.7V `[SCOPE]`
- **Blog Post:** Published 2026-01-18

### 3. PWM Timer Conflict ("Phantom Duty Cycle Bug") `[VERIFIED: SCOPE + CODE]`
- **Symptom:** Oscilloscope showed 12% duty cycle despite code commanding 50% `[SCOPE]`
- **Investigation:** Compared commanded values vs. actual waveform
- **Root Cause:** `ledcWriteTone()` internally resets duty cycle, conflicting with `ledcWrite()` `[CODE]`
- **Solution:** Use `ledcChangeFrequency()` + `ledcWrite()` pair instead
- **Lesson:** Read library source code, don't trust function names

### 4. ADC Noise / Jitter `[VERIFIED: SCOPE + CODE]`
- **Symptom:** Frequency jumping between 10-15 values, any touch caused changes
- **Investigation:** Raw ADC readings showed ±50 LSB noise `[CODE: Serial.println debug]`
- **Root Cause:** Breadboard capacitance + floating inputs + no filtering `[HYPOTHESIS]`
- **Solution:** EMA filter (alpha=0.15) + hysteresis threshold (40 LSB) `[CODE]`
- **Trade-off:** Stability vs. responsiveness (current settings favor stability)

## 4.6 Success Criteria for v3.8

- [x] Stable square wave output via 2N2222 transistor
- [x] Inductive spikes clamped below 3.6V (GPIO safe)
- [x] OLED displays real-time parameters
- [x] Multiple waveform modes (Square, Saw, Triangle, Noise)
- [x] Rotary encoder navigation (functional, though not perfect)
- [x] Potentiometer control with noise filtering
- [x] State machine UI with timeout behavior
- [x] Safe boot sequence (starts muted)
- [ ] Smooth pitch control (blocked by quantization issue)
- [ ] Clean power rails (blocked by noise issue)

---

# 5. NEXT VERSION (v4.0) — "The Hi-Fi Leap"

## 5.1 Version Focus

**Primary Goal:** Signal integrity, standard audio protocols, and proper analog output stage.

**Secondary Goal:** Complete the signal generator functionality before starting oscilloscope development.

## 5.2 Planned Hardware Changes

| Change | From (v3.8) | To (v4.0) |
|--------|-------------|-----------|
| Audio Protocol | PWM (LEDC) | I2S |
| Audio Output | Transistor → Speaker | DAC → Op-Amp → Jack |
| DAC | None | PCM5102A module |
| Output Buffer | None | Op-Amp (TL072/NE5532) |
| Connector | Direct wire | 3.5mm Stereo Jack |
| Quality | 8-bit equivalent | 16-bit / 44.1kHz |

## 5.3 Planned Software Changes

| Change | Description |
|--------|-------------|
| **Full OOP Refactor** | Separate classes for Oscillator, Display, Input, Audio |
| **AudioDriver Abstraction** | Support both PWM (legacy) and I2S (new) backends |
| **Waveform Generation** | True mathematical waveform synthesis (not PWM duty tricks) |
| **Polyphony Foundation** | Architecture to support 2+ simultaneous voices |
| **Boot Sequence** | Proper splash screen and initialization flow |

## 5.4 Migration Plan

```
Phase 1: Code Refactoring (No new hardware)
├── Extract Oscillator class
├── Extract DisplayManager class
├── Extract InputHandler class
├── Create AudioDriver interface
└── Test: All v3.8 functionality still works

Phase 2: I2S Audio (PCM5102A)
├── Breadboard PCM5102A module
├── Implement I2S AudioDriver
├── Generate true sine waves (not PWM approximation)
└── Test: Clean audio output via 3.5mm jack

Phase 3: Analog Output Stage
├── Design op-amp buffer circuit in LTspice
├── Breadboard TL072/NE5532 output stage
├── Impedance matching for line-level output
└── Test: Measure THD, noise floor

Phase 4: Polish & Integration
├── Fix remaining UI issues
├── Implement 2-voice polyphony
├── Document everything
└── Prepare for v4.0 release
```

## 5.5 What's NOT in v4.0

| Feature | Reason |
|---------|--------|
| Oscilloscope functionality | Signal generator must be complete first |
| Custom PCB | Too expensive to iterate; breadboard is sufficient for learning |
| Teensy 4.1 migration | Will happen in v5.0+ |
| Final enclosure | Premature; design will change |

## 5.6 KiCad Learning

I may use this version to learn KiCad schematic capture and PCB layout, but I will **NOT** order fabricated PCBs. The goal is learning the tool, not producing hardware.

## 5.7 Success Criteria for v4.0

- [ ] Clean 16-bit audio output via I2S DAC
- [ ] True sine wave generation (mathematically correct)
- [ ] Op-amp buffered output stage
- [ ] 3.5mm stereo jack output
- [ ] Full OOP code architecture
- [ ] 2-voice polyphony
- [ ] Boot screen with version info
- [ ] No sound until mode is selected
- [ ] Smooth pitch control (sub-Hz resolution)

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

### v3.8 — "The Transistor Era" (January 2026) — CURRENT
**Hardware:** Replaced buzzer with 8Ω speaker, Added volume potentiometer

**What Changed:**
- Speaker for better sound quality
- Third potentiometer for volume (series resistance)
- EMA filtering for ADC noise
- Multiple waveform modes (Square, Saw, Triangle, Noise)

**What I Learned:**
- Speaker vs. buzzer characteristics
- Digital filtering (EMA)
- Impedance matching challenges
- PWM audio limitations

**Key Issues:** Pitch quantization, encoder quality, power noise

---

## 6.2 Lessons Learned Summary

| Version | Key Lesson |
|---------|------------|
| v1.0 | Always check current requirements before connecting loads |
| v2.0 | Inductors fight current changes — always add flyback diodes |
| v3.0 | Platform migration requires understanding peripheral differences |
| v3.5 | State machines simplify complex UI logic |
| v3.8 | Noise filtering is a trade-off between stability and responsiveness |

---

# 7. BLOG POST TRACKER

## 7.1 Published Posts

| Date | Slug | Title | Tags | Status |
|------|------|-------|------|--------|
| 2026-01-18 | `welcome` | Welcome to eduLAB | announcement, vision | ✅ Live |
| 2026-01-18 | `inductive-kickback-analysis` | Saved by Physics: Analyzing Inductive Kickback & Back EMF | hardware, debugging, theory, oscilloscope, esp32, analog-design, measurements, circuit-protection | ✅ Live |

## 7.2 Planned Posts (Prioritized)

### High Priority (Next to Write)

| Title | Focus | Content Notes |
|-------|-------|---------------|
| **Why You Should NEVER Connect a Buzzer Directly to a Microcontroller** | Hardware safety, transistor drivers | GPIO current limits, protection circuits, what could go wrong |
| **The Transistor as a Switch: A Deep Dive** | Theory + practice | Saturation vs. active mode, base resistor calculation, common emitter |
| **How I Design a Schematic: First Timer's Perspective** | Process documentation | My workflow, tools used, mistakes made |

### Medium Priority

| Title | Focus | Content Notes |
|-------|-------|---------------|
| **Why I Added a Digital Filter to My Code** | DSP basics | EMA filter explanation, before/after measurements |
| **From PWM to I2S: The Theory Behind the Upgrade** | Audio protocols | Why PWM audio is limited, how I2S works |
| **Choosing Components: How and Why?** | Decision making | My selection criteria, datasheets, trade-offs |
| **My Journey Through Oscilloscope Screenshots** | Visual history | Project evolution told through scope captures |

### Lower Priority (Future)

| Title | Focus | Content Notes |
|-------|-------|---------------|
| **Why C++ for Embedded Audio?** | Software architecture | OOP benefits, polymorphism, real-time constraints |
| **Code Bugs and What Caused Them** | Debugging stories | PWM timer conflict, race conditions, off-by-one errors |
| **My First Analog Circuit in LTspice** | Simulation | Op-amp buffer design, learning the tool |
| **How I Burned My First Soldering Iron Tip** | Beginner mistakes | Cautionary tale, proper care |

## 7.3 Blog Post Template

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

## 8.3 Component Shorthand

| Shorthand | Full Name | Notes |
|-----------|-----------|-------|
| ESP32-S3 | Espressif ESP32-S3-N16R8 | Current MCU |
| 2N2222 | 2N2222A NPN Transistor | Switching transistor |
| 1N4007 | 1N4007 Rectifier Diode | Flyback protection |
| PCM5102A | TI PCM5102A | Target I2S DAC |
| TL072 | TI TL072 | Dual JFET op-amp |
| NE5532 | TI NE5532 | Low-noise dual op-amp |
| SSD1306 | Solomon SSD1306 | OLED display driver |
| EC11 | Alps EC11 series | Rotary encoder |

---

# 9. BILL OF MATERIALS (Target BOM)

## 9.1 Digital Audio

| Item | Quantity | Purpose | Status |
|------|----------|---------|--------|
| PCM5102A DAC Module | 2 | Hi-Fi stereo output | To order |
| PCM1808 ADC Module | 1 | Line input for scope | To order |
| INMP441 Microphone Module | 1 | Digital I2S microphone | To order |
| PAM8403 Amplifier Module | 2 | 3W stereo speaker amp | Needs verification |
| Speaker 3W 4Ω (40mm) | 2 | Stereo speakers | To order |

## 9.2 Display & Indication

| Item | Quantity | Purpose | Status |
|------|----------|---------|--------|
| 2.8" TFT LCD ILI9341 (SPI) | 1 | Main display | To order |
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
| EC11 Rotary Encoder Module | 4 | Parameter control | To order |
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
| Teensy 4.1 | 1 | Ordered (AliExpress) |
| ESP32-S3-N16R8 DevKitC | 1 | In use |
| 0.91" OLED SSD1306 | 1 | In use |
| 2N2222 Transistors | Multiple | In use |
| 1N4007 Diodes | Multiple | In use |
| RV09 Potentiometers | 3 | In use |
| HW-040 Rotary Encoder | 1 | In use |
| 8Ω Speaker | 1 | In use |

---

# DOCUMENT CONTROL

## Revision History

| Version | Date | What Changed | Why | Evidence |
|---------|------|--------------|-----|----------|
| 1.0 | 2026-01-18 | Initial draft | Base prompt creation | N/A |
| 2.0 | 2026-01-18 | Complete rewrite: personal context, corrected grand vision (DSP sandbox not just synth), fixed software section (single-file, no OOP), expanded version history, added BOM, expanded blog tracker | User provided detailed input file with corrections | `/mnt/user-data/uploads/מידע_אישי.txt` |
| 2.1 | 2026-01-18 | Added GROUND TRUTH RULES preamble, verification tags on debugging victories | AI-proofing for cross-reference use | ChatGPT recommendation for anti-hallucination |

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

**END OF MASTER SOURCE OF TRUTH**

*"From breadboard tinkerer to hardware designer."*