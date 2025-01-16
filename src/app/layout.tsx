import './globals.css';
import React from 'react';
import { UserProvider } from '@/context/UserContext';  // <--- import your context provider
import Header from '@/components/Header';              // <--- client-based header

export const metadata = {
  title: 'Sheen.bot',
  description: 'A smarter way to learn coding & robotics',
};

/**
 * RootLayout is a server component by default (no "use client" at the top).
 * We can safely export `metadata` here.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the entire app in UserProvider */}
        <UserProvider>
          {/* Render a client-based header that can read the global user state */}
          <Header />

          <main style={{ minHeight: '80vh' }}>
            {children}
          </main>

          <footer style={{ textAlign: 'center', padding: '20px' }}>
            © Sheen.bot 2025
          </footer>
        </UserProvider>
      </body>
    </html>
  );
}
