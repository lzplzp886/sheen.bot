// src/app/(normal)/academy/workshops/WSH2/HeroComposite.tsx

'use client';
import React from 'react';
import Image from 'next/image';

export default function HeroComposite() {
  return (
    <section
      id="workshop-details"
      className="relative overflow-hidden bg-[url('/images/academy/Banner/Holiday_Workshop_BG2.webp')] bg-cover bg-center text-background"
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col sm:flex-row items-center py-14 px-4 gap-8">
        {/* Left */}
        <div className="w-full sm:w-1/2 text-center sm:text-left">
          <h1 className="font-extrabold leading-tight drop-shadow-md">
            <span className="block text-4xl sm:text-5xl lg:text-6xl">
              Coding
            </span>
            <span className="block text-4xl lg:text-[4.5rem] -my-2 text-accent sm:ml-4 sm:inline-block">
              &
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl">
              Robotics
            </span>
            <span className="block text-secondary italic text-3xl sm:text-4xl lg:text-5xl mt-2">
              2025 Winter Holiday Camp for Starters (2-Days)
            </span>
          </h1>
        </div>

        {/* Right */}
        <div className="w-full sm:w-1/2 flex justify-center relative">
          {/* pulsing ring */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80">
            <div className="absolute inset-0 rounded-full animate-borderSpin" />
            <div className="absolute inset-0.5 rounded-full overflow-hidden ring-5 ring-darklight">
              <Image
                src="/images/academy/Banner/Holiday_Workshop_Slider_Kids_3D.webp"
                alt="Kid learn 3D Design"
                fill
                className="object-cover"
              />
            </div>
          </div>

            {/* Price Badge */}
            <div
            className="absolute -bottom-4 -left-4
                        bg-background text-body font-extrabold
                        px-6 py-4 rounded-full shadow-lg
                        border-4 border-red-500 rotate-[8deg] max-w-[180px]
                        text-center"
            >
            R600
            <span className="block text-sm font-medium">
                per child • 2&nbsp;Days
            </span>
            </div>

            {/* Age Badge */}
            <div
            className="absolute -bottom-6 right-0
                        bg-background text-body font-semibold
                        px-4 py-3 rounded-full shadow-lg
                        border-4 border-secondary rotate-[-6deg] max-w-[160px]
                        text-center"
            >
            <span className="block italic">Suitable for ages</span>
            <span className="block text-2xl text-red-600 font-extrabold">8~10</span>
            </div>
        </div>
      </div>

      {/* Pills */}
      <div className="relative z-10 flex flex-col items-center gap-2 py-6">
        <div className="bg-secondary/20 text-background font-medium px-4 py-2 rounded-full">
          📌Location: Sheen Academy, Century City, Cape Town
        </div>
        <div className="bg-secondary/20 text-background font-medium px-4 py-2 rounded-full">
          ⌛Duration: 3 hours per day & 2 days per workshop
        </div>
      </div>
    </section>
  );
}
