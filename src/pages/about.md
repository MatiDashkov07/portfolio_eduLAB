---
title: About
description: About me - an 18-year-old Israeli student building hardware projects from first principles
---

# About

Hi, I'm Mati Dashkov, an 18-year-old Israeli pre-military student passionate about hardware engineering. This blog documents my journey from breadboard tinkerer to professional hardware designer—building projects from the ground up to deeply understand how things work.

## Why This Exists

I've been drawn to electronics and embedded systems since I was around 12 years old—not because of career planning or trends, but because I genuinely enjoy understanding how physical systems behave. Circuits, signals, and real-time control felt *real* to me in a way purely abstract software never quite did.

Over time, it became clear that modern engineering is intensely competitive. Strong projects and deep understanding matter more than ever—not just degrees or credentials. Employers want evidence of problem-solving ability and genuine technical depth.

**This blog is that evidence.**

I'm building eduLAB and documenting every step—the debugging victories, the mistakes, the design decisions—because that's what separates real engineering from tutorial-following.

## My Philosophy: "No Black Boxes"

I explicitly avoid what I call *"Vibe Engineering"*—making things work without understanding *why* they work. Copy-pasting Arduino code, following tutorials blindly, connecting components "because that's what the schematic shows."

**My guiding rule is simple:**

> **If I can't explain it, I don't use it.**

Before adding any component or abstraction, I expect to understand the physical or mathematical principle behind it.

**The Litmus Test:** If I'm about to connect a capacitor, I must answer:
- What is the time constant τ = RC?
- What frequency does this filter?
- Why this value and not another?

**If I can't answer — I don't connect it. I learn first.**

This approach is slower, but it builds genuine expertise rather than surface-level familiarity. It's the difference between someone who can *use* an op-amp and someone who can *design with* an op-amp.

## What Keeps Me Motivated

It's not external pressure—it's curiosity.

I enjoy debugging problems that initially make no sense. I enjoy watching a signal change on an oscilloscope after tweaking a filter value. I enjoy the moment where theory finally clicks and matches the real-world measurement.

eduLAB is simply the most complete expression of that curiosity so far—a project complex enough to force me to learn deeply, but focused enough to actually finish.

## Current Focus: eduLAB Synthesis Engine

My current flagship project is **eduLAB**—a work-in-progress embedded audio platform built as a DSP education sandbox.

It intentionally starts at the low level (PWM, transistor switching, real measurements) before moving toward higher-fidelity audio architecture. The goal isn't just to make sound—it's to understand every layer of the signal path from digital synthesis to analog output.

**Current version (v3.8)** runs on ESP32-S3 with PWM audio and basic waveform generation. **Next version (v4.0)** will upgrade to I2S audio with a proper DAC, full OOP refactor, and professional analog output stage.

→ [Read the full project documentation](/projects/edulab-synthesis-engine/intro)

## Broader Interests

While eduLAB focuses on embedded audio, my interests span the entire hardware engineering spectrum:

- Digital Signal Processing & Real-Time Systems
- Analog Circuit Design & Mixed-Signal Systems
- PCB Design & Layout (learning KiCad for v4.0)
- FPGA Development (Verilog/VHDL basics)
- RF & Wireless Systems
- Silicon Design & Chip Architecture
- Robotics & Autonomous Systems

**The philosophy:** Touch everything, understand deeply, then specialize. eduLAB is the first flagship project—there will be many more.

## Skills (Honest Assessment)

### Proficient
- **Hardware Debugging**: Oscilloscope/DMM usage, systematic troubleshooting
- **Embedded C/C++**: Real-time systems, peripheral control, ISR handling
- **Circuit Analysis**: Reading schematics, calculating component values
- **Tools**: Git, PlatformIO, basic LTspice simulation

### Intermediate
- **Analog Design**: Op-amps, filters, transistor circuits, power management
- **DSP Concepts**: Sampling theory, digital filters, waveform synthesis
- **Breadboard Prototyping**: Component selection, noise management, protection circuits

### Learning
- **KiCad**: Schematic capture and PCB layout (planned for v4.0)
- **I2S Protocol**: Digital audio interfaces and timing requirements
- **FPGA Development**: Verilog basics, hardware description
- **Professional PCB Design**: Impedance control, EMI considerations, manufacturability

## Academic Path

I'm currently studying Computer Science prerequisites at the Open University of Israel as part of the **Afeq Ma'avar** transfer path.

My plan is to continue progressing academically during military service (at a slower pace when needed), and after service to transfer into the Technion—targeting **Electrical Engineering + Physics (Excellence Track)**.

**Timeline:** Enlisting for military service soon. Development pace will slow during service, but active project work and academic progress will continue.

## Goals & Roadmap

**Before Military Service:**
- Complete v3.8 documentation with full technical blog coverage
- Receive and prepare all v4.0 components
- Finalize the v4.0 architecture and refactor plan

**During Military Service (Reduced Pace):**
- Develop **v4.0**: I2S audio, DAC integration, and proper analog output stage
- Perform the full OOP refactor of the firmware
- Continue publishing focused technical blog posts
- Maintain theoretical learning through books and datasheets

**Beyond v4.0 (As Time Allows):**
- Explore v5.0 concepts (Teensy 4.1, built-in measurement tools)
- Gradual expansion toward a full DSP education workstation

**Long-term Vision:**
- Work on professional hardware systems
- Design educational tools for universities and self-learners
- Contribute to open-source hardware projects
- Continue building a portfolio that demonstrates deep understanding


## What I'm Reading

To support this journey, I'm working through:

- **The Art of Electronics (Horowitz & Hill)** — For deep understanding of analog circuits and op-amps
- **The Scientist and Engineer's Guide to DSP (Steven W. Smith)** — Free online, fantastic for implementation-focused DSP
- **Datasheets** — Lots and lots of datasheets (ESP32, PCM5102A, TL072, etc.)

## Contact

- **GitHub**: [MatiDashkov07](https://github.com/MatiDashkov07)
- **LinkedIn**: [Mati Dashkov](https://www.linkedin.com/in/mati-dashkov-33740b375)
- **Email**: [matidashkov5@gmail.com](mailto:matidashkov5@gmail.com)

---

*This is a "learning in public" blog. I document mistakes, breakthroughs, and everything in between. If you're on a similar journey, feel free to reach out.*

**"From breadboard tinkerer to hardware designer."**