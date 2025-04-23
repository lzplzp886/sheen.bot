"use client";
import React from "react";
import Image from "next/image";

export default function ProductPCBLayoutSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
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
          <p className="text-body mb-4">
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
          <p className="text-body mb-4">
            Take it to the next level with advanced programming, AI camera module, Mecanum-wheel omnidirectional motors, voice control, and more. Suitable for ambitious projects.
          </p>
        </div>
      </div>
    </section>
  );
}
