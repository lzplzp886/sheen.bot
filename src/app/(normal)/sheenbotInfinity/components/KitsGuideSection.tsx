// src/app/(normal)/sheenbotInfinity/components/KitsGuideSection.tsx

"use client";
import React from "react";

const guideData = [
  { kit: "∞ block basic", difficulty: "★", scenario: "Entry‑level coding", upgrade: "→ block tinker" },
  { kit: "∞ block tinker", difficulty: "★★", scenario: "Maker clubs & Project‑based learning", upgrade: "→ block pro" },
  { kit: "∞ block pro", difficulty: "★★★", scenario: "Competition prep & deep STEAM learning", upgrade: "—" },
  { kit: "∞ rover", difficulty: "★★", scenario: "Coding rover missions", upgrade: "—" },
  { kit: "∞ smart home", difficulty: "★★", scenario: "IoT & AIoT lessons", upgrade: "—" },
  { kit: "∞ quadruped", difficulty: "★★★", scenario: "Gait experiments with advanced coding", upgrade: "—" },
];

export default function KitsGuideSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        Kits Selection Guide
      </h2>

      <div className="bg-gray-50 border border-primary/20 rounded-lg shadow-md overflow-x-auto">
        {/* 150 | 100 | flex | 160 */}
        <div className="min-w-[620px] grid grid-cols-[150px_100px_minmax(300px,2fr)_minmax(140px,1fr)] text-left">
          {/* Header Row */}
          <div className="px-2 py-3 font-semibold text-primary border-b bg-gray-50 sticky left-0 z-10"></div>
          <div className="px-2 py-3 font-semibold text-primary border-b">Difficulty</div>
          <div className="px-2 py-3 font-semibold text-primary border-b">Primary Scenario</div>
          <div className="px-2 py-3 font-semibold text-primary border-b">Upgrade Path</div>

          {guideData.map((row, idx) => {
            const rowBg = idx % 2 === 1 ? "bg-light" : "bg-extralight";
            return (
              <React.Fragment key={row.kit}>
                {/* Sticky first column with dynamic background */}
                <div className={`px-2 py-3 font-semibold sticky left-0 z-10 border-b ${rowBg}`}>{row.kit}</div>
                <div className={`px-2 py-3 text-center border-b ${rowBg}`}>{row.difficulty}</div>
                <div className={`px-2 py-3 border-b ${rowBg}`}>{row.scenario}</div>
                <div className={`px-2 py-3 border-b ${rowBg}`}>{row.upgrade}</div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
