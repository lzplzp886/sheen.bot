'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// Import from amazon-cognito-identity-js for sign-up and confirmation
import {
  CognitoUser,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
// Import your userPool
import userPool from '@/lib/cognitoClient'; 

const geekWords = [
  'Hacker','Ninja','Jedi','Wizard','Ranger','Pirate','Robot','Viking','Mage','Knight',
  'Druid','Paladin','Berserker','Coder','Phantom','Cyborg','Sorcerer','TimeLord','Oracle',
  'Shadow','MechPilot','SpaceCadet','BountyHunter','CyberElf','Dwarf','Elf','Goblin','Troll',
  'Necromancer','Alchemist','Assassin','Scribe','Archivist','Warlock','Engineer','Inventor',
  'Artificer','Sentinel','Guardian','Gladiator','Commando','Pilot','Samurai','Sniper',
  'Mercenary','Scout','Shaman','Monk','Chemist','Spy'
];

export default function RegistrationPage() {
  const router = useRouter();

  // Basic form fields
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [classID, setClassID] = useState('');

  // Track error messages to display on screen
  const [errorMsg, setErrorMsg] = useState('');

  // This indicates we successfully created a Cognito user 
  // and must confirm the code sent to the user.
  const [verificationNeeded, setVerificationNeeded] = useState(false);

  // Store the verification code input
  const [confirmationCode, setConfirmationCode] = useState('');

  /**
   * Generate a random "geeky" username if user wants it auto-filled.
   * Called whenever firstName or lastName changes (onBlur).
   */
  const generateUsername = () => {
    if (!firstName && !lastName) return;
    const randomIndex = Math.floor(Math.random() * geekWords.length);
    const randomGeekWord = geekWords[randomIndex] || 'Coder';
    const baseFirst = firstName || 'Kid';
    const baseLast = lastName || 'Learner';
    const proposedUsername = `${baseFirst}_${baseLast}_${randomGeekWord}`;
    setUsername(proposedUsername);
  };

  /**
   * Handle sign-up to Cognito. 
   * 1) Build attribute list 
   * 2) Call userPool.signUp(...) 
   * 3) If success => set verificationNeeded to true
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Basic client-side checks
    if (!username || !email || !password) {
      setErrorMsg('Please fill in username, email, and password.');
      return;
    }

    // Build attributes for Cognito sign-up
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'custom:role', Value: role }),
      new CognitoUserAttribute({ Name: 'phone_number', Value: phoneNumber }),
      new CognitoUserAttribute({ Name: 'given_name', Value: firstName }),
      new CognitoUserAttribute({ Name: 'family_name', Value: lastName }),
      new CognitoUserAttribute({ Name: 'custom:classID', Value: classID }),
      // more attributes if needed...
    ];

    userPool.signUp(
      username,
      password,
      attributeList,
      [],
      (err, result) => {
        if (err) {
          console.error('Sign up error:', err);
          setErrorMsg(err.message || 'Registration failed.');
          return;
        }

        // success => Cognito user is created, but unconfirmed 
        console.log('SignUp success. CognitoUser:', result?.user);
        // Now prompt user to confirm the code
        setVerificationNeeded(true);
      }
    );
  };

  /**
   * Handle the confirmation code submission. 
   * 1) Build CognitoUser object 
   * 2) Call confirmRegistration(...) 
   * 3) If success => navigate to the correct dashboard 
   */
  const handleConfirmCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username) {
      setErrorMsg('Username is missing. Please go back and sign up again.');
      return;
    }

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    // forceAliasCreation = true => merges old aliases 
    cognitoUser.confirmRegistration(
      confirmationCode,
      true,
      (err: Error | null, result?: string) => {
        if (err) {
          console.error('Verification error:', err);
          setErrorMsg(err.message || 'Verification failed.');
          return;
        }

        console.log('Verification success:', result); // Typically "SUCCESS"
        // After success, the user can now log in or we auto-route them
        router.push(`/${role}`);
      }
    );
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Account Registration</h1>

      {/* 
        1) If verification is NOT yet needed, show the sign-up form.
        2) If user successfully signed up, show the "enter verification code" form.
      */}
      
      {!verificationNeeded && (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', textAlign: 'left' }}>
          {/* ROLE */}
          <div style={{ marginBottom: '10px' }}>
            <label>Role:</label><br />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'student' | 'teacher')}
              style={{ width: '100%' }}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          {/* FIRST NAME */}
          <div style={{ marginBottom: '10px' }}>
            <label>First Name:</label><br />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={generateUsername}
              style={{ width: '100%' }}
            />
          </div>

          {/* LAST NAME */}
          <div style={{ marginBottom: '10px' }}>
            <label>Last Name:</label><br />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={generateUsername}
              style={{ width: '100%' }}
            />
          </div>

          {/* USERNAME */}
          <div style={{ marginBottom: '10px' }}>
            <label>Username (min 6 chars, [0-9a-z-_]):</label><br />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%' }}
              required
            />
            <button type="button" onClick={generateUsername} style={{ marginTop: '5px' }}>
              Suggest Another Username
            </button>
          </div>

          {/* EMAIL */}
          <div style={{ marginBottom: '10px' }}>
            <label>Email (mandatory):</label><br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%' }}
              required
            />
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: '10px' }}>
            <label>Password (mandatory):</label><br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%' }}
              required
            />
          </div>

          {/* PHONE NUMBER */}
          <div style={{ marginBottom: '10px' }}>
            <label>Phone Number (optional):</label><br />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          {/* CLASS ID */}
          <div style={{ marginBottom: '10px' }}>
            <label>Class ID(s) (optional, comma-separated):</label><br />
            <input
              type="text"
              value={classID}
              onChange={(e) => setClassID(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          {/* ERRORS */}
          {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

          {/* SUBMIT BUTTON */}
          <button type="submit" style={{ marginTop: '10px', width: '100%' }}>
            Register
          </button>
        </form>
      )}

      {/* Verification Form (only show if user has signed up and we need the code) */}
      {verificationNeeded && (
        <form onSubmit={handleConfirmCode} style={{ maxWidth: '400px', margin: 'auto', textAlign: 'left' }}>
          <p style={{ color: 'green' }}>
            We sent a verification code to <strong>{email}</strong>. Check your email and enter the code below.
          </p>
          
          <div style={{ marginBottom: '10px' }}>
            <label>Verification Code:</label><br />
            <input
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              style={{ width: '100%' }}
              required
            />
          </div>

          {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

          <button type="submit" style={{ marginTop: '10px', width: '100%' }}>
            Confirm Code
          </button>
        </form>
      )}
    </div>
  );
}
