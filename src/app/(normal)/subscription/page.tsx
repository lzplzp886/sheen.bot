// src/app/subscription/page.tsx

"use client"
import React, { useState } from 'react';

const EnrollPage: React.FC = () => {
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [classType, setClassType] = useState('');
  const [paymentType, setPaymentType] = useState<'once_off' | 'recurring'>('once_off');
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Send form data to our API route to generate a PayFast transaction
    const res = await fetch('/api/payfast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        parentName,
        childName,
        classType,
        paymentType
      })
    });
    
    const { payfastUrl } = await res.json();
    
    // Redirect user to PayFast
    window.location.href = payfastUrl;
  };
  
  return (
    <div>
      <h1>Enroll in Sheen Robotics Class</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Parent Name</label>
          <input 
            type="text" 
            value={parentName} 
            onChange={(e) => setParentName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Child Name</label>
          <input 
            type="text" 
            value={childName} 
            onChange={(e) => setChildName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Class Type</label>
          <select
            value={classType}
            onChange={(e) => setClassType(e.target.value)}
            required
          >
            <option value="">Select Class</option>
            <option value="Beginner">Beginner</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label>Payment Type</label>
          <select
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value as 'once_off' | 'recurring')}
          >
            <option value="once_off">Once Off</option>
            <option value="recurring">Recurring</option>
          </select>
        </div>
        <button type="submit">Proceed to PayFast</button>
      </form>
    </div>
  );
};

export default EnrollPage;
