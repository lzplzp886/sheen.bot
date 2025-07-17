// src/app/(normal)/solutions/lab-sourcing/page.tsx

"use client";

import React from "react";
import { kits, infra } from "./data";

import FloatingNav          from "./components/FloatingNav";
import HeroSection          from "./components/HeroSection";
import ProductGridSection   from "./components/ProductGridSection";
import TrainingBanner       from "./components/TrainingBanner";

export default function RoboticsLabPage() {
  return (
    <main id="top" className="bg-background text-body overflow-x-hidden">
      <HeroSection />
      <FloatingNav />

      {/* 模块化产品区块 */}
      <ProductGridSection id="kits"   title="Robotics Kits"  items={kits}  />
      <ProductGridSection id="infra"  title="Equipments"     items={infra} />

      <TrainingBanner />
    </main>
  );
}