import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section style={{ padding: '20px' }}>
      {/* You can add a custom admin header/nav if you want */}
      <h1>Admin Portal</h1>
      {children}
    </section>
  );
}
