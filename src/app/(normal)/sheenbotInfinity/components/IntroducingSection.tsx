// src/app/(normal)/sheenbotInfinity/components/IntroducingSection.tsx

"use client";
import React from "react";
import Image from "next/image";

export default function IntroducingSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="flex items-center justify-center gap-2 text-3xl sm:text-4xl font-bold text-center mb-8">
        Introducing <span className="text-primary">sheenbot</span>
        <Image
          src="/images/sheenbotInfinity/icon-infinity.svg"
          alt="Infinity Icon"
          width={48}
          height={48}
        />
      </h2>
      <div className="flex flex-col items-center text-center">
        <video
          src="/images/sheenbotInfinity/sheenbot-vertical-45-degree.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="mb-4"
          width={480}
          height={270}
        />
      </div>
      <p className="text-center text-body max-w-2xl mx-auto">
        sheenbot∞ is a revolutionary AI-native board designed for young generations to learn coding and robotics. With industrial-grade stability, multiple programming methods, and dozens of plug-and-play sensors and motors—combined with voice, camera, GPS modules, an AI programming platform, and IoT interfaces—it creates endless scenario combinations.
      </p>
    </section>
  );
}
