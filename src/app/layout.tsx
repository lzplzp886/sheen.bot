import './globals.css';
import React from 'react';
import Link from 'next/link';
import Header from '@/components/header';  // <-- new client header

export const metadata = {
  title: 'Sheen.bot',
  description: 'A smarter way to learn coding & robotics',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Render the client-based header */}
        <Header />

        <main style={{ minHeight: '80vh' }}>
          {children}
        </main>

        <footer style={{ textAlign: 'center', padding: '20px' }}>
          © Sheen.bot 2025
        </footer>
      </body>
    </html>
  );
}
