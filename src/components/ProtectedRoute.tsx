import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import getCurrentUser from '@/lib/getCurrentUser';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userSession = await getCurrentUser();
        // Optionally check userSession for role-based conditions
        if (userSession) {
          setIsAuthenticated(true);
        } else {
          throw new Error('No authenticated user');
        }
      } catch (error) {
        console.error('User not authenticated:', error);
        router.push('/login'); 
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? <>{children}</> : null;
}
