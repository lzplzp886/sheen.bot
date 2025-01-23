import React, { useState } from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import userPool from '@/lib/cognitoClient';
import Button from '@/components/UI/Button';

interface ResetPasswordProps {
  onResetComplete: () => void;  // Define the type of the onResetComplete function
}

function ResetPassword({ onResetComplete }: ResetPasswordProps) {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>(''); // Check message error or success type
  const [stage, setStage] = useState(1);  // Stage 1: Request code, Stage 2: Reset password
  const [isProcessing, setIsProcessing] = useState(false); // Prevent users from trying click button too many times

  const requestPasswordReset = () => {
    if (!username.trim()) {
      setMessage('Please enter your username or email.');
      setMessageType('error');
      return;
    }
    
    setIsProcessing(true); // When submitting verification code, show Sending instead of Send Code.
    
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.forgotPassword({
      onSuccess: () => {
        setMessage(
          'If you have registered with us, a password reset code will be sent to your email.'
        );
        setMessageType('success');
        setStage(2);  // Move to next stage to enter code and new password
        setIsProcessing(false); //Disabled loading status
      },
      onFailure: (err) => {
        setMessage(err.message || 'Failed to send password reset code.');
        setMessageType('error');
        setIsProcessing(false); //Disabled loading status
      },
    });

  };

  const resetPassword = () => {
    if (!code.trim()) {
      setMessage('Please enter the verification code.');
      setMessageType('error');
      return;
    }
  
    if (!newPassword.trim()) {
      setMessage('Please enter your new password.');
      setMessageType('error');
      return;
    }

    setIsProcessing(true);
    
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.confirmPassword(code, newPassword, {
      onSuccess: () => {
        setMessage('Your password has been changed successfully.');
        setMessageType('success');
        onResetComplete();  // Call the passed function when password reset is successful
        setIsProcessing(false); //Disabled loading status
      },
      onFailure: (err) => {
        setMessage(err.message || 'Failed to reset password.');
        setMessageType('error');
        setIsProcessing(false); //Disabled loading status
      },
    });
  };

  return (
    <div className="max-w-md mx-auto text-left">
      {stage === 1 && (
        <div className="mb-3">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username or Email"
            className="input-style"
            required
          />
          {message && <p className={`mb-3 text-sm ${messageType === 'success' ? 'text-success' : 'text-error'}`}>
              {message}
            </p>
          }
          <div className="mb-3">
            <Button 
              onClick={requestPasswordReset} 
              className="btn" 
              isLoading={isProcessing}
              loadingText="Sending"
              >
                Send Code
            </Button>
          </div>
        </div>
      )}
      {stage === 2 && (
        <div className="mb-3">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your code"
            className="input-style"
            required
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="input-style"
            required
          />
          {message && <p className={`mb-3 text-sm ${messageType === 'success' ? 'text-success' : 'text-error'}`}>
            {message}
          </p>}
          <div className="mb-3">
            <Button
              isLoading={isProcessing}
              loadingText="Resetting..."
              onClick={resetPassword}
              className="btn"
              >
              Reset Password
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
