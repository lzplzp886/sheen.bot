// src/app/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function HomePage() {
  const router = useRouter();

  // Track whether we’re still checking the session, whether the user is already logged in, the user’s role if found
  const { username, role, loading } = useUser();

  /*Typewriter text display effect */
  const [headline, setHeadline] = useState('');
  const [subtext, setSubtext] = useState('');
  const headlineText = 'welcome to sheen.bot';
  const subtextText = 'a smarter way to learn coding & robotics';

  // If user is already logged in (username != null),
  // we check the role to redirect them to the unified dashboard.
  // Wait until "loading" is false to ensure we've fetched user info.
  useEffect(() => {
    if (!loading && username && role) {
      router.replace('/dashboard');
    }
  }, [loading, username, role, router]);

  /*Typewriter text display effect */
  useEffect(() => {
    let headlineTimer: number | null = null;
    let subtextTimer: number | null = null;
  
    const typewriterEffect = () => {
      let currentHeadline = '';
      let currentSubtext = '';
  
      headlineTimer = window.setInterval(() => {
        currentHeadline = headlineText.slice(0, currentHeadline.length + 1);
        setHeadline(currentHeadline);
  
        if (currentHeadline === headlineText) {
          clearInterval(headlineTimer!);
  
          subtextTimer = window.setInterval(() => {
            currentSubtext = subtextText.slice(0, currentSubtext.length + 1);
            setSubtext(currentSubtext);
  
            if (currentSubtext === subtextText) {
              clearInterval(subtextTimer!);
            }
          }, 50);
        }
      }, 50);
    };

    typewriterEffect();

    return () => {
      if (headlineTimer !== null) clearInterval(headlineTimer);
      if (subtextTimer !== null) clearInterval(subtextTimer);
    };
  }, []);

  // If we're still checking, show a simple loading indicator
  if (loading) {
    return (
      <div className="p-5 text-center">
        <h2 className="text-base font-semibold">Checking session...</h2>
      </div>
    );
  }

  // If not logged in (or error retrieving session),
  // display the normal home page with "Login" / "Register" buttons, and gap between each button is 8px.
  
    return (
    <div className="p-5 text-center">
      <h1 className="text-2xl font-bold mb-4">{headline}</h1>
      <p>{subtext}</p>
      <div className="flex mt-4 mb-4 space-y-4 flex-col items-center justify-center lg:flex lg:flex-row lg:space-x-5 lg:space-y-0 lg:items-center lg:justify-center">
        <button onClick={() => router.push('/login')} className="btn">
          Login
        </button>
        <button onClick={() => router.push('/registration')} className="btn">
          Register
        </button>
      </div>
    </div>    
  );
}