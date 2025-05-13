'use client';
import React, { ReactNode } from 'react';

export default function SectionContainer({ children }: { children: ReactNode }) {
  return (
    <section className="bg-background/60 dark:bg-neutral-900/70 backdrop-blur
                         rounded-2xl shadow-lg p-6 md:p-10 w-full">
      {children}
    </section>
  );
}
