// src/app/(normal)/academy/workshops/register/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function WorkshopRegisterLanding() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-background text-body">
      <div className="text-center p-5">
        <h1 className="text-2xl font-bold mb-4">
          Workshop Registration
        </h1>

        <p className="mb-6">
          Secure your seat for our hands-on holiday workshop. The form takes
          only a couple of minutes to complete.
        </p>

        <Link
          href="/academy/workshops/register/step2"
        >
          <button className="btn">Start Registration</button>
        </Link>
      </div>
    </section>
  );
}