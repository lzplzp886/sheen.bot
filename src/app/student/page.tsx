'use client';

import BlocklyEditor from '@/app/student/BlocklyEditor';
import ProtectedRoute from '@/components/ProtectedRoute'; // to protect the page if needed

export default function StudentDashboard() {
  return (
    <ProtectedRoute allowedRoles={['student']}>
    <div style={{ textAlign: 'center' }}>
      <h2>Student Dashboard</h2>
      <p>Welcome to your personal learning space. Start coding and exploring robotics here!</p>
      <BlocklyEditor></BlocklyEditor>
    </div>
    </ProtectedRoute>
  );
}
