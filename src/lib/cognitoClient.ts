import { CognitoUserPool } from 'amazon-cognito-identity-js';

// All sensitive data for Cognito connection is kept under .env.local file
const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID as string,
  ClientId: process.env.NEXT_PUBLIC_CLIENT_ID as string
};

// Check if Cognito connection data is incomplete
if (!poolData.UserPoolId || !poolData.ClientId) {
  throw new Error('Missing Cognito configuration. Check your environment variables.');
}

// Create the instance of the userPool for other module to call and use the method, e.g. signUp, authenticateUser.
const userPool = new CognitoUserPool(poolData);

export default userPool;
