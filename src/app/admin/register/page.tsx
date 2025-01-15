'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRegistrationPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // This should only be done by a SUPER ADMIN user
    console.log('Registering admin with data:', {
      username, firstName, lastName, email, password, phoneNumber
    });
    // Example call: create user in Cognito with custom:role=admin => sheen.admin group

    router.push('/admin');
  };

  return (
    <div>
      <h2>Create Admin Account</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <label>Username (min 6 chars):</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />

        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />

        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />

        <label>Email (mandatory):</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />

        <label>Phone Number (optional):</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />

        <button type="submit">Register Admin</button>
      </form>
    </div>
  );
}
