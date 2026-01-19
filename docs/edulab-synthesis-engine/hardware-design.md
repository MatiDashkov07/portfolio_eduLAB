---
sidebar_position: 2
title: Hardware Design
---

# Hardware Design Architecture

The eduLAB Synthesis Engine represents a mixed-signal embedded system design. It bridges the gap between high-speed digital logic (DSP) and analog audio output.

## System Block Diagram

The system is architected around a central microcontroller unit (MCU) handling both the synthesis engine and the user interface, driving a dedicated analog output stage.

`![System Block Diagram](/img/projects/system-block-diagram-placeholder.png)`
*(Block diagram visualizing: Power Input -> MCU -> DAC/PWM -> Reconstruction Filter -> Output Buffer -> Audio Jack)*

## 1. Power Supply & Regulation
To maintain signal integrity and minimize noise in the audio path, the power stage is split:

* **Input:** 5V via USB-C (from PC or Power Bank).
* **Digital Rail:** 3.3V LDO (Low Dropout Regulator) powering the ESP32/Teensy and Logic.
* **Analog Rail:** Filtered 3.3V/5V line for the Op-Amp buffer to ensure high headroom.
* **Decoupling:** Extensive use of 100nF and 10µF capacitors near the MCU and Op-Amp power pins to shunt high-frequency noise.

## 2. The Microcontroller (MCU)
We are currently transitioning between two architectures:
* **v3.8 (Current):** **ESP32-S3**. Chosen for its dual-core architecture (Core 0 for WiFi/UI, Core 1 for DSP) and low cost.
* **v4.0 (Target):** **Teensy 4.1**. Chosen for its 600MHz Cortex-M7 processor, native Floating Point Unit (FPU), and superior I2S audio capabilities.

## 3. Audio Output Stage
This is the critical section where digital samples become audible sound.

### A. Digital to Analog Conversion
In the current v3.8 build, we utilize the ESP32's internal DAC / Sigma-Delta PWM generation.
* **Resolution:** 8-bit (Native DAC) / Simulated higher bit-depth via dithered PWM.
* **Sampling Rate:** 44.1kHz.

### B. Reconstruction Filter (RC)
Since the output from the DAC/PWM is "stepped" (containing high-frequency switching noise), a Passive Low-Pass Filter (RC) is implemented.
* **Cutoff Frequency ($f_c$):** Calculated to be around 16kHz to filter out the carrier frequency while preserving the audible spectrum.
* **Formula:** $f_c = \frac{1}{2\pi R C}$

### C. Output Buffer (Impedance Matching)
A passive RC filter has high output impedance, which cannot drive headphones directly (loading effect would destroy the volume and tone).
* **Solution:** An Op-Amp (LM358 / TL072) configured as a **Voltage Follower** (Unity Gain Buffer).
* **Benefit:** Provides high input impedance (doesn't load the filter) and low output impedance (drives the headphones).

## 4. User Interface (HMI)
The hardware interface is designed for real-time performance control:
* **Display:** 0.96" I2C OLED (SSD1306) for parameter visualization.
* **Input:** Rotary Encoders with Push-Buttons for menu navigation and value adjustment.
* **GPIO Protection:** Series resistors and debouncing capacitors on all mechanical inputs.

## 5. Protection Circuitry
Following the "Inductive Kickback" incident (see Blog), the output stage now includes:
* **Flyback Diodes:** 1N5819 Schottky diodes on inductive load paths.
* **Current Limiting:** Series resistors on GPIOs to prevent over-current conditions.

---

*Detailed schematics and PCB layout files will be released with v4.0 documentation.*