'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import userPool from '@/lib/cognitoClient';
import { useUser } from '@/context/UserContext';

export default function LoginPage() {
  const router = useRouter();
  const { setUsername } = useUser();

  const [userInput, setUserInput] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!userInput || !pass) {
      setError('Please enter username (or email) and password.');
      return;
    }

    const authDetails = new AuthenticationDetails({
      Username: userInput,
      Password: pass,
    });

    const cognitoUser = new CognitoUser({
      Username: userInput,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (session) => {
        console.log('Login success!', session);

        // Immediately fetch user attributes so we get a “friendly” username
        cognitoUser.getUserAttributes((attrErr, attrs: CognitoUserAttribute[] | undefined) => {
          if (attrErr || !attrs) {
            // fallback: set whatever cognitoUser.getUsername() returns
            console.warn('No attributes found, using fallback username.');
            setUsername(cognitoUser.getUsername());
            router.push('/'); 
            return;
          }

          // Attempt to find a “preferred_username” or fallback to getUsername()
          let finalName = cognitoUser.getUsername(); 
          for (const a of attrs) {
            if (a.getName() === 'preferred_username') {
              finalName = a.getValue();
              break;
            }
          }

          // Now store finalName in context => the header displays it
          setUsername(finalName);
          router.push('/'); 
        });
      },
      onFailure: (authErr) => {
        console.error('Login error:', authErr);
        setError(authErr.message || 'Login failed. Please try again.');
      },
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: 'auto' }}>
        <div>
          <label>Username or Email:</label>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ marginRight: '10px' }}>
          Log In
        </button>
      </form>
    </div>
  );
}
