// src/app/(normal)/solutions/lab-sourcing/academy-visit/page.tsx
import React from 'react';

export const metadata = {
  title: 'Book a Visit | sheen academy',
  description: 'Experience the EdTech setups at Sheen Academy',
};

export default function AcademyVisitPage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="https://outlook.office365.com/owa/calendar/bookings@sheen.co.za/bookings/s/hoySxD4egEGxts9qTXExkQ2"
        className="w-full h-full border-0 overflow-auto"
        title="Book a Trial Class | sheen academy"
      />
    </div>
  );
}
