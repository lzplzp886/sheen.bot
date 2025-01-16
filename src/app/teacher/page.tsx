'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute'; // to protect the page

export default function TeacherDashboard() {
  return (
    <ProtectedRoute allowedRoles={['teacher']}>
    <div style={{ textAlign: 'center' }}>
      <h2>Teacher Dashboard</h2>
      <p>
        Welcome to the teacher portal. Here, you can manage your classes, track student progress,
        and provide feedback.
      </p>
      <div style={{ marginTop: '20px' }}>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => alert('Redirecting to view classes...')}
        >
          View Classes
        </button>
        <button
          style={{
            marginLeft: '20px',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => alert('Redirecting to track student progress...')}
        >
          Track Student Progress
        </button>
      </div>
    </div>
    </ProtectedRoute>
  );
}
