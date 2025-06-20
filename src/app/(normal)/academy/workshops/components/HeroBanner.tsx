// src/app/(normal)/academy/workshops/components/HeroBanner.tsx

'use client';
import React from 'react';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative bg-[url('/images/academy/Banner/Holiday_Workshop_Slider.webp')] bg-cover bg-center text-background">
      <div className="backdrop-brightness-[.45] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Sheen Academy Holiday Workshop
          </h1>
          <p className="text-base sm:text-lg max-w-xl mb-6">
            Bring STEM magic to the school holidays! Hands-on coding & robotics
            fun.
          </p>
          <div className="space-x-4">
            <Link href="#workshop-details">
              <button className="inline-block bg-primary text-background font-bold px-5 py-3 rounded shadow hover:bg-secondary">
                Details
              </button>
            </Link>
            <Link href="/academy/workshops/register">
              <button className="inline-block text-background font-bold px-5 py-3 rounded transition-colors duration-300 hover:bg-transparent hover:underline">
                Register&nbsp;→
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
