---
sidebar_position: 3
title: Software Architecture
---

# Software Architecture

The software core of the eduLAB Synthesis Engine is built on **Modern C++ (C++17)**, focusing on efficiency, modularity, and real-time performance. The architecture separates the hardware abstraction layer (HAL) from the synthesis logic, allowing for portability between microcontrollers (ESP32 / Teensy).

## System Overview

The firmware operates on two concurrent execution contexts:
1.  **The Audio Thread (High Priority):** Handles DSP calculations, waveform generation, and mixing. Must complete within the sample time window.
2.  **The Control Thread (Lower Priority):** Handles UI, display updates, input polling, and state management.

## 1. Object-Oriented Synthesis Design

To allow for flexible sound generation, the engine uses **Polymorphism**. All waveform generators inherit from a generic `Oscillator` base class. This allows the main engine to swap wave types (Sine, Square, Saw) at runtime without changing the mixing logic.

### Interface Example (Header)

```cpp
class Oscillator {
public:
    virtual void setFrequency(float freq) = 0;
    virtual void setAmplitude(float amp) = 0;
    
    // The core DSP method - returns the next sample
    virtual float nextSample() = 0; 
    
    virtual ~Oscillator() = default;
};

class SineWave : public Oscillator {
    // Implementation of sine synthesis using Look-Up Tables (LUT) or std::sin
};
```

## 2. The Audio Pipeline (DSP Chain)

The signal flow mimics a classic subtractive synthesizer architecture. Data is processed sample-by-sample (or block-by-block in v4.0) to minimize latency.

**Flow:** `Oscillator -> Mixer -> ADSR Envelope -> Filter -> Output Stage`

- **Wave Generation:** Direct Digital Synthesis (DDS) using phase accumulators.
- **Envelope:** State-machine based ADSR (Attack, Decay, Sustain, Release) modulating amplitude.
- **Filtering:** Digital Biquad filters implementing Low-Pass logic.

## 3. Finite State Machine (FSM)

To manage the complex User Interface on a small OLED screen without blocking the audio, a Finite State Machine manages the system mode.

| State | Description | Active Controls |
|-------|-------------|-----------------|
| `PLAY_MODE` | Main performance screen | Encoders change Pitch/Cutoff |
| `MENU_SELECT` | Navigation | Encoders scroll options |
| `PARAM_EDIT` | Deep editing | Encoders change specific ADSR values |
| `SETTINGS` | System config | WiFi / Save / Calibration |

## 4. Hardware Abstraction Layer (HAL)

To ensure the code runs on both ESP32 (v3.8) and Teensy 4.1 (v4.0), direct hardware calls are wrapped in abstraction classes.

- **GPIO Manager:** Handles button debouncing and LED states.
- **Display Driver:** Wraps the `Adafruit_SSD1306` or `U8g2` libraries.
- **Audio Driver:**
  - *ESP32 Implementation:* Writes to I2S DMA buffer or Sigma-Delta peripherals.
  - *Teensy Implementation:* Utilizes the Teensy Audio Library objects.

## 5. Performance Optimization

Given the constraints of embedded systems, several optimizations are used:

- **IRAM_ATTR (ESP32):** Critical DSP functions are loaded into RAM (Instruction RAM) instead of Flash to prevent cache misses during audio interrupts.
- **Look-Up Tables (LUT):** Trigonometric functions (Sine, Tanh) are pre-calculated to avoid expensive math operations during runtime.
- **Fixed-Point Math:** Utilized where FPU (Floating Point Unit) usage is too slow or unavailable.

---

*Full source code documentation is generated via Doxygen and available in the GitHub repository.*
```