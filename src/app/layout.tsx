import '@/app/globals.css'
import React from 'react';
import { UserProvider } from '@/context/UserContext';

export default function normalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}