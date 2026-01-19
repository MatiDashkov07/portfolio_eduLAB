---
slug: inductive-kickback-analysis
title: "Saved by Physics: Analyzing Inductive Kickback & Back EMF"
authors: [mati]
tags: [hardware, debugging, theory, oscilloscope, esp32, analog-design, measurements, edulab-synthesis-engine, circuit-protection]
---

During a routine test of the eduLAB Synthesis Engine's audio output stage, I encountered a phenomenon that could have easily destroyed my ESP32 microcontroller. What started as a weird spike on the oscilloscope turned into a deep dive into electromagnetic induction.

Here is how I diagnosed, analyzed, and solved an Inductive Kickback event.

## The Context: Driving an Inductive Load

We are currently in **Phase v3.8** of the project. The goal was to test the direct drive capabilities of the output transistor stage before integrating the final DAC. The setup involved connecting a small 8Ω speaker coil directly to the switching circuit controlled by a GPIO pin.

Everything sounded fine, but as an engineer, "sounding fine" isn't enough. I hooked up the Rigol oscilloscope to monitor the voltage levels on the drain of the MOSFET/Output pin.

## The Symptom

When I cut the power to the coil (simulating a logic LOW or a disconnection), the oscilloscope captured this alarming transient response:

![Oscilloscope Trace of Voltage Spike](/img/projects/kickback-scope-trace.jpg)

**The Analysis:**
- **System Logic Level:** 3.3V (ESP32 standard).
- **Measured Spike:** **6.16V**.
- **Risk:** This is nearly double the maximum rated voltage for the ESP32 GPIO pins. A sustained spike of this magnitude would likely cause dielectric breakdown in the transistor gates inside the chip, permanently damaging the microcontroller.

## The Physics: Deep Dive into Back EMF

Why did the voltage jump when the power was *cut*? The answer lies in the physics of inductors.

A speaker voice coil is electrically an **Inductor ($L$)**. Inductors store energy in a magnetic field. According to Faraday's Law of Induction and Lenz's Law, an inductor resists any change in the current flowing through it.

The voltage across an inductor is defined by the formula:

**The Inductor Voltage Formula:**

$$
V_L = -L \cdot \frac{di}{dt}
$$

Where:
- $V_{L}$ is the induced electromotive force (EMF).
- $L$ is the inductance (in Henries).
- $\frac{di}{dt}$ is the rate of change of current over time.

### What happened in the circuit?
1.  **Switch Closed:** Current ($i$) flows steadily through the coil. The magnetic field is stable.
2.  **Switch Opened:** We tried to stop the current instantly. This means $dt$ (time change) approaches zero.
3.  **The Result:** Since we are dividing by a number close to zero, the rate of change ($\frac{di}{dt}$) becomes huge and negative.
4.  **The Spike:** The inductor responds by creating a massive **positive voltage** in the opposite direction to try and keep the current flowing. This is the "Kickback" (or Flyback).

## The Solution: Flyback Diode

To fix this, we need to provide a safe path for this stored energy to dissipate, so it doesn't force its way through the microcontroller or the transistor.

We introduced a **Flyback Diode** (also known as a Snubber or Freewheeling Diode) placed anti-parallel to the inductive load.

### The Modified Schematic

![Circuit Schematic with Flyback Diode](/img/projects/flyback-diode-schematic.png)

**How it works:**
1.  **Normal Operation:** The diode is reverse-biased (blocking). No current flows through it.
2.  **Switch Off:** The inductor reverses polarity (the "Kickback").
3.  **Protection Mode:** The diode becomes forward-biased. The current circulates through the diode and the coil loop until the energy dissipates as heat in the wire resistance ($R_{wire}$), clamping the voltage spike to a safe level (usually $V_{cc} + 0.7V$).

## Conclusion

This investigation reinforced a critical lesson in embedded hardware design: **Never treat components as ideal.** A speaker isn't just a resistor; it's an energy storage device.

By visualizing the signal on the oscilloscope, we caught a potential hardware-killing bug that a simple multimeter or listening test would have missed.

**Next Steps:**
- Implementing a permanent 1N5819 Schottky diode (for faster switching speed) on the PCB v4.0.
- Further analysis of the analog filter stage to ensure signal integrity.