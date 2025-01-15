import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID as string,
  ClientId: process.env.NEXT_PUBLIC_CLIENT_ID as string
};

if (!poolData.UserPoolId || !poolData.ClientId) {
  throw new Error('Missing Cognito configuration. Check your environment variables.');
}

const userPool = new CognitoUserPool(poolData);

export default userPool;
