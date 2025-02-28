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

  return (
    <main className="relative flex flex-col min-h-screen overflow-hidden">
      {/* 背景视频：占满全屏，半透明 */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50 z-[-1]"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/images/home/video.mp4" type="video/mp4" />
        {/* 可以加个备用 source 或提示 */}
        Your browser does not support the video tag.
      </video>

      {/* 内容区：z-10 确保在视频之上 */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-5 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">{headline}</h1>
        <p className="text-xl">{subtext}</p>
      </div>
    </main>
  );
}