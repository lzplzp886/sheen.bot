// src/app/(normal)/solutions/lab-sourcing/components/HeroSection.tsx

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section id="top" className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-darklight text-background">
      <div className="absolute inset-0 bg-[url('/images/solutions/stem-lab.webp')] bg-cover bg-center mix-blend-multiply opacity-70" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center space-y-6 px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold">Robotics Lab Sourcing</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          One-stop solution for&nbsp;
          <span className="text-highlight font-semibold">Robotics Kits</span>,&nbsp;
          <span className="text-highlight font-semibold">Lab Equipments</span>&nbsp;&amp;&nbsp;
          <span className="text-highlight font-semibold">Teacher Training</span>.
        </p>
        <Link href="#kits" className="inline-block bg-background text-primary font-semibold px-6 py-3 rounded hover:bg-secondary hover:text-background transition">
          Explore Products ↓
        </Link>
      </motion.div>
    </section>
  );
}
