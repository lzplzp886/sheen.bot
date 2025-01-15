'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js';
import userPool from '@/lib/cognitoClient'; // Adjust to your actual path

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter username and password.');
      return;
    }

    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (session) => {
        console.log('Login successful! Session:', session);

        // Retrieve custom:role from user attributes
        cognitoUser.getUserAttributes((attrErr, attributes) => {
          if (attrErr || !attributes) {
            console.error('Failed to retrieve user attributes:', attrErr);
            // Fallback if attributes can't be loaded
            router.push('/student');
            return;
          }

          let userRole = 'student'; // default role
          for (const attr of attributes) {
            if (attr.getName() === 'custom:role') {
              userRole = attr.getValue();
              break;
            }
          }

          switch (userRole) {
            case 'teacher':
              router.push('/teacher');
              break;
            case 'admin':
              router.push('/admin');
              break;
            default: // includes 'student' or anything else
              router.push('/student');
              break;
          }
        });
      },
      onFailure: (err) => {
        console.error('Login error:', err);
        setError(err.message || 'Login failed. Please check your credentials.');
      },
    });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Login to Sheen.bot</h1>
      <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: 'auto' }}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" style={{ marginRight: '10px' }}>
          Login
        </button>
        <button type="button" onClick={() => router.push('/registration')}>
          Register
        </button>
      </form>
    </div>
  );
}
