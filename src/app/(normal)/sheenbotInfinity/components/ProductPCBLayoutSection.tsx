// src/app/(normal)/sheenbotInfinity/components/ProductPCBLayoutSection.tsx

"use client";
import React from "react";
import Image from "next/image";

export default function ProductPCBLayoutSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 inline-flex items-center justify-center gap-2 w-full">
          <span className="text-primary">Inside sheenbot</span>
          <Image
            src="/images/sheenbotInfinity/icon-infinity.svg"
            alt="Infinity Icon"
            width={36}
            height={36}
          />
        </h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto_1fr] md:items-center">
        {/* AI Board */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/sheenbotInfinity/sheenbot-ai-board.png"
            alt="sheenbot∞ AI Board"
            width={300}
            height={300}
            className="mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">sheenbot∞ AI Board</h3>
          <p className="text-body mb-4">
            Perfect for beginners to explore block-based coding and fundamental robotics principles with interactive touch buttons and OLED screen.
          </p>
        </div>

        {/* Plus Sign */}
        <div className="flex flex-col items-center justify-center text-center md:mb-20">
          <Image
            src="/images/sheenbotInfinity/icon-plus-sign.svg"
            alt="icon-plus-sign"
            width={50}
            height={50}
          />
        </div>

        {/* Expansion Board */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/sheenbotInfinity/sheenbot-expansion-board.png"
            alt="sheenbot∞ Expansion Board"
            width={300}
            height={300}
            className="mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">sheenbot∞ Expansion Board</h3>
          <p className="text-body mb-4">
            To the next level with advanced expansion with Mecanum-wheel omnidirectional motors, voice control, and more. Suitable for ambitious projects.
          </p>
        </div>
      </div>
    </section>
  );
}
