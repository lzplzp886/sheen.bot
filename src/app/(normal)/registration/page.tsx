// src/app/(normal)/registration/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// Cognito
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import userPool from "@/lib/cognitoClient";
// Context
import { useUser } from "@/context/UserContext";

import CountryCodeSelect from "@/app/(normal)/registration/reg_CountryCodeSelect";
import GeekWordsUsername from "@/app/(normal)/registration/reg_UsernameGenerator";
import Button from "@/components/Button";

export default function RegistrationPage() {
  const router = useRouter();

  // Global user context: If user is already logged in, skip registration
  const { username: globalUsername, loading} = useUser();

  // Local form fields
  const [formUsername, setFormUsername] = useState("");
  const [roleChoice, setRoleChoice] = useState<"student" | "parent" | "teacher" | "admin">("student");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // We'll store password to auto-login after user confirms registration
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+27");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Error handling
  const [errorMsg, setErrorMsg] = useState("");

  // Post-registration: need to confirm code
  const [verificationNeeded, setVerificationNeeded] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  // Button loading states
  const [isRegistering, setIsRegistering] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Import setUsername from the global UserContext
  const { setUsername, setRole } = useUser();

  // If user is already logged in, redirect them away from registration
  useEffect(() => {
    if (!loading && globalUsername) {
      router.replace("/dashboard");
    }
  }, [loading, globalUsername, router]);

  /**
   * Normalize phone number by removing the first '0' (if present) and prepending country code
   */
  function normalizePhoneNumber(number: string, code: string): string {
    const normalizedNumber = number.startsWith("0") ? number.substring(1) : number;
    return `${code}${normalizedNumber}`;
  }

  /**
   * Handle generated username from the "GeekWordsUsername" component
   */
  function handleUsernameGenerated(generatedUsername: string) {
    setFormUsername(generatedUsername);
  }

  /**
   * 1) Build attribute list
   * 2) userPool.signUp(...)
   * 3) If success => set verificationNeeded = true
   */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    // Basic checks
    if (!firstName || !lastName || !formUsername || !email || !password) {
      setErrorMsg("Please fill in all required fields");
      return;
    }

    setIsRegistering(true);

    const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber, countryCode);

    const attributeList = [
      new CognitoUserAttribute({ Name: "email", Value: email }),
      new CognitoUserAttribute({ Name: "custom:role", Value: roleChoice }),
      new CognitoUserAttribute({ Name: "phone_number", Value: normalizedPhoneNumber }),
      new CognitoUserAttribute({ Name: "given_name", Value: firstName }),
      new CognitoUserAttribute({ Name: "family_name", Value: lastName }),
    ];

    userPool.signUp(
      formUsername,
      password,
      attributeList,
      [],
      (err, result) => {
        setIsRegistering(false);
        if (err) {
          console.error("Sign up error:", err);
          setErrorMsg(err.message || "Registration failed.");
          return;
        }
        console.log("SignUp success. CognitoUser:", result?.user);
        // unconfirmed user => show the code verification form
        setVerificationNeeded(true);
      }
    );
  }

  /**
   * 1) confirmRegistration(...) => verifies the user
   * 2) Then auto-login with authenticateUser(...) => obtains session
   * 3) setUsername(...) in context => updates header
   * 4) router.push(...) to the role page
   */
  function handleConfirmCode(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!formUsername) {
      setErrorMsg("Username is missing. Please go back and sign up again.");
      return;
    }

    setIsVerifying(true);

    const cognitoUser = new CognitoUser({
      Username: formUsername,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      setIsVerifying(false);

      if (err) {
        console.error("Verification error:", err);
        setErrorMsg(err.message || "Verification failed. Please try again.");
        return;
      }

      console.log("Verification success:", result); // Typically "SUCCESS"

      // --- AUTO-LOGIN after confirming registration ---
      const authDetails = new AuthenticationDetails({
        Username: formUsername,
        Password: password,
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (session) => {
          console.log("Auto-login success. Session:", session);
          // 获取用户属性
          cognitoUser.getUserAttributes((attrErr, attrs) => {
            if (attrErr || !attrs) {
              setUsername(cognitoUser.getUsername());
            } else {
              let finalRole = "";
              for (const a of attrs) {
                if (a.getName() === "custom:role") {
                  finalRole = a.getValue();
                  break;
                }
              }
              setRole(finalRole);
            }
            // 更新用户名（这里也可以考虑使用给定名）
            setUsername(cognitoUser.getUsername());
            router.push("/dashboard");
          });
        },
        onFailure: (authErr) => {
          console.error("Auto-login failed:", authErr);
          setErrorMsg(
            authErr.message || "Auto-login failed. Please log in manually."
          );
        },
      });
    });
  }

  return (
    <div className="p-5 text-center">
      <h1 className="text-2xl font-bold mb-4">Account Registration</h1>

      {/* 
        If not yet verified, show the registration form; 
        after signUp success, show verification form. 
      */}
      {!verificationNeeded && (
        <form onSubmit={handleSubmit} className="p-5 max-w-md mx-auto text-left rounded-lg shadow-md">
          {/* Role */}
          <div className="mb-3">
            <label>I am a</label>
            <br />
            <select
              value={roleChoice}
              onChange={(e) =>
                setRoleChoice(e.target.value.toLowerCase() as "student" | "parent" | "teacher" | "admin")
              }
              className="select-style"
            >
              <option value="student">Student</option>
              <option value="parent">Parent</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* FIRST NAME */}
          <div className="mb-3">
            <label>First Name:</label>
            <br />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input-style"
              placeholder="e.g. James"
              required
            />
          </div>

          {/* LAST NAME */}
          <div className="mb-3">
            <label>Last Name:</label>
            <br />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input-style"
              placeholder="e.g. Smith"
              required
            />
          </div>

          {/* Username (local formUsername) */}
          <div className="mb-3">
            <label>Username:</label>
            <br />
            <input
              type="text"
              value={formUsername}
              onChange={(e) => setFormUsername(e.target.value)}
              className="input-style"
              required
              placeholder="Minimum 6 characters, use 0-9, a-z, -, _"
            />
            <GeekWordsUsername
              firstName={firstName}
              lastName={lastName}
              onUsernameGenerated={handleUsernameGenerated}
            />
          </div>

          {/* EMAIL */}
          <div className="mb-3">
            <label>Email:</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-style"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <label>Password:</label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-style"
              required
            />
          </div>

          {/* Country Code + Phone Number */}
          <div className="mb-3">
            <label>Phone Number:</label>
            <br />
            <div>
              <CountryCodeSelect
                value={countryCode}
                onChange={setCountryCode}
              />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="input-style"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* ERRORS */}
          {errorMsg && <p className="text-error">{errorMsg}</p>}

          {/* Submit button */}
          <Button
            type="submit"
            className="btn"
            isLoading={isRegistering}
            loadingText="Registering..."
          >
            Register
          </Button>
        </form>
      )}

      {/* Verification Code Form */}
      {verificationNeeded && (
        <form onSubmit={handleConfirmCode} className="max-w-md mx-auto text-left">
          <p className="text-success mb-3">
            We sent a verification code to <strong>{email}</strong>. Check your
            email and enter the code below.
          </p>

          <div className="mb-3">
            <label>Verification Code:</label>
            <br />
            <input
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              required
              className="input-style"
            />
          </div>

          {errorMsg && <p className="text-error mb-3">{errorMsg}</p>}

          <Button
            type="submit"
            className="btn"
            isLoading={isVerifying}
            loadingText="Verifying..."
          >
            Confirm
          </Button>
        </form>
      )}
    </div>
  );
}
