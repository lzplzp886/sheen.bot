// src/app/(normal)/academy/workshops/components/HeroBanner.tsx

'use client';

import React from 'react';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative bg-[url('/images/academy/Banner/Holiday_Workshop_Slider.webp')] bg-cover bg-center text-background">
      <div className="backdrop-brightness-[.45] py-20 px-4">
        <div className="max-w-6xl mx-auto text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Sheen Academy Holiday Workshop
          </h1>

          <p className="text-base sm:text-lg max-w-xl mx-auto sm:mx-0 mb-8">
            Bring STEM magic to the school holidays! Hands-on coding & robotics fun.
          </p>

          {/* buttons – vertical on mobile, horizontal on ≥sm */}
          <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-4">
            <Link href="/academy/workshops/WSH3">
              <button className="bg-primary text-background font-bold px-5 py-3 rounded shadow hover:bg-secondary w-52">
                Spring Holiday Camp (3-DAYS)
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}