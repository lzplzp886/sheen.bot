import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import getCurrentUser from '@/lib/getCurrentUser';
import type { CognitoUserAttribute } from 'amazon-cognito-identity-js';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; // e.g. ['student', 'teacher'] or ['teacher'] etc.
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userSession = await getCurrentUser();
        if (!userSession || !userSession.cognitoUser) {
          throw new Error('No authenticated user');
        }

        // We have a session => check the user’s attributes for role
        userSession.cognitoUser.getUserAttributes((err, attrs: CognitoUserAttribute[] | undefined) => {
          if (err || !attrs) {
            // If we can't fetch attributes, or an error => not authorized
            console.error('Failed to retrieve attributes or user is not fully authenticated.', err);
            router.push('/login');
            setIsLoading(false);
            return;
          }

          // Attempt to find the custom:role attribute
          let userRole = null;
          for (const attr of attrs) {
            if (attr.getName() === 'custom:role') {
              userRole = attr.getValue();
              break;
            }
          }

          // If userRole is not in allowedRoles => redirect
          if (!userRole || !allowedRoles.includes(userRole)) {
            console.warn(`User with role ${userRole} not allowed. Allowed: ${allowedRoles}`);
            router.push('/login');
            setIsLoading(false);
            return;
          }

          // Otherwise, user is authenticated and has the right role
          setIsAuthenticated(true);
          setIsLoading(false);
        });
      } catch (error) {
        console.error('User not authenticated:', error);
        router.push('/login');
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router, allowedRoles]);

  if (isLoading) {
    return (
      <div className="p-5 text-center">
        <h2 className="text-base font-semibold">Loading...</h2>
      </div>
    )
  }

  return isAuthenticated ? <>{children}</> : null;
}