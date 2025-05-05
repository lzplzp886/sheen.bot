// src/app/(normal)/academy/courses/components/trialDetailsSection.tsx
import React from 'react';
import Link from 'next/link';

export default function TrialDetailsSection() {
  const tags = ['👧Ages: 6+', '⏳60 mins', '📚1 Lesson', '💰Free'];

  return (
    <section className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Step 1: Get Free Trial Before Onboarding</h2>
      <div className="border rounded-lg p-4 flex flex-col">
        <h3 className="text-lg font-semibold mb-4">Book In-Person Class at our Century City Campus</h3>
        <div className="flex flex-wrap gap-2 mb-4 text-xs">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
        <ul className="list-disc list-outside ml-6 mb-4 text-sm">
          <li>Enjoy a FREE in-person session to discover your child&apos;s interests.</li>
          <li>Receive comprehensive evaluation after the session.</li>
          <li>Align objectives and expectations with parents for a fulfilling learning experience.</li>
        </ul>
      </div>
      <div className="mt-6 flex flex-col items-center space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
        <Link href="/academy/trial">
          <button className="btn">Book Now</button>
        </Link>
        <Link href="/academy/curriculum">
          <button className="font-bold flex items-center justify-center">
            Our Curriculum →
          </button>
        </Link>
      </div>
    </section>
  );
}