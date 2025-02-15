// src/app/login/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import userPool from "@/lib/cognitoClient";
import { useUser } from "@/context/UserContext";
import ResetPassword from "@/app/(normal)/login/login_ResetPassword";
import Button from "@/components/Button";

export default function LoginPage() {
  const router = useRouter();

  // Global user context: if user is already logged in, skip the login page.
  const { username: globalUsername, role, loading, setUsername, setRole } = useUser();

  // Local state for the login form
  const [formUserInput, setFormUserInput] = useState("");
  const [formPassword, setFormPassword] = useState("");

  // Additional UI states
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReset, setShowReset] = useState(false);

  // If user is already logged in, redirect them
  useEffect(() => {
    if (!loading && globalUsername) {
      router.replace("/dashboard");
    }
  }, [loading, globalUsername, role, router]);

  // Handle the form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formUserInput || !formPassword) {
      setError("Please enter username (or email) and password.");
      return;
    }

    setIsProcessing(true);

    const authDetails = new AuthenticationDetails({
      Username: formUserInput,
      Password: formPassword,
    });

    const cognitoUser = new CognitoUser({
      Username: formUserInput,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (session) => {
        console.log("Login success!", session);

        // Immediately fetch user attributes => to find a friendly display name
        cognitoUser.getUserAttributes((attrErr, attrs: CognitoUserAttribute[] | undefined) => {
          setIsProcessing(false);

          if (attrErr || !attrs) {
            console.warn("No attributes found, using fallback username.");
            setUsername(cognitoUser.getUsername());
            // Delay redirect slightly to allow browser to prompt password save
            setTimeout(() => {
              router.push("/dashboard");
            }, 500);
            return;
          }

          let finalName = cognitoUser.getUsername();
          let finalRole = "";
          for (const a of attrs) {
            if (a.getName() === "preferred_username") {
              finalName = a.getValue();
            }
            if (a.getName() === "custom:role") {
              finalRole = a.getValue();
            }
          }

          setUsername(finalName);
          setRole(finalRole);
          // Delay redirect slightly to help Chrome trigger password save prompt
          setTimeout(() => {
            router.push("/dashboard");
          }, 500);
        });
      },
      onFailure: (authErr) => {
        console.error("Login error:", authErr);
        setIsProcessing(false);
        setError(authErr.message || "Login failed. Please try again.");
      },
    });
  };

  return (
    <div className="p-5 text-center">
      {!showReset ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Account Login</h1>
          <form onSubmit={handleLogin} className="max-w-md mx-auto text-left" autoComplete="on">
            {/* Hidden username field to help password managers associate the credentials */}
            <input
              type="hidden"
              name="username"
              value={formUserInput}
              autoComplete="username"
            />

            <div className="mb-3">
              <label>Username or Email:</label>
              <input
                type="text"
                value={formUserInput}
                onChange={(e) => setFormUserInput(e.target.value)}
                className="input-style"
                autoComplete="username"
              />
            </div>

            <div className="mb-3">
              <label>Password:</label>
              <input
                type="password"
                value={formPassword}
                onChange={(e) => setFormPassword(e.target.value)}
                className="input-style"
                autoComplete="current-password"
              />
            </div>

            {error && <p className="text-error mb-3">{error}</p>}

            <div className="space-x-2 inline-block">
              <Button
                type="submit"
                className="btn"
                isLoading={isProcessing}
                loadingText="Logging in..."
              >
                Log In
              </Button>
              <button type="button" onClick={() => setShowReset(true)}>
                Forgot password?
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h1>Reset Password</h1>
          <ResetPassword onResetComplete={() => setShowReset(false)} />
        </>
      )}
    </div>
  );
}
