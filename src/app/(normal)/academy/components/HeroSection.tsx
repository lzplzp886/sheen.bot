// src/app/(normal)/academy/components/HeroSection.tsx

'use client';

import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-[url('/images/academy/Sheen_Academy_Slider.webp')] bg-cover bg-center text-background">
      <div className="max-w-6xl mx-auto px-4 py-20 text-background">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Coding & Robotics Class</h1>
        <p className="text-base sm:text-lg max-w-xl mb-6">
          For ages 6 and above — from R280/lesson
        </p>
        <div className="space-x-4">
          <Link href="/academy/courses">
            <button className="inline-block bg-primary text-background font-bold px-5 py-3 rounded shadow hover:bg-secondary">
              Our Courses
            </button>
          </Link>
          <Link href="https://outlook.office365.com/book/bookings@sheen.co.za/s/pn4V6HNV7E-ajbG5wbfAzw2">
            <button className="inline-block text-background font-bold px-5 py-3 rounded transition-colors duration-300 hover:bg-transparent hover:underline">
              Book a Trial →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
