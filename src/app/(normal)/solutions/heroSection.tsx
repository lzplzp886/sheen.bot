// src/app/solutions/heroSection.tsx

"use client";
import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative">
      {/* 背景 */}
      <div
        className="absolute top-0 left-0 w-full h-full -z-10 angled-bg"
        style={{
          backgroundImage: "url('/images/solutions/background.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backgroundBlendMode: "multiply",
        }}
      />
      {/* 内容 */}
      <div className="max-w-6xl mx-auto px-4 py-20 text-white">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Explore sheen.bot</h1>
        <p className="text-base sm:text-lg max-w-xl mb-6">
          Our AI-empowered education platform enables students to learn, create and manage
          embodied intelligence remotely while coding smarter and more efficiently.
        </p>
        <div className="space-x-4">
          <Link href="/login">
            <button className="inline-block border border-black bg-black text-white font-bold px-5 py-3 rounded shadow hover:bg-gray-800 hover:border-gray-800">
              Start For Free
            </button>
          </Link>
          <a
            href="#architecture"
            className="inline-block text-white font-bold px-5 py-3 rounded transition-colors duration-300 hover:bg-transparent hover:underline"
          >
            Learn More →
          </a>
        </div>
      </div>
    </section>
  );
}
