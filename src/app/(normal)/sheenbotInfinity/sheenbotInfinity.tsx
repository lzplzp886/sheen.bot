// src/app/sheenbotInfinity/sheenbotInfinity.tsx

"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function SheenbotInfinitySection() {
  return (
    <main className="bg-white text-black">
      
      {/* 核心产品卡片区 */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="flex items-center justify-center gap-2 text-3xl sm:text-4xl font-bold text-center mb-8">
          Introducing <span className="text-primary">sheenbot</span>
          <Image
              src="/images/sheenbotInfinity/icon-infinity.svg"
              alt="Infinity Icon"
              width={32}
              height={32}
          />
        </h2>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10">
          sheenbot∞ is a revolutionary AI-native board that designed for young generations to learn coding and robotics. With industrial-grade stability, multiple programming methods, and dozens of plug-and-play sensors and motors—combined with voice, camera, GPS modules, AI programming platform, and IoT interfaces—it creates endless scenario combinations.
        </p>

        {/* 产品卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Card 1 */}
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
              Perfect for beginners to explore block-based coding and fundamental robotics principles.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/sheenbotInfinity/sheenbot-ai-board-2.png"
              alt="sheenbot∞ Pro"
              width={400}
              height={400}
              className="mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">sheenbot∞ Expansion Board</h3>
            <p className="text-gray-600 mb-4">
              Take it to the next level with advanced programming, AI camera module, voice control, and more. Suitable for ambitious projects.
            </p>
          </div>
        </div>
      </section>

      {/* 优势/功能点 */}
      <section className="bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
            Why <span className="text-primary">sheenbot∞</span>?
          </h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10">
            From simple block assembly to complex scenes, sheenbot∞ brings ideas to life. It is the first AI board designed especially for kids!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition">
              <Image
                src="/images/sheenbotInfinity/icon-stability.svg"
                alt="Industrial-grade stability Icon"
                width={50}
                height={50}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Industrial-grade Stability</h3>
              <p className="text-gray-600">
                Built to last, with robust hardware design for long-term usage and reliable performance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition">
              <Image
                src="/images/sheenbotInfinity/icon-plugplay.svg"
                alt="Plug and Play Icon"
                width={50}
                height={50}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Plug &amp; Play</h3>
              <p className="text-gray-600">
                Dozens of sensors and motors, easily swappable. Expand your projects in seconds.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-5 bg-white rounded-lg shadow hover:shadow-md transition">
              <Image
                src="/images/sheenbotInfinity/icon-ai.svg"
                alt="AI Integration Icon"
                width={50}
                height={50}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">AI &amp; IoT Integration</h3>
              <p className="text-gray-600">
                Leverage voice, camera, GPS modules, and a powerful cloud platform for limitless possibilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Buy Now */}
      <section className="py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Ready to explore <span className="text-primary">sheenbot∞</span>?
        </h2>
        <p className="text-gray-700 mb-8 max-w-lg mx-auto">
          Experience the next generation AI robotics kit for kids and unleash infinite creativity.
        </p>
        <Link href="/products/sheenbot-infinite">
          <button className="px-8 py-3 bg-black text-white font-bold rounded shadow hover:bg-gray-800 transition-colors">
            Buy Now
          </button>
        </Link>
      </section>
    </main>
  );
}
