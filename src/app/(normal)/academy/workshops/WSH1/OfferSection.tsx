// src/app/(normal)/academy/workshops/components/OfferSection.tsx
'use client';
import React from 'react';

export default function OfferSection() {
  const weeks = [
    { week: 'Week 1', date: '1-3 July 2025' },
    { week: 'Week 2', date: '8-10 July 2025' },
    { week: 'Week 3', date: '15-17 July 2025' },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-accent/10 to-background">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-6">
          <h4 className="text-xl font-semibold">
            Pick one of the following weeks
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {weeks.map((w) => (
              <div
                key={w.week}
                className="bg-primary text-background rounded-lg py-4 px-2 shadow-md"
              >
                <p className="font-bold text-lg">{w.week}</p>
                <p className="text-sm">{w.date}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 font-medium">Time: 10:00 AM − 1:30 PM</p>
        </div>

        <div className="text-center space-y-3">
          <h4 className="font-semibold">Secure Your Spot in Just Few Clicks!</h4>
          <p>
            Visit our{' '}
            <a href="/academy/workshops/register?id=WSH1" className="underline">
              registration
            </a>{' '}
            page.
          </p>
          <p>
            Email:{' '}
            <a href="mailto:academy@sheen.co.za" className="underline">
              academy@sheen.co.za
            </a>{' '}
            − We will send you the form!
          </p>
        </div>
      </div>
    </section>
  );
}
