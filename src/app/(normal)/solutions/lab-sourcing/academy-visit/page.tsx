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
        src="https://outlook.office.com/book/Bookings@sheen.co.za/s/1iVRvGObXUKSPfBvASbIgg2?ismsaljsauthenabled"
        className="w-full h-full border-0 overflow-auto"
        title="Book a Trial Class | sheen academy"
      />
    </div>
  );
}
