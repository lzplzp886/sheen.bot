// src/app/(normal)/sheenbotInfinity/components/WhySheenbotSection.tsx

"use client";
import React from "react";
import Image from "next/image";
import TileExpand from "@/components/tileExpand";

export default function WhySheenbotSection() {
  return (
    <section className="bg-extralight py-10 text-center">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 inline-flex items-center justify-center gap-2 w-full">
          <span>Why</span>
          <span className="text-primary">sheenbot</span>
          <Image
            src="/images/sheenbotInfinity/icon/icon-infinity.svg"
            alt="Infinity Icon"
            width={36}
            height={36}
          />
          <span>?</span>
        </h2>
        <p className="text-center text-body max-w-2xl mx-auto mb-10">
          From simple block assembly to complex scenes, sheenbot∞ brings ideas to life. It is the first AI board designed especially for kids!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TileExpand
            icon="/images/sheenbotInfinity/icon/icon-oneforall.svg"
            alt="One Board, Multiple Kits Icon"
            title="One Board, Multiple Kits"
            description="One board lasts many years with various kit upgrades that grow with users, significantly reducing costs for schools and families."
            videoSrc="/images/sheenbotInfinity/highlights/sheenbot-oneforall.mp4"
          />
          <TileExpand
            icon="/images/sheenbotInfinity/icon/icon-plugplay.svg"
            alt="18 All-Type-C Ports Icon"
            title="18 All-Type-C Ports"
            description="Eliminate wasted time by removing the hassle of searching for ports, misaligned connectors, or damaged cables during lessons."
            videoSrc="/images/sheenbotInfinity/highlights/sheenbot-plugplay.mp4"
          />
          <TileExpand
            icon="/images/sheenbotInfinity/icon/icon-ai.svg"
            alt="AI & IoT Integration Icon"
            title="AI & IoT Integration"
            description="Features seamless AI (LLM) integration for interactive education and IoT connectivity via MQTT for sensor data collection and remote control."
            videoSrc="/images/sheenbotInfinity/sheenbot-vertical-45-degree.mp4"
          />
          <TileExpand
            icon="/images/sheenbotInfinity/icon/icon-puzzle.svg"
            alt="Mobile Coding Icon"
            title="Mobile Coding"
            description="Break free from computer dependency with mobile block-based coding, perfectly suited for dynamic classroom and outdoor coding sessions."
            videoSrc="/images/sheenbotInfinity/sheenbot-vertical-45-degree.mp4"
          />
          <TileExpand
            icon="/images/sheenbotInfinity/icon/icon-integrated.svg"
            alt="Highly Integrated Board Icon"
            title="Highly Integrated Board"
            description="Integrates built-in 1100mAh battery, high-performance microphone, RGB lights, accelerometer, gyroscope, voice synthesis and recognition, plus RFID reader."
            videoSrc="/images/sheenbotInfinity/highlights/sheenbot-integrated.mp4"
          />
          <TileExpand
            icon="/images/sheenbotInfinity/icon/icon-sensors.svg"
            alt="Dozens of Sensors & Actuators Icon"
            title="Dozens of Sensors & Actuators"
            description="Rapidly prototype with 30+ plug-and-play sensors & actuators, unlocking limitless possibilities across robotics, IoT, smart farming and more."
            videoSrc="/images/sheenbotInfinity/highlights/sheenbot-sensors&actuators.mp4"
          />

        </div>
      </div>
    </section>
  );
}
