// src/app/(normal)/academy/workshops/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function WorkshopsPage() {
  return (
    <main className="text-body">
      {/* ───── Hero Banner ───── */}
      <section className="relative bg-[url('/images/academy/Banner/Holiday_Workshop_Slider.webp')] bg-cover bg-center text-background">
        <div className="backdrop-brightness-[.45] py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Sheen Academy Holiday Workshop</h1>
            <p className="text-base sm:text-lg max-w-xl mb-6">Bring STEM magic to the school holidays! Hands-on coding & robotics fun.</p>
            <div className="space-x-4">
              <Link href="#workshop-details">
                <button className="inline-block bg-primary text-background font-bold px-5 py-3 rounded shadow hover:bg-secondary">Workshop Details</button>
              </Link>
              <Link href="/academy/workshops/register">
                <button className="inline-block text-background font-bold px-5 py-3 rounded transition-colors duration-300 hover:bg-transparent hover:underline">Register Now →</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Intro Section ───── */}
      <section className="max-w-6xl mx-auto px-4 py-12 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary">Bringing Coding & Robotics to Your Holidays!</h2>
        <p>Looking for an exciting and engaging activity to keep young minds active during the break? Our Holiday Workshop brings technology to life with playful lessons that blend creativity, collaboration and problem‑solving.</p>

        {/* Learner Experience List */}
        <div className="bg-background rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">What your kids will experience:</h3>
          <ul className="space-y-2 list-none">
            {[
              'Fun and Play‑Based Learning: engaging activities that require no prior experience',
              'Developing Computational Thinking: understand the logic behind coding',
              'Boosting Problem‑Solving Skills: tackle challenges through systematic thinking',
              'Collaborative Teamwork: work together to achieve common goals',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-primary mr-2">☀️</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───── Hero Composite (with bg-image, centred “&”, animated ring) ───── */}
      <section
        id="workshop-details" 
        className="relative overflow-hidden bg-[url('/images/academy/Banner/Holiday_Workshop_BG.webp')] bg-cover bg-center text-background"
      >
        {/* optional dark overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0" />

        <div className="relative max-w-6xl mx-auto flex flex-col sm:flex-row items-center py-14 px-4 gap-8 z-10">
          {/* Left — Headings */}
          <div className="w-full sm:w-1/2 text-center sm:text-left">
            <h1 className="font-extrabold leading-tight text-background drop-shadow-md">
              <span className="block text-4xl sm:text-5xl lg:text-6xl">Coding</span>

              {/* centred “&” */}
              <span className="block text-4xl lg:text-[4.5rem] -my-2 text-accent sm:ml-4 sm:inline-block">
                &
              </span>

              <span className="block text-4xl sm:text-5xl lg:text-6xl">Robotics</span>
              <span className="block text-secondary text-3xl sm:text-4xl lg:text-5xl mt-2">
                2025 Winter Holiday Camp
              </span>
            </h1>
          </div>

          {/* Right — Image & Badges */}
          <div className="w-full sm:w-1/2 flex justify-center relative">
            {/* animated gradient ring */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              {/* pulsing ring */}
              <div className="absolute inset-0 rounded-full animate-borderSpin" />

              {/* masked inner circle with photo */}
              <div className="absolute inset-0.5 rounded-full overflow-hidden ring-5 ring-darklight">
                <Image
                  src="/images/academy/Banner/Holiday_Workshop_Slider_Kids.webp"
                  alt="Kid with robot"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Price Badge */}
            <div className="absolute -bottom-4 -left-4 bg-background text-center text-body font-extrabold px-6 py-4 rounded-full shadow-lg border-4 border-red-500 rotate-[8deg] max-w-[180px]">
              R750
              <span className="block text-sm font-medium">per child • 3 Days</span>
            </div>

            {/* Age Badge */}
            <div className="absolute -bottom-6 right-0 bg-background text-center text-body font-semibold px-4 py-3 rounded-full shadow-lg border-4 border-secondary rotate-[-6deg] max-w-[160px]">
              <span className="block italic">Suitable for ages</span>
              <span className="block text-2xl text-red-600 font-extrabold">9+</span>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center gap-2 py-6">
          {/* Workshop Location Pill */}
          <div className="bg-secondary/20 text-background font-medium px-4 py-2 rounded-full">
            📌Location: Sheen Academy, Century City, Cape Town
          </div>

          {/* Workshop Duration Pill */}
          <div className="bg-secondary/20 text-background font-medium px-4 py-2 rounded-full">
            ⌛Duration: 3 hours per day & 3 days per workshop
          </div>
        </div>
      </section>
      
      {/* ───── Workshop Details ───── */}
      <section className="bg-accent/10 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-8 text-center md:text-left">Workshop Structure:</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: '/images/academy/Workshops/Day-1.svg',
                title: 'micro:bit Basics',
                subtitle: 'Day 1',
                desc: 'Discover how pocket-sized tech can talk to each other without any wires!',
              },
              {
                icon: '/images/academy/Workshops/Day-2.svg',
                title: 'LEGO® Challenges',
                subtitle: 'Day 2',
                desc: 'Build and code your own LEGO® robots. Compete in creative robot challenges!',
              },
              {
                icon: '/images/academy/Workshops/Day-3.svg',
                title: 'Soldering & Racing',
                subtitle: 'Day 3',
                desc: 'Assemble and program your own line-following robot. Will your car win the race?',
              },
            ].map((card, idx) => (
              <div key={idx} className="bg-background rounded-2xl shadow-md p-6 text-center flex flex-col items-center">
                <Image src={card.icon} alt={card.title} width={80} height={80} className="mb-4" />
                <h4 className="text-lg font-semibold">
                  {card.title} {card.subtitle && <span className="block text-sm font-medium">({card.subtitle})</span>}
                </h4>
                <p className="mt-2 text-sm whitespace-pre-line">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ───── Detailed Offer Section (Poster‑style) ───── */}
      <section id="workshop-details" className="py-12 bg-gradient-to-b from-accent/10 to-background">
        <div className="max-w-6xl mx-auto px-4 space-y-8">

          {/* Weekly Options */}
          <div className="text-center space-y-6">
            <h4 className="text-xl font-semibold">Pick one of the following weeks</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { week: 'Week 1', date: '01-03 July 2025' },
                { week: 'Week 2', date: '08-10 July 2025' },
                { week: 'Week 3', date: '15-17 July 2025' },
              ].map((w) => (
                <div key={w.week} className="bg-primary text-background rounded-lg py-4 px-2 shadow-md">
                  <p className="font-bold text-lg">{w.week}</p>
                  <p className="text-sm">{w.date}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 font-medium">Time: 10:00 AM - 1:30 PM</p>
          </div>

          {/* Call‑to‑Action */}
          <div className="text-center space-y-3">
            <h4 className="font-semibold">Secure Your Spot in Just Few Clicks!</h4>
            <p>Visit our <a href="/academy/workshops/register" className="underline">registration</a> page or message <span className="font-medium">“Holiday Workshop”</span> on WhatsApp <span className="whitespace-nowrap">065 900 8570</span>.</p>
            <p>Email: <a href="mailto:academy@sheen.co.za" className="underline">academy@sheen.co.za</a> – We’ll send you the form!</p>
          </div>
        </div>
      </section>

    </main>
  );
}