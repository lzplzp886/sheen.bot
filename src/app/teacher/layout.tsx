import React from 'react';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Optional teacher-specific layout or nav
  return (
    <section style={{ padding: '20px' }}>
      <h1>Teacher Portal</h1>
      {children}
    </section>
  );
}
