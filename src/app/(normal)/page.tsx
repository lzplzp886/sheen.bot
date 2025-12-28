// src/app/(normal)/page.tsx

"use client";
import React from "react";
import HeroSection from "./home/components/HeroSection";
import EntryPointsSection from "./home/components/EntryPointSection";
import TimelineSection from "@/app/(normal)/about/components/timeSection";
import AboutPreviewSection from "@/app/(normal)/home/components/AboutPreviewSection";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-background text-body">
      <HeroSection />
      
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          
          {/* Top Row: 4 Entry Points */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <EntryPointsSection />
          </div>

          {/* Middle Row: Our Journey (Full Width) */}
          <div className="border border-primary/10 rounded-2xl shadow-sm bg-background overflow-hidden hover:shadow-lg transition-all duration-300">
             <div className="p-2">
                <TimelineSection />
             </div>
          </div>

          {/* Bottom Row: About Us (Full Width) */}
          <div>
            <AboutPreviewSection />
          </div>

        </div>
      </section>
    </main>
  );
}
