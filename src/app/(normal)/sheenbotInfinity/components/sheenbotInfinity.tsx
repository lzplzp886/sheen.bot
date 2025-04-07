// src/app/(normal)/sheenbotInfinity/components/sheenbotInfinity.tsx

"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function SheenbotInfinitySection() {
  return (
    <main className="bg-white text-black">
      
      {/* 核心产品卡片区*/}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="flex items-center justify-center gap-2 text-3xl sm:text-4xl font-bold text-center mb-8">
          Introducing <span className="text-primary">sheenbot</span>
          <Image
              src="/images/sheenbotInfinity/icon-infinity.svg"
              alt="Infinity Icon"
              width={36}
              height={36}
          />
        </h2>
          {/* Product Main Photos */}
          <div className="flex flex-col items-center text-center">
            <video
            src="/images/sheenbotInfinity/sheenbot-vertical-45-degree.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="mb-4"
            width={400}
            height={400}
            />
          </div>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10">
          sheenbot∞ is a revolutionary AI-native board that designed for young generations to learn coding and robotics. With industrial-grade stability, multiple programming methods, and dozens of plug-and-play sensors and motors—combined with voice, camera, GPS modules, AI programming platform, and IoT interfaces—it creates endless scenario combinations.
        </p>

        {/* Product PCB Layout Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* AI Board */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/sheenbotInfinity/sheenbot-ai-board.png"
              alt="sheenbot∞ AI Board"
              width={400}
              height={400}
              className="mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">sheenbot∞ AI Board</h3>
            <p className="text-gray-600 mb-4">
              Perfect for beginners to explore block-based coding and fundamental robotics principles with interactive touch buttons and screen.
            </p>
          </div>

          {/* Expansion Board */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/sheenbotInfinity/sheenbot-expansion-board.png"
              alt="sheenbot∞ Expansion Board"
              width={400}
              height={400}
              className="mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">sheenbot∞ Expansion Board</h3>
            <p className="text-gray-600 mb-4">
              Take it to the next level with advanced programming, AI camera module, Mecanum-wheel omnidirectional motors, voice control, and more. Suitable for ambitious projects.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-10 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 inline-flex items-center justify-center gap-2 w-full">
            <span>Why</span>
            <span className="text-primary">sheenbot</span>
            <Image
              src="/images/sheenbotInfinity/icon-infinity.svg"
              alt="Infinity Icon"
              width={36}
              height={36}
            />
            <span>?</span>
          </h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10">
            From simple block assembly to complex scenes, sheenbot∞ brings ideas to life. It is the first AI board designed especially for kids!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Block 1 */}
            <div className="group flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition hover:bg-primary">
              <Image
                src="/images/sheenbotInfinity/icon-puzzle.svg"
                alt="Mobile &amp; Coding Icon"
                width={50}
                height={50}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-background">
                Mobile &amp; Coding
              </h3>
              <p className="text-gray-600 group-hover:text-background">
                Break free from computer dependency with mobile block-based coding, perfectly suited for dynamic classroom and outdoor coding sessions.
              </p>
            </div>

            {/* Block 2 */}
            <div className="group flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition hover:bg-primary">
              <Image
                src="/images/sheenbotInfinity/icon-plugplay.svg"
                alt="18 All-Type-C Ports Icon"
                width={50}
                height={50}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-background">
                18 All-Type-C Ports
              </h3>
              <p className="text-gray-600 group-hover:text-background">
                Eliminate wasted time by removing the hassle of searching for ports, misaligned connectors, or damaged cables during lessons.
              </p>
            </div>

            {/* Block 3 */}
            <div className="group flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition hover:bg-primary">
              <Image
                src="/images/sheenbotInfinity/icon-integrated.svg"
                alt="Highly Integrated Board Icon"
                width={50}
                height={50}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-background">
                Highly Integrated Board
              </h3>
              <p className="text-gray-600 group-hover:text-background">
                Integrates a high-performance microphone, RGB lights, accelerometer, gyroscope, voice synthesis and recognition, plus RFID reader for young learners.
              </p>
            </div>

            {/* Block 4 */}
            <div className="group flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition hover:bg-primary">
              <Image
                src="/images/sheenbotInfinity/icon-ai.svg"
                alt="AI &amp; IoT Integration Icon"
                width={50}
                height={50}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-background">
                AI &amp; IoT Integration
              </h3>
              <p className="text-gray-600 group-hover:text-background">
                Features seamless AI (LLM) integration for interactive education and IoT connectivity via MQTT for sensor data collection and remote control.
              </p>
            </div>

            {/* Block 5 */}
            <div className="group flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition hover:bg-primary">
              <Image
                src="/images/sheenbotInfinity/icon-battery.svg"
                alt="Built-in 1100mAh Battery Icon"
                width={50}
                height={50}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-background">
                Built-in 1100mAh Battery
              </h3>
              <p className="text-gray-600 group-hover:text-background">
                Operate seamlessly without connecting to power, thanks to the robust built-in 1100mAh battery that ensures prolonged use in diverse environments.
              </p>
            </div>

            {/* Block 6 */}
            <div className="group flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition hover:bg-primary">
              <Image
                src="/images/sheenbotInfinity/icon-oneforall.svg"
                alt="One Board, Multiple Kits Icon"
                width={50}
                height={50}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-background">
                One Board, Multiple Kits
              </h3>
              <p className="text-gray-600 group-hover:text-background">
                One board lasts many years with various kit upgrades that grow with users, significantly reducing costs for schools and families.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Buy Now */}
      <section className="py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 inline-flex items-center justify-center gap-2">
          Ready to explore
          <span className="text-primary">sheenbot</span>
          <Image
            src="/images/sheenbotInfinity/icon-infinity.svg"
            alt="Infinity Icon"
            width={36}
            height={36}
            className="inline-block" // 保证图标也在一行
          />
          ?
        </h2>

        <p className="text-gray-700 mb-8 max-w-lg mx-auto">
          Experience the next generation AI robotics kit for kids and unleash infinite creativity.
        </p>
        
        <Link
          href="/sheenbotInfinity/order"
          className="px-8 py-3 bg-black text-background font-bold rounded shadow hover:bg-gray-800 transition-colors inline-block"
        >
          Order Now
        </Link>
      </section>
    </main>
  );
}
