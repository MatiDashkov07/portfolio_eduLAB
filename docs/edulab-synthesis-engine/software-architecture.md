---
sidebar_position: 3
title: Software Architecture
---

# Software Architecture — v3.8

> Documentation of the current software implementation.

---

## 1. What This Page Documents

This page describes the **v3.8 software architecture** as it exists now — not as planned, not idealized.

This is a deliberately simple, single-file, procedural implementation. The goal is not modularity or scalability. The goal is understanding real-time embedded constraints, state machines, and interrupt-driven input **before** introducing OOP abstractions.

**v3.8 is intentionally non-modular.**

There is no class hierarchy. There is no HAL. There is no separate audio thread.

These are not oversights — they are pedagogical choices.

---

## 2. Design Philosophy: Monolithic First

Before building a multi-file OOP architecture, I wanted to understand:

- How state machines manage UI flow
- How interrupts interact with main loop logic
- How to prevent race conditions in embedded systems
- What filtering is required for noisy ADC inputs
- Why certain ESP32 peripheral calls must happen in specific order

**The entire firmware is ~450 lines in a single file.**

This makes the control flow transparent. Every variable, every function, every dependency is visible in one place.

:::warning Why This Is NOT How Professionals Do It

This architecture violates multiple professional best practices:
- Monolithic file structure
- Global state variables
- Shared state between ISR and main loop (requires careful atomic access)
- No separation of concerns
- No hardware abstraction layer

**This is intentional.**

The goal is to expose real embedded constraints before abstraction hides them.

Professional refactoring begins in v4.0.
:::

---

## 3. System Overview
![Software System Overview — v3.8](/img/projects/software-flowchart-v3.8.svg)

**Execution model:** Single-threaded with interrupt service routine (ISR)

**Data flow direction:**
```
ISR updates encoder position → Main loop consumes it
Never the other way around
```

---

## 4. File Structure
```
src/
└── main.cpp  (ENTIRE PROJECT - ~450 lines)
    ├── 1. Hardware Configuration
    ├── 2. Potentiometer Class (EMA Filter)
    ├── 3. State Management (Global Variables)
    ├── 4. Interrupt Service Routine (Encoder)
    ├── 5. Helper Functions
    ├── 6. Graphics Functions
    ├── 7. setup()
    └── 8. loop()
```

**Why single-file?**

- No build complexity
- No header/implementation split confusion
- Complete visibility of execution flow
- Forces understanding of scope and lifetime

**What this is NOT:**

- ❌ Not modular
- ❌ Not reusable
- ❌ Not scalable
- ❌ Not professional architecture

**But it IS:**

- ✅ Readable
- ✅ Debuggable
- ✅ Educational
- ✅ Sufficient for learning

---

## 5. The ONE Class: Potentiometer

The only OOP structure in v3.8.
```cpp
class Potentiometer {
  private:
    int pin;
    float filteredValue;      // EMA accumulator
    float alpha;              // Smoothing factor
    int lastStableValue;      // Hysteresis state
    int threshold;            // Change detection threshold
    
  public:
    Potentiometer(int p, float a = 0.15, int th = 40);
    void begin();
    bool update();            // Returns true if value changed
    int getValue();
};
```

**Purpose:** Smooth noisy ADC readings

**Algorithm:** Exponential Moving Average (EMA) + Hysteresis

$$
V_{\text{filtered}} = \alpha \cdot V_{\text{raw}} + (1 - \alpha) \cdot V_{\text{filtered}}
$$

**Parameters (tuned empirically):**
- $\alpha = 0.15$ (faster response)
- Threshold = 40 LSB (aggressive filtering)

**Why this exists as a class:**

- Encapsulates filter state
- Allows multiple independent pots
- Demonstrates basic OOP without overcomplicating

**What it does NOT do:**

- ❌ Polymorphism
- ❌ Inheritance
- ❌ Abstract interfaces

---

## 6. State Management

### 6.1 UI State Machine
```cpp
enum UIState { STATE_PLAYING, STATE_MENU };
UIState currentUIState = STATE_MENU;
```

| State | Trigger | Display | Encoder Behavior |
|-------|---------|---------|------------------|
| `STATE_MENU` | Boot / Encoder turn | Mode selection screen | Scroll through waveforms |
| `STATE_PLAYING` | Button press / Timeout | Live frequency display | (Not used in v3.8) |

**Timeout behavior:** After 10 seconds of inactivity in MENU, auto-return to PLAYING

### 6.2 Mute State
```cpp
bool isMuted = true;  // Starts muted on boot
```

**Toggle:** Long press (800ms) on encoder button

**Safety:** System ALWAYS boots muted to prevent audio surprises

### 6.3 Waveform Modes
```cpp
const char* menuItems[] = {"SQUARE", "SAW", "TRIANGLE", "NOISE"};
int selectedMode = -1;  // -1 = no mode selected yet
```

| Mode | Implementation | Duty Cycle Behavior |
|------|----------------|---------------------|
| 0: Square | Fixed 50% duty | Pot2 controls duty (square → pulse) |
| 1: Saw | Variable duty | Pot2 sweeps 0-100% |
| 2: Triangle | Variable duty | Triangle-like waveform using PWM duty sweep (not mathematically linear) |
| 3: Noise | Randomized freq + duty | Pot1 controls noise ceiling |

**Note:** These are PWM duty cycle approximations, not true waveform synthesis.

---

## 7. Interrupt Service Routine (ISR)
```cpp
void IRAM_ATTR updateEncoder() {
  unsigned long interruptTime = millis();
  
  // Debounce: 10ms lockout
  if (interruptTime - lastInterruptTime > 10) {
    if (digitalRead(PIN_CLK) != digitalRead(PIN_DT)) {
      virtualPosition++;
    } else {
      virtualPosition--;
    }
    lastInterruptTime = interruptTime;
  }
}
```

**Attached to:** `PIN_DT` falling edge  
**Priority:** Hardware interrupt (highest)  
**Critical section:** Reads `virtualPosition` protected with `noInterrupts()` / `interrupts()`

**Why IRAM_ATTR?**

ESP32-specific: Ensures the ISR resides in instruction RAM, avoiding flash/cache dependency during interrupt execution.

:::caution Implementation Note

Using `millis()` inside an ISR is not ideal practice, but is acceptable here due to:
- Human-driven interrupt source
- Typical interrupt rates in the tens to hundreds per second during rotation
- No strict timing requirements

This will be refactored to use hardware timer counters in v4.0.
:::

---

## 8. Main Loop Structure
```cpp
void loop() {
  // A. Button handling (short/long press detection)
  // B. Encoder position read (atomic access)
  // C. UI state transitions
  // D. Display update (capped at 20 FPS)
  // E. Potentiometer filtering
  // F. Audio engine (PWM control)
}
```

**Loop characteristics:**
- Frequency: ~7.6 kHz (measured under typical load) `[MEASURED]`
- Display refresh: 20 FPS (50ms interval cap)
- Audio update:
  - On potentiometer change (normal modes)
  - Continuous random update (NOISE mode)

---

## 9. Timing Model

**Critical understanding:**

- Audio output is **NOT sample-accurate**
- PWM frequency updates are **event-driven**, not clock-driven
- No fixed sample clock exists in v3.8
- Timing jitter is visible on oscilloscope measurements

**Why this matters:**

This limitation directly motivated the v4.0 I2S refactor.

| Aspect | PWM (v3.8) | DAC (v4.0 planned) |
|--------|------------|---------------------|
| Timing | Event-based | Sample-clocked (target) |
| Jitter | High (visible) | Low (target) |
| Filtering | External RC | Digital reconstruction |
| Audio Quality | Lo-Fi (~8-bit) | Hi-Fi (16-bit target) |
| Sample Rate | Variable | Fixed 44.1 kHz (target) |

---

## 10. Audio Engine (PWM Generation)
```cpp
if (!isMuted && selectedMode != -1) {
  if (selectedMode == 3) {
    // NOISE mode
    int noiseFreq = random(200, noiseCeiling);
    int noiseDuty = random(10, 255);
    ledcChangeFrequency(LEDC_CHANNEL, noiseFreq, LEDC_RESOLUTION);
    ledcWrite(LEDC_CHANNEL, noiseDuty);
  } else {
    // Normal modes
    int targetFrequency = map(potPitch.getValue(), 0, 4095, 350, 2000);
    int targetDuty = map(potTone.getValue(), 0, 4095, 0, 255);
    
    ledcChangeFrequency(LEDC_CHANNEL, targetFrequency, LEDC_RESOLUTION);
    ledcWrite(LEDC_CHANNEL, targetDuty);
  }
}
```

**Critical bug fix:** Order matters!
```cpp
❌ WRONG: ledcWrite() then ledcChangeFrequency()
✅ CORRECT: ledcChangeFrequency() then ledcWrite()
```

Using `ledcWriteTone()` corrupts duty cycle settings.  
This was discovered via oscilloscope debugging.

---

## 11. Display Rendering

All graphics are **procedurally generated** — no bitmaps stored.
```cpp
void drawWaveIcon(int mode, int x, int y) {
  switch(mode) {
    case 0: /* Draw square wave lines */
    case 1: /* Draw sawtooth lines */
    case 2: /* Draw triangle lines */
    case 3: /* Draw noise pattern */
  }
}
```

**Why procedural?**

- Minimal memory footprint
- Scalable graphics
- Educational: understanding pixel-level drawing

**Display buffer:** 128×32 monochrome (512 bytes total)

---

## 12. Code Annotations

### Button State Machine
```cpp
// Short press: Select mode
// Long press (>800ms): Toggle mute
if (reading == LOW && !buttonActive) {
  buttonActive = true;
  pressStartTime = millis();
  longPressHandled = false;
}
```

### Race Condition Protection
```cpp
int currentPos;
noInterrupts();                    // Enter critical section
currentPos = virtualPosition;      // Read ISR variable safely
interrupts();                      // Exit critical section
```

**Why this is necessary:**

Without atomic access, the main loop could read `virtualPosition` while the ISR is writing to it.

### Display Throttling
```cpp
if (millis() - lastDisplayUpdate > 50) {  // 20 FPS cap
  updateDisplay();
  lastDisplayUpdate = millis();
}
```

**Prevents:** I2C bus saturation and audio timing interference

---

## 13. Known Software Issues

| Issue | Cause | Impact | Planned Fix |
|-------|-------|--------|-------------|
| Pitch quantization | Hysteresis threshold too high | ~15 Hz steps | Tune threshold or move to DAC |
| No boot animation | Immediate start | User confusion | Add splash screen |
| Encoder false steps | HW quality + SW debounce | Occasional skips | Better encoder hardware |
| Frequency jumps | Race condition (rare) | Audio glitch | Atomic flag protection |
| `millis()` in ISR | Overhead inside interrupt | None observable | Hardware timer in v4.0 |

---

## 14. What's NOT Here

To be explicit, v3.8 does **not** include:

### Architecture
- ❌ Object-oriented design
- ❌ Class hierarchies
- ❌ Polymorphism
- ❌ Hardware abstraction layer (HAL)
- ❌ Multiple source files
- ❌ RTOS or threading

### Audio
- ❌ True waveform synthesis
- ❌ I2S protocol
- ❌ DAC output
- ❌ ADSR envelopes
- ❌ Digital filters (LPF/HPF/BPF)
- ❌ Polyphony
- ❌ Look-up tables

### Optimization
- ❌ Dual-core usage
- ❌ DMA transfers
- ❌ Fixed-point arithmetic
- ❌ Sample-accurate timing

These will be introduced gradually starting in v4.0.

---

## 15. What This Architecture Taught Me

Beyond the technical implementation:

- **Abstractions hide timing problems** — PWM exposed audio physics brutally
- **Global state is dangerous but educational** — Race conditions become visible
- **Simplicity accelerates understanding** — No layers to debug through
- **Debugging with a scope beats guessing** — Visual feedback is irreplaceable
- **Order matters in embedded systems** — Function call sequence affects hardware behavior

These lessons inform the v4.0 refactor.

---

## 16. Next: v4.0 Software Refactor

The next iteration focuses on **modularity and proper audio**, not features.

| Aspect | v3.8 | v4.0 |
|--------|------|------|
| Files | 1 | 6+ |
| Classes | 1 | 5+ |
| Architecture | Procedural | OOP with HAL |
| Audio | PWM direct | I2S abstraction |
| Waveforms | Duty cycle tricks | True DDS synthesis |
| Threading | Single-threaded | Possible dual-core usage (planned) |

**Goal:** Separate concerns without losing transparency.

---

## 17. Related Documentation

- [Hardware Design](./hardware-design)
- [Replication Status](./replication-status)
- [Full Source Code](https://github.com/MatiDashkov07/portfolio_eduLAB/blob/main/src/main.cpp)

---

## Closing

This software architecture is not impressive by professional standards.

Its value lies in the embedded systems lessons it exposes.

Every limitation is intentional. Every choice is documented.

The refactor to OOP will happen **after** the fundamentals are understood.