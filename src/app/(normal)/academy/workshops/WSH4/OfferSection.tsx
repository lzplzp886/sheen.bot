// src/app/(normal)/academy/workshops/WSH4/OfferSection.tsx

'use client';
import React from 'react';

export default function OfferSection() {
  const weeks = [
    { week: 'December Holiday Club', date: '9 – 11 December 2025' },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-accent/10 to-background">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-6">
          <h4 className="text-xl font-semibold">
            Secure Your Spot in Just Few Clicks!
          </h4>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 max-w-3xl mx-auto">
              {weeks.map((w) => (
                <a
                  key={w.week}
                  href="/academy/workshops/register?id=WSH4"
                  className="block"
                  aria-label={`Register ${w.week}`}
                >
                  <div className="bg-primary text-background rounded-lg py-4 px-2 shadow-md hover:shadow-lg transition-shadow border-2 border-white/20">
                    <p className="font-bold text-2xl">{w.week}</p>
                    <p className="text-lg">{w.date}</p>
                  </div>
                </a>
              ))}
            </div>
          
          <div className="bg-yellow-50 inline-block p-4 rounded-lg border border-yellow-200">
            <p className="font-bold text-secondary">Session Times:</p>
            <p className="mt-1">🌞 Morning (Ages 6-8): 10:00 AM − 12:00 PM</p>
            <p>🌤️ Afternoon (Ages 9+): 14:00 PM − 17:00 PM</p>
          </div>
        </div>

        <div className="text-center space-y-3">
          <h4 className="font-semibold">Want an agent to explain this to you?</h4>
          <p>
            Email:{' '}
            <a href="mailto:academy@sheen.co.za" className="underline">
              academy@sheen.co.za
            </a>{' '}
            − We will send you the form!
          </p>
          <p>
            Or click the WhatsApp button ↘
          </p>
        </div>
        
      </div>
    </section>
  );
}
