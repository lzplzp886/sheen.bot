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
      <img src="/content/manual//images/1.png" width="500"/><br/>
      <sub><b>Language Settings</b></sub>
    </td>
    <td align="center">
      <img src="/content/manual//images/2.png" width="500"/><br/>
      <sub><b>Switch to Offline Mode, then click on "Extensions"</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/content/manual//images/3.png" width="500"/><br/>
      <sub><b>Select FireBeetle ESP32-E and click the tab "User-Ext"</b></sub>
    </td>
    <td align="center">
      <img src="/content/manual//images/5.png" width="500"/><br/>
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
    <img src="/content/manual//images/13.png" width="450"/>
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
      <img src="/content/manual//images/6.png" width="500"/><br/>
      <sub><b> Figure 1.10.1a: </b>Select the Sheenbot∞ extension.</b></sub>
    </td>
    <td align="center">
      <img src="/content/manual//images/7.png" width="500"/><br/>
      <sub><b> Figure 1.10.1b: </b>Block Palette| Coding Area| Code View Tabs</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/content/manual//images/8.png" width="500"/><br/>
      <sub><b>Figure 1.10.1c: </b>Drag, drop and upload your code"</b></sub>
    </td>
    <td align="center">
      <img src="/content/manual//images/9.jpg" width="400"/><br/>
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
    <img src="/content/manual//images/10.png" width="500"/>
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
    <img src="/content/manual//images/11.png" width="500"/>
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
    <img src="/content/manual//images/12.png" width="500"/>
    <div><sub><b>Figure 1.10.3a:</b> Gyroscope-controlled RGB and speaker output</sub></div>
  </div>
</div>


## 1.11 IoT Integration Capabilities

- Real-time sensor dashboard  
- MQTT communication support  
- Remote command execution  
- Smart farming support  

---

# 2. Sensors & Actuators Section

This chapter briefs the functions of each sensor and actuator on Sheenbot∞, providing example codes and screenshots to demonstrate usage. It will include detailed input/output values, typical applications, and programming snippets.

Sensors and actuators covered:
   
- Temperature Sensor  
- Moisture Sensor
- Ultrasonic Sensor  
- Gas Sensor  
- Button  
- RFID Reader  
- Touch Keys  
- Text-to-Speech Module    
- Gyroscope  

## 2.1 Temperature Sensor

The temperature sensor measures the ambient temperature of the environment and provides real-time feedback. It is useful in environmental monitoring systems and climate control applications.

**Example Applications:**
- Room temperature monitoring
- Smart thermostats
- Weather stations

### 2.1.1 Example Code for the Temperature Sensor
<div style="display: flex; align-items: flex-start; justify-content: space-between;">
  <div style="flex: 1;">
    <ul>
      <li>Start by plugging the temperature sensor into one of the expansion ports using the provided Type-C cable.</li>
      <li>Drag the <code>ScreenDisplay</code> block onto the workspace first.</li>
      <li>Then drag the <code>read temperature</code> block from the code block menu and insert it inside the <code>ScreenDisplay</code> block.</li>
      <li>From the dropdown menu in the <code>read temperature</code> block, select the correct pin where the sensor is connected (e.g., <code>P1</code>).</li>
      <li>This setup will:
        <ul>
          <li>Continuously read the ambient temperature from the sensor</li>
          <li>Display the real-time temperature value on the screen module</li>
        </ul>
      </li>
    </ul>
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="/content/manual//images/14.png" width="500"/>
    <div><sub><b>Figure 2.1.2a:</b> Using <code>read temperature</code> inside <code>ScreenDisplay</code> to show values</sub></div>
  </div>
</div>



## 2.2 Moisture Sensor

The moisture sensor detects the water content in the soil. It outputs analog values depending on how wet or dry the soil is.

**Example Applications:**
- Automatic plant watering systems
- Agricultural field monitoring
- Soil dryness detection for gardening

### 2.2.1 Example Code for the Moisture Sensor

<div style="display: flex; align-items: flex-start; justify-content: space-between;">
  <div style="flex: 1;">
    <ul>
      <li>Connect the moisture sensor to one of the expansion pins using the provided Type-C cable.</li>
      <li>Drag the <code>read</code> block from the code blocks section to the workspace.</li>
      <li>From the dropdown in the <code>read</code> block:
        <ul>
          <li>Select <b>moisture</b> as the sensor type</li>
          <li>Select the correct pin that corresponds to where the sensor is plugged in</li>
        </ul>
      </li>
      <li>Drag a <code>ScreenDisplay</code> block onto the workspace.</li>
      <li>Insert the configured <code>read moisture</code> block inside the <code>ScreenDisplay</code> block.</li>
      <li>This setup will:
        <ul>
          <li>Continuously read soil moisture levels from the sensor</li>
          <li>Display the values in real time on the screen module</li>
        </ul>
      </li>
    </ul>
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="/content/manual//images/15.png" width="500"/>
    <div><sub><b>Figure 2.2.1a:</b> Moisture sensor reading displayed using block-based code</sub></div>
  </div>
</div>

---

## 2.3 Ultrasonic Sensor

The ultrasonic sensor measures the distance to an object using sound waves. It is a non-contact sensor and outputs the distance in centimeters or inches.

**Example Applications:**
- Obstacle detection for autonomous robots
- Liquid level monitoring in tanks
- Proximity alert systems

### 2.3.1 Example Code for the Ultrasonic Sensor

<div style="display: flex; align-items: flex-start; justify-content: space-between;">
  <div style="flex: 1;">
    <ul>
      <li>Start by connecting the ultrasonic sensor to one of the available dual-pin ports using the provided Type-C cable.</li>
      <li>The ultrasonic sensor requires both a <b>TRIG</b> and <b>ECHO</b> data line. Choose a port with two pins such as <b>(P14/P13)</b> or <b>(P1/P0)</b>.</li>
      <li>Drag a <code>ScreenDisplay</code> block to your workspace first.</li>
      <li>Next, drag the <code>read ultrasonic sensor unit</code> function from the code blocks section and insert it inside the <code>ScreenDisplay</code> block.</li>
      <li>From the dropdown menus in the <code>read ultrasonic sensor unit</code> block:
        <ul>
          <li>Set <b>TRIG</b> to <code>P1</code> and <b>ECHO</b> to <code>P0</code> if the sensor is connected to the P1/P0 port.</li>
          <li>Alternatively, set <b>TRIG</b> to <code>P14</code> and <b>ECHO</b> to <code>P13</code> for the P14/P13 configuration.</li>
        </ul>
      </li>
      <li>This setup will:
        <ul>
          <li>Continuously measure the distance to an object in front of the sensor</li>
          <li>Display the real-time distance value on the screen</li>
        </ul>
      </li>
    </ul>
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="/content/manual//images/16.png" width="500"/>
    <div><sub><b>Figure 2.3.1a:</b> Ultrasonic sensor reading displayed using block-based code</sub></div>
  </div>
</div>

---

## 2.4 Flame Sensor

The flame sensor detects the presence of fire or flame by sensing the infrared light emitted from flames. It outputs a digital or analog signal indicating whether a flame is detected.

**Example Applications:**
- Fire detection in safety systems  
- Flame monitoring in industrial burners  
- Automatic fire alarms  

### 2.4.1 Example Code for the Flame Sensor

<div style="display: flex; align-items: flex-start; justify-content: space-between;">
  <div style="flex: 1;">
    <ul>
      <li>Start by connecting the flame sensor to one of the available single-pin ports using the provided Type-C cable.</li>
      <li>Choose the corresponding pin on the controller to which the flame sensor is connected, for example, <code>P0</code>, <code>P1</code>, or <code>P2</code>.</li>
      <li>Drag a <code>ScreenDisplay</code> block to your workspace first.</li>
      <li>Next, drag the <code>READ</code> function block from the code blocks section and insert it inside the <code>ScreenDisplay</code> block.</li>
      <li>From the dropdown menu in the <code>READ</code> block:
        <ul>
          <li>Select <b>flame</b> as the sensor type.</li>
          <li>Select the corresponding pin connected to your flame sensor (e.g., <code>P0</code>).</li>
        </ul>
      </li>
      <li>This setup will:
        <ul>
          <li>Continuously monitor the presence of a flame.</li>
          <li>Display a digital output indicating flame detection in real-time on the screen.</li>
        </ul>
      </li>
    </ul>
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="/content/manual//images/17.png" width="500"/>
    <div><sub><b>Figure 2.4.1a:</b> Flame sensor reading displayed using block-based code</sub></div>
  </div>
</div>

---

## 2.5 Button

A button is a digital input device that detects when it is pressed. It is commonly used to start or stop processes in a project.

**Example Applications:**
- Robot mode selector
- Manual control triggers
- Game controllers

### 2.5.1 Example Code for the Button

 This particular button typically outputs HIGH (1) when not pressed and LOW (0) when pressed. To detect a button press, we can use a NOT logic block to reverse the signal.

<div style="display: flex; align-items: flex-start; justify-content: space-between;"> 
  <div style="flex: 1;">
    <ul>
      <li>Start by connecting the button module to one of the available single-pin ports using the provided Type-C cable.</li>
      <li>Choose the corresponding pin on the controller to which the button is connected, for example, <code>P0</code>, <code>P1</code>, or <code>P2</code>.</li>
      <li>Drag an <code>if</code> condition block to your workspace to handle logic when the button is pressed.</li>
      <li>From the logic section, drag a <code>NOT</code> operator block and place it inside the <code>if</code> condition block.</li>
      <li>Drag the <code>READ</code> function block and place it inside the <code>NOT</code> block.</li>
      <li>From the dropdown in the <code>READ</code> block:
        <ul>
          <li>Select <b>button</b> as the sensor type.</li>
          <li>Select the pin connected to your button (e.g., <code>P0</code>).</li>
        </ul>
      </li>
      <li>Inside the <code>if</code> block:
        <ul>
          <li>Drag a block to <b>turn on the blue LED</b>.</li>
          <li>Then drag a <code>ScreenDisplay</code> block and use it to print the word <b>"Pressed"</b> on the screen.</li>
        </ul>
      </li>
      <li><b>Explanation:</b>
        <ul>
          <li>The button outputs <code>1</code> when not pressed and <code>0</code> when pressed.</li>
          <li>The <code>NOT</code> operator inverts the signal so that the <code>if</code> condition is <b>true</b> when the button is actually pressed.</li>
        </ul>
      </li>
    </ul>
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="/content/manual//images/18.png" width="500"/>
    <div><sub><b>Figure 2.5.1a:</b> Button press detection and LED activation using block-based logic with NOT operator</sub></div>
  </div>
</div>


---

## 2.6 RFID Reader

The RFID reader scans cards or tags and retrieves their UID (unique identifier). This is useful for object or person identification.

**Example Applications:**
- Attendance systems
- Electronic door locks
- Inventory and asset tracking

### 2.6.1 Example Code for the RFID Reader

The example code for the RFID reader checks if a new card is present and then verifies whether the detected card matches a specific UID. If the UID matches, it triggers a set of actions, such as displaying a message or activating a device. The RFID reader used here is embedded directly into the SheenBot PCB, and users can tap their RFID card on the spot highlighted in the image below for the system to detect and respond accordingly.


<div style="display: flex; align-items: flex-start; justify-content: space-between;">
  <div style="flex: 1; padding-right: 20px;">
    <ul>
      <li>Inside the <code>forever</code> loop, drag a block to <b>turn on the red LED</b> to show that the door is locked.</li>
      <li>Display the message <b>"Door Locked"</b> on the OLED screen.</li>
      <li>Insert an <code>if</code> block, then drag the <code>Look for new card</code> block into its condition slot.</li>
      <li>Drag another <code>if</code> block inside, and place the <code>Card UID is</code> block into its condition slot. Enter your card’s UID (e.g., <code>2a7fe2d6</code>).</li>
      <li>Inside this second <code>if</code> block:
        <ul>
          <li>Turn on the <b>green LED</b> to indicate door unlocked.</li>
          <li>Display <b>"Door Unlocked"</b> on the OLED.</li>
          <li>Use the <b>TTS Module</b> to speak <code>"Door Unlocked"</code>.</li>
          <li>Wait for 4 seconds.</li>
          <li>Turn the <b>red LED</b> back on to lock the door.</li>
          <li>Update OLED to display <b>"Door Locked"</b>.</li>
          <li>Use TTS Module again to speak <code>"Door Locked"</code>.</li>
        </ul>
      </li>
    </ul>
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="/content/manual//images/19.png" width="500"/>
    <div><sub><b>Figure 2.6.1a:</b> RFID door lock logic in Mind+</sub></div>
    <br/>
    <img src="/content/manual//images/21.png" width="500"/>
    <div><sub><b>Figure 2.6.1b:</b> Location of RFID reader on Sheenbot PCB (Tap your card here)</sub></div>
  </div>
</div>



---

## 2.7 Touch Keys

Touch keys are capacitive touch sensors that detect the presence of a finger. They function like digital buttons without any mechanical movement. The IR remote included with the kit sends unique hexadecimal codes for each button, which can be mapped and used to trigger specific actions in your program.

### IR Remote Key Mapping

| Key | Code     | Key | Code     | Key | Code     |
|-----|----------|-----|----------|-----|----------|
| A   | 0xFFA25D | B   | 0xFF629D | C   | 0xFFE21D |
| D   | 0xFF22DD | ^   | 0xFF02FD | E   | 0xFFC23D |
| <   | 0xFFE01F | ⚙   | 0xFFA857 | >   | 0xFF906F |
| 0   | 0xFF6897 | v   | 0xFF9867 | F   | 0xFFB04F |
| 1   | 0xFF30CF | 2   | 0xFF18E7 | 3   | 0xFF7A85 |
| 4   | 0xFF10EF | 5   | 0xFF38C7 | 6   | 0xFF5AA5 |
| 7   | 0xFF42BD | 8   | 0xFF4AB5 | 9   | 0xFF52AD |

### Example Applications
- Touch-sensitive control panels
- DIY electronic piano
- Interactive exhibits


### 2.7.1 Example Code for the Touch Keys

This example demonstrates how an IR remote can be used to control LEDs and trigger responses such as changing colors, displaying messages, and playing sounds. Each IR button sends a specific signal that is read through an IR receiver connected to pin P15. Depending on the signal received, the system performs a corresponding action.


<div style="display: flex; align-items: flex-start; justify-content: space-between;">
  <div style="flex: 1; padding-right: 20px;">
    <ul>
      <li>Start by attaching an IR receiver to any of the pins.</li>
       <li>Attach the external Piranha LED to any of the available pins.</li>
      <li>Set the chosen pin to <code>LOW</code> initially to prevent the LED from turning on before a button is pressed.</li>
     <li>Inside the <code>forever</code> loop, the program continuously reads IR values from pin <code>P15</code>.</li>
      <li>If the <b>A button</b> (value <code>FFA25D</code>) is pressed:
        <ul>
          <li>All LEDs are turned off.</li>
          <li><b>Lamp 0</b> is set to <b>red</b>.</li>
          <li>The screen displays <code>Button A</code>.</li>
          <li>A ringtone <code>ring_1</code> is played using the TTS Module.</li>
        </ul>
      </li>
      <li>If the <b>B button</b> (value <code>FF629D</code>) is pressed:
        <ul>
          <li>All LEDs are turned off.</li>
          <li>An external LED on <code>P16</code> is set to <b>HIGH</b>.</li>
          <li>The screen displays <code>Button B</code>.</li>
          <li>The TTS Module speaks <code>"Light on"</code>.</li>
        </ul>
      </li>
      <li>If the <b>C button</b> (value <code>FFE21D</code>) is pressed:
        <ul>
          <li>All LEDs are turned off.</li>
          <li><b>Lamp 2</b> is set to <b>green</b>.</li>
          <li>The screen displays <code>Button C</code>.</li>
          <li>A different ringtone <code>ring_3</code> is played.</li>
        </ul>
      </li>
      <li>If the <b>D button</b> (value <code>FF22DD</code>) is pressed:
        <ul>
          <li>All LEDs are turned off.</li>
          <li>An external LED on <code>P16</code> is set to <b>LOW</b>.</li>
          <li>The screen displays <code>Button D</code>.</li>
          <li>The TTS Module speaks <code>"Light off"</code>.</li>
        </ul>
      </li>
    </ul>
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="/content/manual//images/20.png" width="500"/>
    <div><sub><b>Figure 2.6.2a:</b> IR Remote control logic in Mind+</sub></div>
    <br/>
    <img src="/content/manual//images/22.png" width="500"/>
    <div><sub><b>Figure 2.6.2b:</b> IR Remote control logic in Mind</sub></div>
  </div>
</div>


---

## 2.8 Text-to-Speech Module

This module converts text into spoken voice. It’s used to give audible feedback or instructions from the robot or system.

**Example Applications:**
- Speaking robots
- Navigation aids for visually impaired users
- Interactive educational tools

### 2.8.1 Example Code for the Text-to-Speech Module

[Insert text-to-speech module block-based code here]

---

## 2.9 Gyroscope

The gyroscope detects the orientation and tilt of the robot. It identifies movements like forward, backward, or sideways tilts.

**Example Applications:**
- Motion-based controls
- Self-balancing robots
- Gesture-controlled systems

### 2.9.1 Example Code for the Gyroscope

[Insert gyroscope block-based code here]

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
