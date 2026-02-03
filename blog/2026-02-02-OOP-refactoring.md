---
slug: v38-refactor-postmortem
title: "Killing the Monolith: An OOP Refactor That Exposed Every Hidden Bug"
authors: [mati]
tags: [embedded, cpp, oop, refactor, architecture, debugging, esp32]
---

In my preparation for taking the first real step toward **eduLAB v4.0**, I entered a place most developers actively avoid: refactoring hell.

Up until now, eduLAB lived inside a single ~350-line `main.cpp` file. It worked. It made sound. It had a UI. But it was fragile. Any small change in one area had a habit of breaking something completely unrelated somewhere else.

At some point it became clear: continuing development in this state was not sustainable.

More importantly, I learned something critical over the past few days:

> **Refactoring does not create bugs — it exposes faulty assumptions that were hidden inside code that worked “by accident.”**

---

## Context: Why Refactoring Was Inevitable

Version 3.8 of eduLAB was functionally complete, but architecturally brittle. Every small fix turned into a debugging rabbit hole. Changing UI logic would break audio. Touching input handling would unexpectedly affect system state. Even trivial improvements required carefully tiptoeing around unrelated code paths.

The problem was not lack of comments or insufficient documentation.  
Unfortunately, **well-styled comments do not turn a 350-line monolithic file into a maintainable system**.

Audio generation, input handling, UI rendering, and state logic were all mixed together. The code technically worked — but only because execution happened in the “right” order by coincidence.

The goal of this refactor was not “clean code” or aesthetics. It was:

- Separation of concerns (SoC)
- Explicit and controlled state handling
- Laying the architectural foundation for version 4.0

---

## From Monolith to Modules

### The Old World (Briefly)

The original `main.cpp` suffered from three classic issues:

- Global state — any part of the code could affect any other part, often unintentionally  
- Tight coupling between unrelated components  
- Program flow that depended heavily on execution order  

This made reasoning about the system increasingly difficult.

---

### The New Architecture

The refactor reorganized the project into explicit modules, each with a single responsibility.  
Confirmed abstractions were introduced **only where they reduced coupling** — not where they added artificial structure.

```text
main.cpp
├── StateMachine
│   ├── Menu
│   └── DisplayManager
├── AudioEngine
├── Button
├── RotaryEncoder
└── Potentiometer
```

`main.cpp` now acts purely as an orchestrator, not a dumping ground for logic.

---

### Responsibility Map

Each module owns exactly one domain:

- **AudioEngine** — audio generation and output only  
- **StateMachine** — the single authority over system state  
- **Menu** — wave selection logic, acting as a bridge between UI and audio  
- **DisplayManager** — rendering and layout only  
- **Button** — button state, debouncing, and press-type detection  
- **RotaryEncoder** — encoder movement and direction decoding  
- **Potentiometer** — analog sampling, filtering, and value stability  

While these input classes share a conceptual role, they are intentionally **not part of a shared abstraction or inheritance hierarchy**.

Each input type has fundamentally different behavior and timing requirements, so they are implemented as independent, purpose-built classes.

---

## The Bug Cemetery

:::warning
Every bug described below already existed.  
The refactor didn’t introduce them — it removed the camouflage that allowed them to hide.
:::

---

## Bug Postmortems

### Bug #1 — The Silence Bug (Triangle / Saw)

**Symptom**  
Selecting Triangle or Saw resulted in silence unless a potentiometer was moved.

**Root Cause**  
Internal state desynchronization.  
A feedback tone temporarily set the PWM duty cycle to zero, but the `AudioEngine`’s cached state (`lastAppliedDuty`) was not updated.  
The engine believed the output was already correct and optimized away the write.

**Fix**  
Explicitly synchronize internal state with the actual hardware state.

```cpp
// AudioEngine.cpp
lastAppliedDuty = 0;
```

**Verification**  
All waveform transitions now behave identically to the pre-refactor version.

---

### Bug #2 — Encoder Bypass While Muted

**Symptom**  
Rotating the encoder while muted unmuted the system and jumped directly into the menu.

**Root Cause**  
`StateMachine::onEncoderMoved()` transitioned to MENU unconditionally, ignoring the MUTE state.

**Fix**  
State-aware gating: encoder movement is ignored while muted.

```cpp
if (currentState == MUTE) {
    return;
}
```

:::tip
**Lesson:** Events must be filtered by state — not blindly executed.
:::

---

### Bug #3 — The Delayed Beep

**Symptom**  
The mute/unmute beep occurred only after releasing the button.

**Root Cause**  
Long-press detection was coupled to button release, delaying the event.

**Fix**  
Separate the concepts:
- Long-press event timing  
- Button release for state reset  

**Design Insight**  
An event should fire when its condition becomes true — not when another condition ends.

---

### Bug #4 — Broken First Unmute

**Symptom**  
The first unmute showed a partially rendered PLAYING screen with muted audio.

**Root Cause**  
The system booted with `selectedMode = -1`.  
Unmuting jumped directly into PLAYING with an invalid mode index.

**Fix**  
Force the user through the menu if no mode has been selected yet.

```cpp
if (menu.getSelectedMode() == -1) {
    currentState = MENU;
} else {
    currentState = PLAYING;
}
```

**Lesson**  
Never assume initialization paths were executed — enforce them.

---

### Bug #5 — Off-Center Splash Screen

**Symptom**  
The splash screen text was aligned too far to the left.

**Root Cause**  
Hardcoded drawing coordinates.

**Fix**  
Use the centralized `drawCenteredText()` helper.

**Why It Matters**  
This bug was cosmetic, but it validated that layout responsibility now belongs exclusively to `DisplayManager`.

---

### Bug #6 — Menu Freeze

**Symptom**  
Audio output froze whenever the system entered MENU mode.

**Root Cause**  
A guard clause prevented `AudioEngine::update()` while in MENU state.

**Fix**  
Remove the guard.  
The menu is UI — audio should remain continuous.

**Architectural Lesson**  
UI state should not dictate audio engine execution unless explicitly required.

---

### Bug #7 — The Critical Hard Lock

**Symptom**  
After the first unmute, the button stopped responding entirely.  
No mode selection, no beep, no recovery.

**Root Cause**  
A logical impossibility:
- Button release logic (`HIGH`) was nested inside the pressed (`LOW`) block  
- The reset path was unreachable  

**Fix**  
Move release detection outside the pressed block.

**Lesson**  
The refactor didn’t break this logic — it made the impossible visible.

---

## Verification Strategy

To verify correctness, I compared the refactored system against the last stable pre-refactor build after every fix.

The success criterion was simple:  
**identical observable behavior under a cleaner architecture**.

No new features.  
No “improvements”.  
Just equivalence without relying on accidental execution order.

---

## Lessons Learned

- Refactoring does not create bugs — it exposes hidden assumptions  
- Events are not the same as state transitions  
- UI state should never own audio execution  
- Initialization paths must be enforced, not assumed  
- If a condition cannot happen, the code should make it impossible  

An additional skill that became painfully obvious during this process was **physical QA testing** — systematically exploring edge cases and comparing real-world behavior between versions.

---

## What This Enables Next

This refactor lays the groundwork for:

- An abstract `AudioDriver`  
- A future I2S backend  
- True waveform generation (not PWM tricks)  
- Polyphony in later versions  

This was not refactoring for refactoring’s sake —  
it was a necessary architectural step.

---

**Refactoring didn’t make the system cleaner.**  
**It made incorrect assumptions impossible to ignore.**
