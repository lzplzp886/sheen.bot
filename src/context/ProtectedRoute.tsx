// src/context/ProtectedRoute.tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import getCurrentUser from '@/lib/getCurrentUser';
import type { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import LoadingScreen from '@/components/LoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; // e.g. ['student', 'teacher'] or ['teacher'] etc.
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('[ProtectedRoute] useEffect triggered. Checking user authentication.');
    const checkAuth = async () => {
      try {
        const userSession = await getCurrentUser();
        console.log('[ProtectedRoute] User session:', userSession);
        if (!userSession || !userSession.cognitoUser) {
          console.warn('[ProtectedRoute] No authenticated user. Redirecting to login.');
          throw new Error('No authenticated user');
        }

        // We have a session => check the user’s attributes for role
        userSession.cognitoUser.getUserAttributes((err, attrs: CognitoUserAttribute[] | undefined) => {
          if (err || !attrs) {
            // If we can't fetch attributes, or an error => not authorized
            console.error('[ProtectedRoute] Failed to retrieve attributes:', err);
            router.push('/login');
            setIsLoading(false);
            return;
          }

          // Attempt to find the custom:role attribute
          console.log('[ProtectedRoute] Retrieved attributes:', attrs);
          let userRole = null;
          for (const attr of attrs) {
            if (attr.getName() === 'custom:role') {
              userRole = attr.getValue();
              break;
            }
          }

          // If userRole is not in allowedRoles => redirect
          if (!userRole || !allowedRoles.includes(userRole)) {
            console.warn(`[ProtectedRoute] Unauthorized role "${userRole}". Allowed: ${allowedRoles}`);
            router.push('/login');
            setIsLoading(false);
            return;
          }

          // Otherwise, user is authenticated and has the right role
          console.log('[ProtectedRoute] Authentication and role check passed.');
          setIsAuthenticated(true);
          setIsLoading(false);
        });
      } catch (error) {
        console.error('[ProtectedRoute] Error during authentication:', error);
        router.push('/login');
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router, allowedRoles]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    console.log('[ProtectedRoute] Not authenticated. Returning null.');
    return null;
  }

  console.log('[ProtectedRoute] Rendering children.');
  return <>{children}</>;
}