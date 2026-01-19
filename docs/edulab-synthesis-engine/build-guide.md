---
sidebar_position: 4
title: Replication Status
---

# Replication Status

> **TL;DR:** v3.8 is not ready for replication. This page explains why and what to expect in future versions.

---

## Current State: v3.8 (Not Recommended for Replication)

The v3.8 hardware is a **learning prototype**, not a finished product. It was built to understand:

- Transistor switching behavior
- Inductive load protection
- PWM audio limitations
- Real-time embedded constraints

### Why You Shouldn't Build v3.8:

- **Audio quality:** ~8-bit PWM (intentionally lo-fi)
- **No proper output stage:** Direct transistor → speaker
- **Breadboard-only:** No PCB design
- **Missing features:** No DAC, no filters, no proper volume control
- **Known issues:** Pitch quantization, encoder noise, power rail interference

**If you build v3.8, you'll learn the same lessons I did — but you'll immediately want to upgrade to v4.0.**

---

## Next: v4.0 (Coming Soon)

v4.0 will be the **first replicable version** with:

- ✅ I2S audio (PCM5102A DAC)
- ✅ Op-amp output stage
- ✅ Proper 3.5mm line output
- ✅ Full OOP software architecture
- ✅ Breadboard layout guide
- ⏳ Optional: KiCad schematics (learning PCB design)

**Timeline:** ~6 weeks (components already ordered)

**Build Guide Status:** Will be published with v4.0 release

---

## What You Can Do Now

### Option 1: Follow the Journey

Read the blog posts to understand the **why** behind design decisions:

- [Inductive Kickback Analysis](/blog/inductive-kickback-analysis)
- [Hardware Design Documentation](./hardware-design)
- [Software Architecture](./software-architecture)

### Option 2: Study the Code

The v3.8 firmware is fully documented and available:

- [Source Code](https://github.com/MatiDashkov07/portfolio_eduLAB/blob/main/src/main.cpp)
- Single-file implementation (~450 lines)
- Useful for learning embedded state machines

### Option 3: Wait for v4.0

Subscribe to updates (GitHub Watch or RSS feed) to be notified when the Build Guide is published.

---

## Bill of Materials (v3.8 Reference)

Documented here for transparency only. **Do not purchase these for replication.**

### Core Components (What Was Actually Used)

| Component | Part | Quantity | Notes |
|-----------|------|----------|-------|
| MCU | ESP32-S3-N16R8 DevKitC | 1 | Main processor |
| Display | SSD1306 OLED 0.91" | 1 | I2C interface |
| Transistor | 2N2222 NPN | 1 | Audio driver |
| Diode | 1N4007 | 1 | Flyback protection |
| Speaker | 8Ω passive | 1 | Direct drive |
| Potentiometers | RV09 10kΩ | 2 | Pitch/Duty control |
| Encoder | HW-040 (EC11) | 1 | Menu navigation |
| Resistors | 1kΩ | 1 | Base resistor |

### What's NOT Here (Despite Being in Old BOM)

- ❌ Op-amps (planned for v4.0)
- ❌ DAC modules (planned for v4.0)
- ❌ RC filters (planned for v4.0)
- ❌ Audio jack (planned for v4.0)

---

## Related Documentation

- [Hardware Design](./hardware-design) - What exists now
- [Software Architecture](./software-architecture) - How it works
- [Project Roadmap](/blog/welcome) - Where it's going

---

## FAQ

**Q: Can I still build v3.8 even though it's not recommended?**  
A: Technically yes, but you'll need to source parts yourself and debug breadboard issues. The schematic is available in the Hardware Design page.

**Q: When will v4.0 be ready?**  
A: Target: ~6 weeks from now. Components are ordered. Follow the blog for updates.

**Q: Will there be PCB files?**  
A: Maybe in v4.0 (learning KiCad), definitely by v5.0 (Teensy 4.1 version).

**Q: Can I contribute?**  
A: Not yet - this is a personal learning project. Once v4.0 is stable, I may accept suggestions.