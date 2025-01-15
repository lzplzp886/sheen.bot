'use client';

import React from 'react';

export default function AdminDashboard() {
  // TODO: Protect this route, only accessible if user is admin
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Admin Dashboard</h2>
      <p>
        Manage schools, classes, and teachers from the admin portal. You can also
        view system reports and oversee user accounts.
      </p>
      <div style={{ marginTop: '20px' }}>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => alert('Redirecting to manage schools...')}
        >
          Manage Schools
        </button>
        <button
          style={{
            marginLeft: '20px',
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => alert('Redirecting to system reports...')}
        >
          View Reports
        </button>
      </div>
    </div>
  );
}
