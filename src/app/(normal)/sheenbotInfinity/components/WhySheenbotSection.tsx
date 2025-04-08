"use client";
import React from "react";
import Image from "next/image";

export default function WhySheenbotSection() {
  return (
    <section className="bg-extralight py-10 text-center">
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
        <p className="text-center text-body max-w-2xl mx-auto mb-10">
          From simple block assembly to complex scenes, sheenbot∞ brings ideas to life. It is the first AI board designed especially for kids!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Block 1 */}
          <div className="group flex flex-col items-center text-center p-5 bg-background rounded-lg shadow hover:shadow-md transition hover:bg-primary">
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
            <p className="text-body group-hover:text-background">
              Break free from computer dependency with mobile block-based coding, perfectly suited for dynamic classroom and outdoor coding sessions.
            </p>
          </div>

          {/* Block 2 */}
          <div className="group flex flex-col items-center text-center p-5 bg-background rounded-lg shadow hover:shadow-md transition hover:bg-primary">
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
            <p className="text-body group-hover:text-background">
              Eliminate wasted time by removing the hassle of searching for ports, misaligned connectors, or damaged cables during lessons.
            </p>
          </div>

          {/* Block 3 */}
          <div className="group flex flex-col items-center text-center p-5 bg-background rounded-lg shadow hover:shadow-md transition hover:bg-primary">
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
            <p className="text-body group-hover:text-background">
              Integrates a high-performance microphone, RGB lights, accelerometer, gyroscope, voice synthesis and recognition, plus RFID reader for young learners.
            </p>
          </div>

          {/* Block 4 */}
          <div className="group flex flex-col items-center text-center p-5 bg-background rounded-lg shadow hover:shadow-md transition hover:bg-primary">
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
            <p className="text-body group-hover:text-background">
              Features seamless AI (LLM) integration for interactive education and IoT connectivity via MQTT for sensor data collection and remote control.
            </p>
          </div>

          {/* Block 5 */}
          <div className="group flex flex-col items-center text-center p-5 bg-background rounded-lg shadow hover:shadow-md transition hover:bg-primary">
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
            <p className="text-body group-hover:text-background">
              Operate seamlessly without connecting to power, thanks to the robust built-in 1100mAh battery that ensures prolonged use in diverse environments.
            </p>
          </div>

          {/* Block 6 */}
          <div className="group flex flex-col items-center text-center p-5 bg-background rounded-lg shadow hover:shadow-md transition hover:bg-primary">
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
            <p className="text-body group-hover:text-background">
              One board lasts many years with various kit upgrades that grow with users, significantly reducing costs for schools and families.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
