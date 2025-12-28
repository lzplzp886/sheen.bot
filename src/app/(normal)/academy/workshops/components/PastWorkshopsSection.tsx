// src/app/(normal)/academy/workshops/components/PastWorkshopsSection.tsx

'use client';
import React from 'react';
import Link from 'next/link';

const PAST_WORKSHOPS = [
  {
    id: 'WSH4',
    title: 'December Holiday Clubs (2025)',
    summary: 'A comprehensive 3-day club focusing on coding and robotics fundamentals for ages 6-18.',
    link: '/academy/workshops/WSH4',
  },
  {
    id: 'WSH3',
    title: 'Spring Holiday Camp (2025)',
    summary: 'Innovate Smart & Construct Smarter - A 3-day intensive camp for ages 9+.',
    link: '/academy/workshops/WSH3',
  },
  {
    id: 'WSH2',
    title: 'Winter Holiday Camp (2-Days)',
    summary: 'Coding & Robotics Starters Camp designed for ages 8-10.',
    link: '/academy/workshops/WSH2',
  },
  {
    id: 'WSH1',
    title: 'Winter Holiday Camp (3-Days)',
    summary: 'Coding & Robotics Starters Camp designed for ages 9-18.',
    link: '/academy/workshops/WSH1',
  },
];

export default function PastWorkshopsSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 border-t border-light mt-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
        Past Workshops Archive
      </h2>
      <p className="mb-8 text-body opacity-80">
        Explore our previous workshops to see what we offer. 
        Although these sessions have concluded, they provide a great overview of our curriculum and activities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PAST_WORKSHOPS.map((ws) => (
          <div key={ws.id} className="border border-light rounded-lg p-6 hover:shadow-md transition bg-background">
            <h3 className="text-xl font-semibold mb-2">{ws.title}</h3>
            <p className="text-sm text-darklight mb-4">{ws.summary}</p>
            <Link 
              href={ws.link}
              className="text-primary font-medium hover:underline inline-flex items-center"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
