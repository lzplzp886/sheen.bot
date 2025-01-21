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

  // If we're still checking, show a simple loading indicator
  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Checking session...</h2>
      </div>
    );
  }

  // If not logged in (or error retrieving session),
  // display the normal home page with "Login" / "Register" buttons.
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to sheen.bot</h1>
      <p style={{ fontWeight: 400 }}>A smarter way to learn coding & robotics</p>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => router.push('/login')} style={{ marginRight: '10px' }}>
          Login
        </button>
        <button onClick={() => router.push('/registration')}>
          Register
        </button>
      </div>
    </div>
  );
}
