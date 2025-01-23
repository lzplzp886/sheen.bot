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
import ResetPassword from './login_ResetPassword';
import Button from '@/components/UI/Button';

export default function LoginPage() {
  const router = useRouter();
  const { setUsername } = useUser();
  const [showReset, setShowReset] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false); // Prevent users from trying click button too many times

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!userInput || !pass) {
      setError('Please enter username (or email) and password.');
      return;
    }

    setIsProcessing(true);

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
          
          setIsProcessing(false);
          
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
        setIsProcessing(false);
        setError(authErr.message || 'Login failed. Please try again.');
      },
    });
  };

  return (
    <div className="p-5 text-center">
      {!showReset ? (
        <>
          <h1>Account Login</h1>
          <form onSubmit={handleLogin} className="max-w-md mx-auto text-left">
            <div className="mb-3">
              <label>Username or Email:</label>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="input-style"
              />
            </div>
            <div className="mb-3">
              <label>Password:</label>
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="input-style"
              />
            </div>
            {error && <p className="text-error mb-3">
              {error}
            </p>}
            <div className="space-x-2 inline-block">
              
              <Button 
                type="submit" 
                className="btn"
                isLoading={isProcessing}
                loadingText="Logging in..."
                >
                Log In
              </Button>
              
              <button type="button" onClick={() => setShowReset(true)}>
                Forgot password?
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h1>Reset Password</h1>
          <ResetPassword onResetComplete={() => setShowReset(false)} />
        </>
      )}
    </div>
  )
}