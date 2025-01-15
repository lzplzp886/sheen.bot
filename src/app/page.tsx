'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to Sheen.bot</h1>
      <p>A smarter way to learn coding & robotics</p>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => router.push('/login')}>
          Login
        </button>
        <button onClick={() => router.push('/registration')} style={{ marginRight: '10px' }}>
          Register
        </button>
      </div>
    </div>
  );
}
