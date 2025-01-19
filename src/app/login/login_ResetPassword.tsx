import React, { useState } from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import userPool from '@/lib/cognitoClient';

interface ResetPasswordProps {
  onResetComplete: () => void;  // Define the type of the onResetComplete function
}

function ResetPassword({ onResetComplete }: ResetPasswordProps) {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [stage, setStage] = useState(1);  // Stage 1: Request code, Stage 2: Reset password

  const requestPasswordReset = () => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.forgotPassword({
      onSuccess: () => {
        setMessage('Password reset code sent to your email.');
        setStage(2);  // Move to next stage to enter code and new password
      },
      onFailure: (err) => {
        setMessage(err.message || 'Failed to send password reset code.');
      },
    });
  };

  const resetPassword = () => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.confirmPassword(code, newPassword, {
      onSuccess: () => {
        setMessage('Your password has been changed successfully.');
        onResetComplete();  // Call the passed function when password reset is successful
      },
      onFailure: (err) => {
        setMessage(err.message || 'Failed to reset password.');
      },
    });
  };

  return (
    <div>
      {stage === 1 && (
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username or Email"
          />
          <button onClick={requestPasswordReset}>Send Code</button>
        </div>
      )}
      {stage === 2 && (
        <div>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your code"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
          />
          <button onClick={resetPassword}>Reset Password</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
