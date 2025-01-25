import '@/app/globals.css'
import React from 'react';
import { UserProvider } from '@/context/UserContext';
import Header from '@/components/UI/Header';
import Footer from '@/components/UI/Footer';

export const metadata = {
  title: 'sheen.bot | a smarter way to learn coding & robotics',
  description: 'sheen.bot is built on AWS to deliver a secure, scalable environment where students can learn coding and robotics efficiently. The platform integrates robotics kits with cloud services to enable remote coding and intuitive device control.',
  keywords: 'coding, robotics, kids learning, STEM education, cloud robotics, cloud coding, home school',
  icons: {
    icon: '/images/icon.ico',
  },
};

/**
 * RootLayout is a server component by default (no "use client" at the top).
 * We can safely export `metadata` here.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="text-body font-sans select-none">
      <body className="h-screen flex flex-col">
        {/* Wrap the entire app in UserProvider */}
        <UserProvider>
          {/* Render a client-based header that can read the global user state */}
          <Header />
          <main className="flex items-center justify-center flex-grow p-4">
            {children}
          </main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}