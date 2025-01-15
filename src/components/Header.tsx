'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import getCurrentUser from '@/lib/getCurrentUser';

export default function Header() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (user && user.cognitoUser) {
          setUsername(user.cognitoUser.username);
        }
      })
      .catch(() => {
        setUsername(null);
      });
  }, []);

  return (
    <header style={{ padding: '10px', backgroundColor: '#f1f1f1' }}>
      <h1>Sheen.bot</h1>
      <nav>
        <ul style={{ display: 'flex', gap: '10px', listStyle: 'none' }}>
          <li>
            <Link href="/">Home</Link>
          </li>
          {!username && (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
          {username && (
            <li style={{ fontWeight: 'bold' }}>
              Welcome, {username}!
            </li>
          )}
          <li>
            <Link href="/registration">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
