---
sidebar_position: 4
title: Build Guide
---

# Build Guide (v3.8 Prototype)

:::info Work in Progress
This guide covers the assembly of the **v3.8 Development Build** on a breadboard. The final PCB v4.0 fabrication files (Gerbers) are currently in design validation.
:::

## 1. Prerequisites
Before attempting to replicate the eduLAB Synthesis Engine, ensure you have the following:

* **Skills:** Basic breadboarding, soldering (for pin headers), and C++ environment setup.
* **Tools:**
    * Soldering Iron (for prepping modules)
    * Digital Multimeter
    * Oscilloscope (Recommended for debugging the DAC filter)
    * Breadboard & Jumper Wires

## 2. Bill of Materials (BOM)

### Core Components
| Component | Value/Type | Quantity | Description |
| :--- | :--- | :--- | :--- |
| **MCU** | ESP32-S3 DevKitC | 1 | Main Processor (or Teensy 4.1 for v4) |
| **Display** | SSD1306 OLED | 1 | 0.96" I2C Display (128x64) |
| **Encoder** | EC11 Rotary | 2 | With Push-Button |
| **Op-Amp** | LM358 / TL072 | 1 | Output Buffer Stage |

### Passives & Connectors
| Component | Value | Quantity | Description |
| :--- | :--- | :--- | :--- |
| **Resistors** | 10kΩ, 1kΩ, 220Ω | 10+ | Pull-ups, protection, LED limiting |
| **Capacitors** | 100nF, 10µF | 4 | Decoupling and RC Filtering |
| **Audio Jack** | 3.5mm TRS | 1 | Stereo Output Jack |
| **Diode** | 1N5819 | 1 | **Critical:** Flyback Protection |

## 3. Assembly Overview



The assembly is divided into three subsystems. It is recommended to build and test them in this order:

### Step A: Power & MCU
1.  Mount the ESP32 on the breadboard.
2.  Bridge the power rails (Red/Blue) to ensure stable 3.3V and 5V distribution.
3.  **Critical:** Place a 10µF capacitor near the ESP32 power input to stabilize current spikes during WiFi operation.

### Step B: The Audio Filter (Analog Stage)
This is the most sensitive part of the build.
1.  Build the **RC Low-Pass Filter** close to the DAC output pin (GPIO 25/26).
2.  Connect the filtered signal to the **Op-Amp Non-Inverting Input (+)**.
3.  Configure the Op-Amp as a **Voltage Follower** (Connect Output pin directly to Inverting Input (-)).
4.  Connect the Output to the 3.5mm Jack (Tip/Ring) via a 220Ω series resistor (Short-circuit protection).

### Step C: User Interface
1.  Connect the OLED Display via I2C (SDA/SCL pins).
2.  Connect Rotary Encoders. *Note: Use 10kΩ pull-up resistors if using the ESP32 internal pull-ups is insufficient for your noise environment.*

:::warning Protection First
Before connecting any inductive load (like a raw speaker coil), ensure the **Flyback Diode** is installed anti-parallel to the load. Failing to do so may damage the GPIO.
:::

## 4. Software Installation

The project uses **PlatformIO** (VS Code Extension) for dependency management.

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/MatiDashkov07/portfolio_eduLAB.git](https://github.com/MatiDashkov07/portfolio_eduLAB.git)
    ```
2.  **Open in PlatformIO:**
    Open the `firmware` folder in VS Code.
3.  **Install Libraries:**
    PlatformIO will automatically download:
    * `Adafruit_SSD1306`
    * `Adafruit_GFX`
    * `Encoder`
4.  **Upload:**
    Connect via USB-C and click the "Upload" arrow.

## 5. Verification
How to know if it works?

1.  **Visual Check:** The OLED should display the eduLAB splash screen on boot.
2.  **Voltage Check:** Measure the 3.3V rail. It should be stable.
3.  **Audio Check:** Connect headphones. You should hear a clean sine wave when in "Test Mode". If you hear a buzz, check your ground connections.