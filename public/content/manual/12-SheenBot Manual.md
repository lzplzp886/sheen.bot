# Sheenbot∞ User Manual / Datasheet

Welcome to the **Sheenbot∞** — a powerful, all-in-one, AI-native development board designed for education, robotics, IoT, and smart automation. This datasheet provides an in-depth overview of the hardware features, capabilities, and setup instructions for getting started with Sheenbot∞.

---

# 1. Generic Capabilities

This chapter covers the core features and built-in capabilities of the Sheenbot∞ board itself, without requiring external sensors or modules. It introduces the main hardware features, interfaces, and programming environments to build a solid foundation.

## 1.1 Product Highlights

| Feature                        | Description                                                                 |
|-------------------------------|-----------------------------------------------------------------------------|
| **Board Type**                 | AI-native programmable board for education and prototyping                 |
| **Power Source**               | Built-in 1100mAh rechargeable lithium battery                              |
| **I/O Ports**                  | 18 × USB Type-C ports                                                      |
| **Wireless Communication**    | WiFi and Bluetooth                                                         |
| **Onboard Components**         | OLED screen, buttons, RGB lights, microphone, gyroscope, RFID, speaker     |
| **Voice & AI**                 | Voice synthesis, voice recognition, text-to-speech, AI camera (optional)  |
| **Programming Platforms**      | CODEIT App, Mind+, Mobile AI Platform                                     |
| **Expansion Options**          | Expansion board, smart farm board                                         |

## 1.2 Physical Features

- Charging Port  
- Power Switch  
- OLED Display  
- Button A and Button B  
- RFID Reader  
- WiFi & Bluetooth Modules  
- Reset Button  
- Touch Keys  
- Text-to-Speech Module  
- Microphone  
- RGB LED  
- Gyroscope  
- Built-in 1100mAh Battery  
- Type-C Ports (×18)  
- Expansion Port

## 1.3 Full Type-C Interface Design

Sheenbot∞ offers **18 full Type-C interfaces** for seamless plug-and-play connectivity with sensors and actuators.

- No misalignment issues or fragile cables  
- Simultaneous multi-device support  
- Optimized for classroom environments  

## 1.4 Built-in Sensors and Modules

- RGB Lighting  
- Three-axis Gyroscope  
- Microphone  
- Temperature Sensor  
- Moisture Sensor  
- Gas Sensor  

> ⚠️ All sensors are natively supported without additional hardware.

## 1.5 GPIO Pin Mapping

| Port            | GPIO     | Function Type         | Digital In | Digital Out | Analog In | Analog Out | PWM Support | Motor Channel | Remark                                                  |
|-----------------|----------|----------------------|------------|-------------|-----------|------------|-------------|---------------|---------------------------------------------------------|
| P0              | IO33     | Analog I/O           | Y          | Y           | Y         | Y          | Yes         |               | Voice Recognition Module (Expansion Board)             |
| P1              | IO32     | Digital I/O          | Y          | Y           | Y         | Y          | Yes         |               | Can also be configured as output                        |
| P2              | IO35     | Digital & Analog In  | Y          | N           | Y         | N          | No          |               | Input only                                              |
| P3              | IO34     | Analog Input         | N          | N           | Y         | N          | No          |               | Input only                                              |
| P5              | IO0      | Digital I/O          | Y          | Y           | N         | N          | Yes         |               | Startup mode selection, Button A                        |
| P8              | IO26     | Digital I/O          | Y          | Y           | N         | N          | Yes         | M1            | Motor PWM output, TTS                                   |
| P9              | IO25     | Digital I/O          | Y          | Y           | N         | N          | Yes         | M3            | Motor PWM output                                        |
| P10             | IO36     | Analog Input         | N          | N           | Y         | N          | No          |               | Microphone                                              |
| P11             | IO2      | Digital I/O          | Y          | Y           | N         | N          | Yes         |               | Button B                                                |
| P13 / P14       | IO18/19  | Digital I/O          | Y          | Y           | N         | N          | Yes         | M2            | Motor PWM output                                        |
| P14             | IO19     | Digital I/O          | Y          | Y           | N         | N          | Yes         |               |                                                         |
| P15             | IO23     | Digital I/O          | Y          | Y           | N         | N          | Yes         | M3            | Motor PWM output                                        |
| P16             | IO5      | Digital I/O          | Y          | Y           | N         | N          | Yes         | M1            | Motor PWM output                                        |
| P19 / P20 (I2C) | IO22/21  | Digital I/O          | Y          | Y           | N         | N          | Yes         |               | I2C Bus: NFC, OLED, Gyroscope                           |

## 1.6 Connectivity and AI

- **WiFi & Bluetooth** for wireless programming and IoT access  
- **AI Voice Recognition** (offline) for natural interaction  
- **AI Camera Module** (optional) for vision-based learning and detection  
- **IoT-ready** with MQTT support for real-time data exchange

## 1.7 Voice Interaction & TTS

Sheenbot∞ supports:

- Voice command recognition using onboard mic  
- Text-to-Speech (TTS) for responsive audio interaction  
- Speech synthesis for smart educational tools  

## 1.8 Programming Interfaces

### 1.8.1 CODEIT App (Mobile)

- Block-based coding  
- Runs on smartphones and tablets  
- Designed for on-the-go or classroom use  
- No PC required

### 1.8.2 Mind+ Platform (PC)

- Visual coding with drag-and-drop blocks  
- IoT and AI integration support  
- Friendly for beginners and educators

### 1.8.3 Mobile AI Platform

- Built-in AI logic control  
- Variable configuration and program compilation directly on mobile  
- Interactive learning for AI and automation

## 1.9 Setup Guide for Mind+

### 1.9.1 Download and Install Mind+

👉 [https://mindplus.cc](https://mindplus.cc)

- Windows, macOS, Linux

**After installation:**

1. Open Mind+ and **change mode from "Online" to "Offline"**.  
2. Download Sheenbot∞ extension from [www.sheen.bot/downloads](https://www.sheen.bot/downloads).  
3. Click **Extensions → User-Ext** tab in Mind+.  
4. Select board **FireBeetle ESP32-E**.  
5. Import the extension file.  
6. Return to coding area.

### 1.9.2 Connect Sheenbot∞

- Plug in with Type-C cable  
- Power on board  

### 1.9.3 Start Programming

- Use visual blocks  
- Upload program  

Tips:

- Install all required extensions  
- Save projects regularly  
- Check board and extension selections  
- Restart Mind+ if needed  

## 1.10 IoT Integration Capabilities

- Real-time sensor dashboard  
- MQTT communication support  
- Remote command execution  
- Smart farming support  

---

# 2. Sensors & Actuators Section

This chapter briefs the functions of each sensor and actuator on Sheenbot∞, providing example codes and screenshots to demonstrate usage. It will include detailed input/output values, typical applications, and programming snippets.

> *[Dummy text placeholder: Here, include individual sensor descriptions, example code snippets, expected input/output data, and screenshots illustrating how to use each sensor or actuator.]*

Example sensors and actuators to cover:

- RGB Lighting  
- Three-axis Gyroscope  
- Microphone  
- Temperature Sensor  
- Moisture Sensor  
- Gas Sensor  
- Buttons (A and B)  
- RFID Reader  
- Touch Keys  
- Text-to-Speech Module  
- RGB LED  
- Gyroscope  

---

# 3. Modules Section

This chapter covers advanced modules that integrate multiple sensors or functions to perform specialized tasks such as audio recognition, large language model integration, AI vision, and IoT features.

> *[Dummy text placeholder: Introduce each module’s purpose, hardware components involved, functional overview, programming interfaces, and example applications.]*

Example modules:

- 3.1 Audio Recognition Module  
- 3.2 Large Language Model (LLM) Module  
- 3.3 AI Vision Module (optional camera and processing)  
- 3.4 IoT Module (wireless data handling and cloud integration)  

---

# 4. Expansion Kits Section

This chapter introduces expansion kits, which usually combine multiple modules and sensors to create comprehensive projects like smart home systems. It includes instructions on assembly, wiring, installation, and example programs.

> *[Dummy text placeholder: Explain how to assemble expansion kits, necessary modules, integration steps, and provide example code and installation guides.]*

Example expansion kits:

- 4.1 Expansion Board (Mecanum wheels, AI voice, servo/DC motor support)  
- 4.2 Smart Farm Board (environmental monitoring, cloud connectivity)  
- 4.3 ∞ Block Basic Kit (starter kit with 6 sensors and actuators)  

---

© sheen.bot 2025
