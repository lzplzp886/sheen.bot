import React from 'react';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Optional layout for student
  return (
    <section style={{ padding: '20px' }}>
      {children}
    </section>
  );
}
