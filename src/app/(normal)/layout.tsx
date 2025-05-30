// src/app/(normal)/layout.tsx

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'sheen.bot | a smarter way to learn coding & robotics',
  description: 'sheen.bot is built on AWS to deliver a secure, scalable environment where students can learn coding and robotics efficiently. The platform integrates robotics kits with cloud services to enable remote coding and intuitive device control.',
  keywords: 'coding, robotics, kids learning, STEM education, cloud robotics, cloud coding, home school',
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function NormalLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en" className="text-body font-sans select-none">
      <body className="h-screen flex flex-col">
          <Header />
            <main className="flex-grow p-0 relative">
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}