'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import getCurrentUser from '@/lib/getCurrentUser'; // or wherever this is located
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

export default function HomePage() {
  const router = useRouter();

  // Track whether we’re still checking the session
  const [loading, setLoading] = useState(true);
  // Track whether the user is already logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Track the user’s role if found
  const [role, setRole] = useState<string | null>(null);

  /*Typewriter text display effect */
  const [headline, setHeadline] = useState('');
  const [subtext, setSubtext] = useState('');
  const headlineText = 'welcome to sheen.bot';
  const subtextText = 'a smarter way to learn coding & robotics';

  useEffect(() => {
    // Attempt to fetch the current user from Cognito
    getCurrentUser()
      .then((user) => {
        if (!user) {
          // No session or error, just let the user see login/register
          setLoading(false);
          return;
        }

        // We do have a user session; now let's fetch the role from the attributes
        user.cognitoUser.getUserAttributes((attrErr: Error | undefined, attrs: CognitoUserAttribute[] | undefined) => {
          if (attrErr || !attrs) {
            // If something goes wrong or no attributes, default to showing login
            setLoading(false);
            return;
          }
          // Attempt to find custom:role
          let userRole = 'student'; // fallback
          for (const attr of attrs) {
            if (attr.getName() === 'custom:role') {
              userRole = attr.getValue();
              break;
            }
          }
          setRole(userRole);
          setIsLoggedIn(true);
          setLoading(false);
        });
      })
      .catch(() => {
        // If an error occurs trying to get session
        setLoading(false);
      });
  }, []);

  // After we finish loading, if the user is logged in, redirect based on role
  useEffect(() => {
    if (!loading && isLoggedIn && role) {
      if (role === 'teacher') {
        router.replace('/teacher');
      } else if (role === 'admin') {
        router.replace('/admin');
      } else {
        router.replace('/student'); // default
      }
    }
  }, [loading, isLoggedIn, role, router]);

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
    <div className="p-5 text-center select-none">
      <h1 className="text-2xl">{headline}</h1>
      <p>{subtext}</p>
      <div className="mt-5 space-x-5 inline-block">
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
