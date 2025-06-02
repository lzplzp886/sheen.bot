// src/app/(normal)/academy/components/HeroSection.tsx

'use client';

import React, { useState, useEffect, useRef, TouchEvent, MouseEvent } from 'react';
import Link from 'next/link';

interface Slide {
  bg: string;
  heading: string;
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

const slides: Slide[] = [
  {
    bg: "/images/academy/Banner/Sheen_Academy_Slider.webp",
    heading: "Coding & Robotics Class",
    description: "For ages 6-15 only R280/lesson",
    primary: { label: "Our Courses", href: "/academy/courses" },
    secondary: { label: "Book a Trial →", href: "/academy/trial" },
  },
  {
    bg: "/images/academy/Banner/Holiday_Workshop_Slider.webp",
    heading: "Holiday Workshop",
    description: "Festive coding & robotics workshops — ages 9+, R750 per workshop",
    primary: { label: "Learn More", href: "/academy/workshops" },
    secondary: { label: "Book Now →", href: "/academy/workshops/register" },
  },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startX = useRef<number | null>(null);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  /* ────────────────  Autoplay every 6 s ──────────────── */
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(next, 6000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [index]);

  /* ────────────────  Swipe / drag handlers ──────────────── */
  const onStart = (x: number) => {
    startX.current = x;
  };
  const onEnd = (x: number) => {
    if (startX.current === null) return;
    const diff = x - startX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        prev();
      } else {
        next();
      }
    }
    startX.current = null;
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => onStart(e.touches[0].clientX);
  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => onEnd(e.changedTouches[0].clientX);
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => onStart(e.clientX);
  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => onEnd(e.clientX);

  return (
    <section
      className="relative overflow-hidden text-background"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Slides Wrapper */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="min-w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.bg}')` }}
          >
            <div>
              <div className="max-w-6xl mx-auto px-4 py-20">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 whitespace-pre-line">
                  {slide.heading}
                </h1>
                <p className="text-base sm:text-lg max-w-xl mb-6 whitespace-pre-line">
                  {slide.description}
                </p>
                <div className="space-x-4">
                  <Link href={slide.primary.href}>
                    <button className="inline-block bg-primary text-background font-bold px-5 py-3 rounded shadow hover:bg-secondary">
                      {slide.primary.label}
                    </button>
                  </Link>
                  <Link href={slide.secondary.href}>
                    <button className="inline-block text-background font-bold px-5 py-3 rounded transition-colors duration-300 hover:bg-transparent hover:underline">
                      {slide.secondary.label}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows (desktop only) */}
      <button
        onClick={prev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-primary rounded-full p-2 hover:bg-primary hover:text-white"
      >
        &larr;
      </button>
      <button
        onClick={next}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-primary rounded-full p-2 hover:bg-primary hover:text-white"
      >
        &rarr;
      </button>
    </section>
  );
}