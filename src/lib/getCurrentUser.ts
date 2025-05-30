// src/lib/getCurrentUser.ts

import userPool from '@/lib/cognitoClient';
import { CognitoUserSession, CognitoUser } from 'amazon-cognito-identity-js';

/**
 * A convenient interface to integrate user info and session verification
 */
interface CognitoUserSessionResult {
  cognitoUser: CognitoUser;
  session: CognitoUserSession;
}

/**
 * Attempts to retrieve the currently logged-in user (and session)
 * from the browser. Returns null if there's no current user
 * or if session retrieval fails.
 */
export default async function getCurrentUser(): Promise<CognitoUserSessionResult | null> {
  // Return null on the server side
  if (typeof window === 'undefined') {
    return null;
  }

  // Attempt to fetch the user from local storage via the user pool
  const cognitoUser = userPool.getCurrentUser();
  if (!cognitoUser) {
    console.warn('No current user found.');
    return null;
  }

  // Wrap getSession in a Promise
  return new Promise<CognitoUserSessionResult | null>((resolve) => {
    cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err || !session) {
        console.error('Failed to retrieve session.', err);
        resolve(null);
      } else {
        resolve({ cognitoUser, session });
      }
    });
  });
}
