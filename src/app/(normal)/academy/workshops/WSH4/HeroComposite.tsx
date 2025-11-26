// src/app/(normal)/academy/workshops/WSH4/HeroComposite.tsx

'use client';
import React from 'react';
import Image from 'next/image';

export default function HeroComposite() {
  return (
    <section
      id="workshop-details"
      className="relative overflow-hidden bg-[url('/images/academy/Banner/Holiday_Workshop_BG3.webp')] bg-cover bg-center text-background"
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
              December Holiday Clubs
            </span>
            <span className="block text-xl font-medium mt-4 bg-white/10 p-2 rounded-lg inline-block backdrop-blur-md">
              📅 9 - 11 December 2025
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
                src="/images/academy/Banner/Holiday_Workshop_Slider_Kids_SmartCity.webp"
                alt="Kids Coding and Robotics"
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
            <span className="text-sm font-medium block">From</span>
            R600
            <span className="block text-sm font-medium">
                3 Day Club
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
            <span className="block italic">Ages</span>
            <span className="block text-2xl text-red-600 font-extrabold">6 - 18</span>
            </div>
        </div>
      </div>

      {/* Pills */}
      <div className="relative z-10 flex flex-col items-center gap-2 py-6">
        <div className="bg-secondary/20 text-background font-medium px-4 py-2 rounded-full">
          📌 Location: Unit C4, Century Square, Heron Cres, Century City
        </div>
        <div className="bg-secondary/20 text-background font-medium px-4 py-2 rounded-full">
           ⌛ Morning (10:00-12:00) OR Afternoon (14:00-17:00) Sessions
        </div>
      </div>
    </section>
  );
}