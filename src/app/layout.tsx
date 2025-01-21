import './globals.css';
import React from 'react';
import { UserProvider } from '@/context/UserContext';  // <--- import your context provider
import Header from '@/components/Header';              // <--- client-based header
import Footer from '@/components/Footer';
import { Open_Sans } from 'next/font/google'; // Import Open Sans

const openSans = Open_Sans({
  subsets: ['latin'], // Ensure proper character subset
  weight: ['400', '500', '600', '700'], // Add desired weights
  display: 'swap', // Improves loading behavior
});

export const metadata = {
  title: 'sheen.bot',
  description: 'a smarter way to learn coding & robotics',
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
    <html lang="en" className={openSans.className}>
      <body>
        {/* Wrap the entire app in UserProvider */}
        <UserProvider>
          {/* Render a client-based header that can read the global user state */}
          <Header />

          <main style={{ minHeight: '80vh' }}>
            {children}
          </main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
