---
sidebar_position: 2
title: Hardware Design
---

import PDFViewer from '@site/src/components/PDFViewer';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Hardware Design — v4.0

> Technical documentation of the **current hardware implementation** (v4.0) — with v3.8 preserved as historical reference.

---

## 1. What This Page Documents

This page describes the **v4.0 hardware implementation** as it exists now — not as planned, not idealized.

v4.0 is the version where eduLAB crossed the line from **PWM-era experimentation** into **real digital audio**:

- **I2S audio transport**
- **PCM5102A DAC**
- **16-bit / 44.1 kHz stereo output**
- Breadboard-level signal integrity problems that are real engineering (clock edges, ground noise, parasitics)

:::info
v3.8 is still documented here — but as **Version History**, not as “current state”.
:::

---

## 2. Design Philosophy: Low-Level Physics First

Even in v4.0, the philosophy did not change:

- Measure clocks, don’t assume them  
- Treat wires as inductors and antennas (because they are)  
- Treat breadboards as RF disasters (because they are)  
- Build the simplest system that exposes the physics clearly  

v4.0 is “Hi-Fi” relative to v3.8 — but it is still intentionally transparent, not polished.

---

## 3. System Overview (v4.0)

The signal flow in v4.0:


ESP32-S3 → I2S (BCK / LRCK / DIN) → PCM5102A DAC Module → 3.5mm Line Out
↑
Pots (ADC) + Encoder (GPIO) + OLED (I2C)


**Power:** 5V USB → ESP32 onboard 3.3V regulator → logic and peripherals  
**Audio:** I2S digital audio → DAC module → buffered line output  
**UI:** OLED display + rotary encoder + potentiometer(s)

![eduLAB Closed-Loop Signal Flow](/img/projects/flowchart-intro-docs-file.png)

---

## 4. The Complete Schematic (v4.0)



<div style={{ marginBottom: '2rem' }}>
  <PDFViewer fileUrl={useBaseUrl('/files/schematic-v4.0.pdf')} />
  <div style={{ textAlign: 'left', marginTop: '0.5rem', fontSize: '1rem' }}>
    <a href={useBaseUrl('/files/schematic-v4.0.pdf')} download="schematic-v4.0.pdf">
      Click here to download the full PDF
    </a>
  </div>
</div>

---

## 5. Power Supply

| Rail | Voltage | Source | Load |
|------|---------|--------|------|
| USB Input | 5V | USB-C | ESP32 dev board + DAC module |
| Logic Rail | 3.3V | ESP32 onboard LDO | MCU, OLED, encoder, DAC logic pins |
| Analog Out | Line-level | PCM5102A module buffer | 3.5mm output |

---

## 6. The Microcontroller

**Part:** ESP32-S3-N16R8  
Dual-core @ 240 MHz

---

## 7. Audio Output — I2S + PCM5102A

### 7.1 I2S Signals

**Protocol:** I2S  
**Sample rate:** 44.1 kHz  
**Bit depth:** 16-bit signed  
**Channels:** Stereo (mono duplicated to L/R)

| I2S Signal | ESP32 GPIO | Notes |
|-------------|------------|------|
| BCK | GPIO 39 | ~1.4112 MHz (Scope Verified) |
| LRCK | GPIO 38 | 44.1 kHz (Scope Verified) |
| DIN | GPIO 40 | Serial audio data |

---

### I2S Timing Relationship


![I2S timing relationship](/img/projects/V4/i2s-transmission.jpg)


- LRCK toggles at the sample rate (44.1 kHz)  
- BCK shifts individual bits (~1.4112 MHz)  
- DATA is sampled on each BCK edge  
- Each LRCK frame contains two 16-bit words  

---

### 7.2 PCM5102A Module Configuration

The PCM5102A is currently used as a module for rapid validation.

#### Strapping Pins (Hardware Mode Selection)

| Pin  | Connection | Purpose |
|------|------------|----------|
| FLT  | GND        | Normal latency filter |
| FMT  | GND        | Standard I2S format |
| SCK  | GND        | Internal clock mode (no external MCLK) |
| XSMT | 3.3V       | Soft-mute disabled |

Without proper strapping:

- The DAC may default to wrong format  
- Output may remain muted  
- Framing may not align with ESP32  

v4.0 runs the DAC in self-clocked mode for breadboard simplicity.

---

## 8. User Interface Hardware

### Potentiometer Jitter (Measured)

Raw ESP32 ADC readings fluctuate approximately:

**±30–50 LSB** on breadboard.

Mitigation:

- Exponential Moving Average (α = 0.15)  
- Hysteresis threshold (40 LSB)

This is measured electrical noise — not a software bug.

---

## 9. Known Hardware Issues

| Issue | Cause | Impact | Fix |
|-------|-------|--------|-----|
| Power rail noise | Shared rails | Hiss | PCB design |
| I2S edge distortion | Parasitic L/C | Overshoot | PCB routing |
| Pot jitter | ±30–50 LSB ADC noise | Frequency jumps | EMA + hysteresis |
| Encoder quality | Mechanical tolerance | Missed steps | Higher quality encoder |

---

## 10. What’s NOT Here (v4.0)

### Analog Sandbox (Future Architecture)

v4.0 validates the **digital core**.

Future versions expand into a **user-accessible analog sandbox**:

- Op-amp buffer stages  
- Reconstruction filters  
- Breadboard analog experimentation zone  
- Signal routing and measurement nodes  

The goal is not to hide analog complexity inside a DAC module.

The goal is to expose it.

---

## 11. Version History — v3.8

PWM → 2N2222 → 8Ω Speaker

v3.8 taught:

- GPIO current limits  
- Inductive kickback  
- PWM limitations  
- Power rail noise realities  

It is the foundation — not the flagship.

---

## Closing

v4.0 is still a breadboard prototype.

But it is now **real DSP hardware**.

Every limitation is measurable.  
Every decision is documented.  
Nothing is a black box.