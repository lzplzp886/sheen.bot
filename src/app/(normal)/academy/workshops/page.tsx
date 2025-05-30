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
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Coding & Robotics Holiday Workshop</h1>
            <p className="text-base sm:text-lg max-w-xl mb-6">Bring STEM magic to the school holidays! Hands-on coding & robotics fun for ages 10+ at just <span className="font-semibold">R450/workshop</span>.</p>
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
          <h3 className="text-xl font-semibold mb-4">What your learners will experience:</h3>
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

        {/* Session Duration Pill */}
        <div className="inline-block bg-secondary/20 text-secondary font-medium px-4 py-2 rounded-full">Session Duration: 1 – 2 hours per session</div>
      </section>

      {/* ───── Workshop Details ───── */}
      <section id="workshop-details" className="bg-accent/10 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-8 text-center md:text-left">Workshop Structure:</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: '/images/academy/Workshops/Day-1.svg',
                title: 'Smart Car Theory',
                subtitle: 'Day 1',
                desc: 'Unplugged coding & beginner robotics!',
              },
              {
                icon: '/images/academy/Workshops/Day-2.svg',
                title: 'Control System',
                subtitle: 'Day 2',
                desc: 'Block-based coding & robotics with sensors!',
              },
              {
                icon: '/images/academy/Workshops/Day-3.svg',
                title: 'Soldering & Presentation',
                subtitle: 'Day 3',
                desc: 'Micro:bit coding & advanced robotics!',
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
    </main>
  );
}