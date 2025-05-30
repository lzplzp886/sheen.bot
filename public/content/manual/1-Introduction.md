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
- Speaker
- OLED Display

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
-  Download Sheenbot∞ extension from [www.sheen.bot/downloads](https://www.sheen.bot/downloads).  
- Open the mind+ app from your computer.
- If necessary, change the language to English by clicking the settings icon in the top-right corner.
- Now follow these steps to setup your Mind+ for use with the Sheenbot
    1. On the top right corner **change mode from "Online" to "Offline"**.  
    2. Click **Extensions** tab in Mind+.  
    3. Select board **FireBeetle ESP32-E**.  
    4. Click **User-Ext** tab.
    5. Import all the extension files that you downlaoded.  
    6. Return to coding area and restart mind+.

<table align="center">
  <tr>
    <td align="center">
      <img src="https://raw.githubusercontent.com/LovejoyMhishi/sheenbot-manual/main/images/1.png" width="500"/><br/>
      <sub><b>Language Settings</b></sub>
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/LovejoyMhishi/sheenbot-manual/main/images/2.png" width="500"/><br/>
      <sub><b>Switch to Offline Mode, then click on "Extensions"</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://raw.githubusercontent.com/LovejoyMhishi/sheenbot-manual/main/images/3.png" width="500"/><br/>
      <sub><b>Select FireBeetle ESP32-E and click the tab "User-Ext"</b></sub>
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/LovejoyMhishi/sheenbot-manual/main/images/5.png" width="500"/><br/>
      <sub><b>Import all the extension downloaded files</b></sub>
    </td>
  </tr>
</table>


  
## 1.10 Programming the SheenBot

This section provides hands-on programming examples using Mind+ to interact with various Sheenbot∞ components. You'll use visual blocks to build and upload programs that control and respond to:

- The OLED screen
- Buttons
- RGB lights
- Microphone
- Gyroscope
- RFID reader
- Speaker


Connect the Sheenbot to the computer using the Type-C cable plugged into the port marked on the Figure below.

Use visual blocks to create your program and then upload it to the Sheenbot.
<div style="display: flex; align-items: flex-start; justify-content: space-between;">
  <div style="flex: 1;">
    <ul>
      <li><b>Tips:</b>
        <ul>
          <li>Ensure all necessary extensions are installed before programming</li>
          <li>Save your projects frequently to avoid data loss</li>
          <li>Verify that the correct board and extensions are selected in Mind+</li>
          <li>Restart Mind+ if you encounter any connection or upload issues</li>
        </ul>
      </li>
    </ul>
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="https://raw.githubusercontent.com/LovejoyMhishi/sheenbot-manual/main/images/13.png" width="450"/>
    <div><sub><b>Figure 1.10a:</b> Connecting the Sheenbot to the computer</sub></div>
  </div>
</div>


### 1.10.1 Interfacing OLED Display and RGB Lights

In this section, we demonstrate how to use Mind+ visual blocks to control the **OLED display** and **RGB lights** on the Sheenbot∞ board.

Before proceeding, ensure the Sheenbot∞ extension is properly loaded into Mind+ as explained in **Section 1.9.1**. Follow these setup steps to start writing your first sheenbot programme:

1. Change the mode from **"Online" to "Offline"** if it is not on offline mode by default.
2. Start a new project by clicking the **Project** tab
3. Click the **Extensions** tab.
4. Select the board **FireBeetle ESP32-E**.
5. Open the **User-Ext** tab and select the **Sheenbot∞ extension**, as shown in **Figure 1.10a**.

6. Click **Back** to return to the Woekspace area.

The Mind+ interface consists of three main sections: the **Block Palette** on the left (where you drag coding blocks from), the **Coding Area** in the middle (where you build your program visually), and the **Code Tabs** on the right (which show the auto-generated code and allow manual editing). These sections are illustrated in **Figure 1.10.1b**.


Once set up, you're ready to create a sample program that writes text to the OLED screen and changes the RGB light color based on logic blocks.

Now, once you are in the workspace (see **Figure 1.10.1c** for all the following isntructions):

- Click on the **User** icon expansion on the far left inside the **Block Palette**.
- Drag the following blocks into the **forever** loop inside your **Coding Area**:
  - `lampNumber[]displayColor[]`
  `
- You can set the `lampNumber` for the specific RGB light you want to turn on.
- You can also select the colour for each RGB light.

- Paste the line **3 times** and select a specific lamp number and colour for each RGB light as shown in **Figure 1.10c**.

- Drag the **screen display text** block into your **forever** loop and customize it to print the text of your choice.
- Connect to your Sheenbot by clicking the Connect Device tab, as shown in step 3 of **Figure 1.10.1c**.
- Upload your code using the Upload button indicated in step 4 of the same figure. 
- The **Console Window** will display messages showing the progress of the code upload and confirm when it has been successfully uploaded.
- After a successful upload, your OLED display will show the custom text, and the RGB lights will turn on as programmed.

<table align="center">
  <tr>
    <td align="center">
      <img src="https://raw.githubusercontent.com/LovejoyMhishi/sheenbot-manual/main/images/6.png" width="500"/><br/>
      <sub><b> Figure 1.10.1a: </b>Select the Sheenbot∞ extension.</b></sub>
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/LovejoyMhishi/sheenbot-manual/main/images/7.png" width="500"/><br/>
      <sub><b> Figure 1.10.1b: </b>Block Palette| Coding Area| Code View Tabs</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://raw.githubusercontent.com/LovejoyMhishi/sheenbot-manual/main/images/8.png" width="500"/><br/>
      <sub><b>Figure 1.10.1c: </b>Drag, drop and upload your code"</b></sub>
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/LovejoyMhishi/sheenbot-manual/main/images/9.jpg" width="400"/><br/>
      <sub><b>Figure 1.10.1d: </b> The Final ressult</b></sub>
    </td>
  </tr>
</table>


### 1.10.2 Using Button Inputs to Control RGB Lights and OLED Display

This example shows how to use a button press to trigger the RGB lights and OLED display on the Sheenbot∞. When **Button A** is pressed, a message is shown on the OLED, all three RGB lights turn on, and then switch off one by one with a delay.

Follow the logic below to understand how this interaction is structured:

<div style="display: flex; align-items: flex-start; justify-content: space-between;">
  <div style="flex: 1;">
    <ul>
      <li>Check if Button A is pressed</li>
      <li>If pressed:
        <ul>
          <li>Display "Button A" on the OLED</li>
          <li>Turn on RGB LED 0 (yellow)</li>
          <li>Turn on RGB LED 1 (cyan)</li>
          <li>Turn on RGB LED 2 (red)</li>
          <li>Wait 1 second, then turn off RGB LED 0</li>
          <li>Wait 1 second, then turn off RGB LED 1</li>
          <li>Wait 1 second, then turn off RGB LED 2</li>
          <li>Clear the OLED display line</li>
        </ul>
      </li>
    </ul>
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="https://raw.githubusercontent.com/LovejoyMhishi/sheenbot-manual/main/images/10.png" width="500"/>
    <div><sub><b>FFigure 1.10.2a:</b> Button A press logic with RGB and OLED</sub></div>
  </div>
</div>


  
<div style="display: flex; align-items: flex-start; justify-content: space-between;">
  <div style="flex: 1;">
    <ul>
      <li>Check if Button B is pressed</li>
      <li>If pressed:
        <ul>
          <li>Display "Button B" on the OLED</li>
          <li>Turn on RGB LED 0 (green)</li>
          <li>Turn on RGB LED 1 (red)</li>
          <li>Turn on RGB LED 2 (orange)</li>
          <li>Keep the pattern active briefly</li>
          <li>Turn off all RGB LEDs</li>
          <li>Clear the OLED display line</li>
        </ul>
      </li>
    </ul>
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="https://raw.githubusercontent.com/LovejoyMhishi/sheenbot-manual/main/images/11.png" width="500"/>
    <div><sub><b>Figure 1.10.2b:</b> Button B press logic with RGB and OLED</sub></div>
  </div>
</div>

### 1.10.3 Using the Gyroscope to Trigger Speaker and RGB Output

In this example, the Sheenbot∞ uses its built-in gyroscope sensor to detect specific movements or orientations. When a defined motion condition is met—such as tilting or shaking—the program activates an RGB LED to glow red, providing a visual alert. Simultaneously, the speaker is triggered to audibly respond by speaking a custom message and playing a ringtone. This integration of motion sensing and audio-visual feedback demonstrates how users can build interactive and responsive projects using Sheenbot∞’s onboard sensors and outputs.
 
Here’s how the Sheenbot∞ uses its gyroscope to trigger the speaker and RGB lights:
<div style="display: flex; align-items: flex-start; justify-content: space-between;">
  <div style="flex: 1;">
    <ul>
      <li>Continuously monitor the gyroscope orientation</li>
      <li>Check if tilt or movement meets the defined condition (e.g., specific angle or shake)</li>
      <li>If condition is met:
        <ul>
          <li>Turn on RGB LED 2 (red) to indicate trigger</li>
          <li>Use speaker to say a custom message (e.g., "Motion detected!")</li>
          <li>Play a ringtone (e.g., "ring_1") using the speaker</li>
        </ul>
      </li>
    </ul>
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="https://raw.githubusercontent.com/LovejoyMhishi/sheenbot-manual/main/images/12.png" width="500"/>
    <div><sub><b>Figure 1.10.3a:</b> Gyroscope-controlled RGB and speaker output</sub></div>
  </div>
</div>


## 1.11 IoT Integration Capabilities

- Real-time sensor dashboard  
- MQTT communication support  
- Remote command execution  
- Smart farming support  

---