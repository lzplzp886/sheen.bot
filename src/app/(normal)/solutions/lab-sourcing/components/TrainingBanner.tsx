// src/app/(normal)/solutions/lab-sourcing/components/TrainingBanner.tsx

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { training } from "../data";   // ← 直接引用

export default function TrainingBanner() {
  return (
    <motion.section
      id="training"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[60vh] text-background"
    >
      <Image src={training.img} alt="Teacher Training" fill priority className="object-cover object-center select-none" />

      <div className="relative z-10 w-full h-full bg-body/70 flex flex-col items-center justify-center px-4 text-center py-16 space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold">Teacher Training Workshop</h2>

        <p className="max-w-2xl text-base sm:text-lg md:text-xl">{training.desc}</p>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-4xl">
          {training.breakdown.map((b) => (
            <div key={b.item} className="bg-background/20 rounded-lg px-4 py-3 flex flex-col items-center">
              <span className="text-highlight font-semibold whitespace-nowrap">{b.item}</span>
              <span className="text-background font-bold">{b.cost}</span>
            </div>
          ))}
        </div>

        <p className="text-xl sm:text-2xl font-bold">
          Total:&nbsp;<span className="text-primary">{training.priceTotal}</span>
        </p>
      </div>
    </motion.section>
  );
}
