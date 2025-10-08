// src/app/(normal)/academy/trial/page.tsx
import React from 'react';

export const metadata = {
  title: 'Book a Trial Class | sheen academy',
  description: 'Schedule your free trial coding and robotics class at Sheen Academy',
};

export default function TrialPage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="https://outlook.office.com/book/Bookings@sheen.co.za/s/rSTzmb6PgEyLGJjnqjeoGQ2?ismsaljsauthenabled"
        className="w-full h-full border-0 overflow-auto"
        title="Book a Trial Class | sheen academy"
      />
    </div>
  );
}
