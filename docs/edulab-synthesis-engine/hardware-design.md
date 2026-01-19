---
sidebar_position: 2
title: Hardware Design
---

# Hardware Design — v3.8

> Technical documentation of the current hardware implementation.

---

## 1. What This Page Documents

This page describes the **v3.8 hardware implementation** as it exists now — not as planned, not idealized.

This is a deliberately simple design. The goal is not high-fidelity audio. The goal is understanding transistor switching, inductive loads, and PWM-based signal generation before introducing DACs and abstraction layers.

---

## 2. Design Philosophy: Low-Level Physics First

Before building a system with I2S DACs and op-amp output stages, I wanted to understand:

- How transistors switch inductive loads
- What happens when a GPIO pin drives a load that draws too much current
- Why inductors generate voltage spikes when current is interrupted
- How PWM generates audio, and why it is fundamentally limited

**v3.8 is intentionally primitive.**

The audio quality is ~8-bit equivalent. There is no reconstruction filter. There is no op-amp buffer.

These are not oversights — they are pedagogical choices.

---

## 3. System Overview

The signal flow in v3.8:
```
ESP32-S3 → PWM (GPIO 16) → 2N2222 Transistor → 8Ω Speaker
    ↑
Pots (ADC) + Encoder (Interrupt) + OLED (I2C)
```

**Power:** 5V USB → ESP32 onboard 3.3V regulator → logic and peripherals  
**Audio:** PWM output → transistor driver → speaker (direct, no filter)  
**UI:** OLED display + rotary encoder + 2× potentiometers

<!-- [PLACEHOLDER: Simple block diagram — v3.8 signal flow only] -->

---

## 4. The Complete Schematic

Below is the full schematic for v3.8.

<!-- [PLACEHOLDER: Embedded PDF schematic with zoom capability] -->

Let's break down each section.

---

## 5. How to Read the Schematic

The circuit is organized into functional blocks:

1. **Power input** — USB 5V input and onboard 3.3V regulation  
2. **MCU** — ESP32-S3 with all GPIO assignments  
3. **Audio output** — PWM → transistor → speaker with flyback diode  
4. **User interface** — OLED, rotary encoder, potentiometers  

Start from the power rail, follow the signal through the MCU, then trace the audio output path.

---

## 6. Power Supply

| Rail | Voltage | Source | Load |
|------|---------|--------|------|
| USB Input | 5V | USB-C | ESP32 dev board |
| Logic Rail | 3.3V | ESP32 onboard LDO | MCU, OLED, encoder pull-ups |
| Speaker Drive | 5V (switched) | Transistor collector | 8Ω speaker |

**Notes:**

- The ESP32 development board includes its own 3.3V LDO regulator
- No separate analog power rail (not required for PWM output)
- Ground is shared across all subsystems
- Decoupling capacitors are present on the ESP32 dev board itself

**What's NOT here:**

- No external LDO regulators
- No split analog/digital ground planes
- No ±12V rails (planned for v4.0)

---

## 7. The Microcontroller

**Part:** ESP32-S3-N16R8 (DevKitC development board)

**Key Specifications:**

- Dual-core Xtensa LX7 @ 240 MHz
- 16 MB Flash, 8 MB PSRAM
- LEDC peripheral for hardware PWM generation
- Built-in I2C, SPI, ADC peripherals

**Why ESP32-S3?**

- Low cost and widely available
- Dual-core architecture (UI and audio can be separated conceptually)
- Hardware PWM generation without heavy CPU load
- Strong ecosystem and documentation

v3.8 does not exploit the dual-core architecture fully — this is intentional.

**What's NOT here:**

- Teensy 4.1 (planned for v4.0)
- Custom PCB (v3.8 is breadboard-based)

---

## 8. Audio Output Stage — The Core Circuit

This is where digital PWM becomes audible sound.

---

### 8.1 PWM Generation

**Source:** ESP32 LEDC peripheral  
**Output pin:** GPIO 16  
**Signal type:** Pulse Width Modulation (PWM)

**Important:** This is **not** a DAC.  
v3.8 does not use any DAC functionality — the audio signal is generated purely via PWM.

PWM audio works by varying the duty cycle of a fixed-frequency square wave:

- 0% duty cycle → minimum average voltage
- 50% duty cycle → mid-level signal
- 100% duty cycle → maximum average voltage

The speaker's inductance and mechanical inertia together act as a crude low-pass filtering mechanism, converting the high-frequency switching waveform into audible sound.

**Why PWM instead of a proper DAC?**

Because PWM exposes:

- Duty cycle effects on perceived timbre
- Resolution limits (~8-bit effective)
- Filtering requirements
- Why dedicated DACs exist in real audio systems

This limitation is **intentional**.

---

### 8.2 Transistor Driver

**Part:** 2N2222A NPN transistor  
**Configuration:** Common-emitter switch  
**Base resistor:** 1 kΩ

**Why a transistor?**

ESP32 GPIO pins are not designed to drive high-current loads directly.  
While absolute maximum ratings may approach ~40 mA, safe operating current is significantly lower.

The 8Ω speaker can draw far more current than a GPIO can safely supply. Driving it directly would:

1. Cause voltage sag (measured: 3.3V → ~1.5V)
2. Risk permanent MCU damage

The 2N2222 acts as a current amplifier:

- GPIO supplies ~3 mA base current
- Transistor switches ~200 mA collector current
- The speaker load is electrically isolated from the MCU

**Base resistor calculation:**

$$
R = \frac{V_{\text{GPIO}} - V_{BE}}{I_{\text{base}}}
$$

$$
R = \frac{3.3 - 0.7}{0.003} \approx 867 \, \Omega
$$

Nearest standard value: **1 kΩ**

---

### 8.3 Inductive Load & Protection

**The problem:** A speaker voice coil is an **inductor**.

When the transistor switches off, the current through the inductor cannot stop instantly. The inductor resists the change, generating a reverse voltage spike:

$$
V = -L \cdot \frac{di}{dt}
$$

Measured spike: approximately **−400 mV** below ground (oscilloscope verified).

This exceeds safe GPIO limits and could damage the MCU.

**The solution:** A 1N4007 flyback diode

- Connected anti-parallel to the speaker  
  (cathode to +5V, anode to transistor collector)
- When the transistor turns off, the diode conducts
- Stored energy dissipates safely
- Voltage is clamped to approximately −0.7 V

<!-- [PLACEHOLDER: Oscilloscope screenshot before/after flyback diode] -->

**Read more:**  
[Saved by Physics: Analyzing Inductive Kickback](/blog/inductive-kickback-analysis)

---

### 8.4 The Load: Speaker

**Part:** 8Ω passive speaker (replaced the original piezo buzzer)

**Why a speaker instead of a buzzer?**

- Buzzers have fixed resonance and limited frequency response
- Speakers reveal frequency response, distortion, and noise clearly

**Volume control:** Series potentiometer (P3)

**Known issue:** This creates an impedance mismatch. Volume control is non-linear and affects tone quality.

This will be replaced by a proper op-amp attenuator in v4.0.

---

## 9. User Interface Hardware

---

### 9.1 Display

**Part:** 0.91" OLED (SSD1306)  
**Resolution:** 128×32  
**Interface:** I2C (SDA: GPIO 4, SCL: GPIO 5)  
**Address:** 0x3C

**Why I2C?**

- Only two signal lines
- Simple protocol
- Broad library support

The OLED displays waveform mode, frequency, and menu feedback.

---

### 9.2 Analog Input Controls

**Parts:** 2× RV09 10 kΩ linear potentiometers

| Pot | GPIO | Function |
|-----|------|----------|
| P1 | GPIO 1 (ADC) | Pitch control |
| P2 | GPIO 2 (ADC) | Duty cycle / waveform shape |

**Why analog potentiometers?**

- Direct tactile control
- No debouncing required
- Exposes ADC noise as a learning opportunity

**ADC noise issue:**

Raw ADC readings showed ±50 LSB jitter, causing audible instability.

**Mitigation (software):**

- Exponential Moving Average ($\alpha = 0.15$)
- Hysteresis threshold (40 LSB)

Responsiveness is intentionally traded for stability.

---

### 9.3 Rotary Encoder

**Part:** HW-040 (EC11-based)  
**Pins:** CLK (GPIO 6), DT (GPIO 7), SW (GPIO 15)  
**Method:** Interrupt-driven (DT falling edge)

**Why interrupts?**

Polling can miss steps during other processing. Interrupts guarantee detection.

**Known issue:** Low mechanical quality causes missed or false steps.

**Planned fix:** Replace with higher-quality encoder in future revisions.

---

## 10. Pin Assignment Table

| GPIO | Function | Component | Direction |
|------|----------|-----------|-----------|
| 1 | ADC | Potentiometer (Pitch) | Input |
| 2 | ADC | Potentiometer (Duty) | Input |
| 4 | I2C SDA | OLED Display | Bidirectional |
| 5 | I2C SCL | OLED Display | Output |
| 6 | Encoder CLK | Rotary Encoder | Input |
| 7 | Encoder DT | Rotary Encoder | Input (interrupt) |
| 15 | Encoder SW | Encoder Button | Input |
| 16 | PWM | Audio Output | Output |

---

## 11. Known Hardware Issues

These are not bugs — they are documented learning points:

| Issue | Cause | Impact | Planned Fix |
|-------|-------|--------|-------------|
| Pitch quantization | Aggressive hysteresis | ~15 Hz minimum step | Reduce threshold or use DAC |
| Encoder quality | Low mechanical tolerance | Missed steps | Higher-quality encoder |
| Volume non-linearity | Series pot impedance mismatch | Tone affected | Op-amp attenuator |
| Power rail noise | Shared supply | Audible hiss | Filtering in v4.0 |
| Lo-fi audio | PWM resolution | ~8-bit quality | I2S DAC in v4.0 |

These limitations are intentionally tolerated in v3.8 due to the absence of a true analog signal path.

---

## 12. What's NOT Here

To be explicit, v3.8 does **not** include:

### Audio
- ❌ DAC
- ❌ Reconstruction filter
- ❌ Op-amp buffer
- ❌ Line-level output jack

### Power
- ❌ External regulators
- ❌ Split analog/digital rails
- ❌ ±12V supply

### Controls
- ❌ Multiple encoders
- ❌ Faders
- ❌ VU meters
- ❌ Additional displays

These will be introduced gradually starting in v4.0.

---

## 13. Next: v4.0 Hardware Upgrade

The next iteration focuses on **signal integrity**, not features.

| Subsystem | v3.8 | v4.0 |
|-----------|------|------|
| Audio protocol | PWM | I2S |
| Output stage | Transistor → Speaker | DAC → Op-amp |
| DAC | None | PCM5102A |
| Audio quality | ~8-bit | 16-bit / 44.1 kHz |

**Status:** Components ordered.  
**Target:** ~6 weeks.

---

## 14. Related Documentation

- [Software Architecture](./software-architecture)
- [Build Guide](./build-guide)
- [Inductive Kickback Analysis](/blog/inductive-kickback-analysis)

---

## Closing

This hardware design is not impressive by Hi-Fi standards.

Its value lies in the engineering lessons it exposes.

Every limitation is intentional. Every choice is documented.