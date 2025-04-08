// src/app/(normal)/academy/courses/page.tsx

'use client';

import React from 'react';

export default function AcademyCoursesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>

      {/* Step 1: Free Trial */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Step 1: Get Free Trial Before Onboarding</h2>
        <p>Enjoy a FREE in-person session to discover your child’s interests.</p>
        <ul className="list-disc ml-6 my-3">
          <li>Ages 6+</li>
          <li>60 mins / 1 Lesson / Free</li>
          <li>Receive comprehensive evaluation after the session.</li>
          <li>Align objectives and expectations with parents for a fulfilling learning experience.</li>
        </ul>
        <button className="bg-primary text-background px-4 py-2 rounded">
          Book Now
        </button>
      </section>

      {/* Step 2: Pricing Table */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Step 2: Check Our Plan & Pricing</h2>
        <p className="mb-4">
          <strong>Limited-Time Offer:</strong> Get your first course (4 lessons) at 50% Off
          for just R1120! Standard pricing of R2240 per course (4 lessons) applies from the
          second month.
        </p>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Class</th>
              <th className="py-2">Cost / lesson</th>
              <th className="py-2">Total # of lessons per course</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Intro Class</td>
              <td className="py-2">R560</td>
              <td className="py-2">12 lessons</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Junior Class</td>
              <td className="py-2">R560</td>
              <td className="py-2">24 lessons</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Explorer Class</td>
              <td className="py-2">R560</td>
              <td className="py-2">48 lessons</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
        <div className="my-2">
          <h3 className="font-medium">What ages are your courses suitable for?</h3>
          <p>Ages 6 and above.</p>
        </div>
        <div className="my-2">
          <h3 className="font-medium">What qualifications do your instructors have?</h3>
          <p>
            We have highly qualified, passionate instructors with backgrounds in Robotics
            and STEM education.
          </p>
        </div>
        {/* ... add more FAQs as needed ... */}
      </section>
    </div>
  );
}
