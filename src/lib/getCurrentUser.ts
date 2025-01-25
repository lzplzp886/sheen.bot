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
 * from the browser. Throws an error if there's no current user,
 * or if session retrieval fails.
 */
export default async function getCurrentUser(): Promise<CognitoUserSessionResult | null> {
  // If this is on server side, return null or throw
  if (typeof window === 'undefined') {
    return null;
  }

  // Attempt to fetch the user from local storage via the user pool
  const cognitoUser = userPool.getCurrentUser();
  if (!cognitoUser) {
    // You can either throw an error or return null here
    throw new Error('No current user found.');
  }

  // Wrap getSession in a Promise
  return new Promise<CognitoUserSessionResult>((resolve, reject) => {
    cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err || !session) {
        reject(err || new Error('Failed to retrieve session.'));
      } else {
        // Successfully retrieved session
        resolve({ cognitoUser, session });
      }
    });
  });
}
