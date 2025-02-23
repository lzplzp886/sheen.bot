// src/context/UserContext.tsx

'use client';

import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import getCurrentUser from "@/lib/getCurrentUser";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

/** Type describing the user context data */
type UserContextType = {
  username: string | null;
  role: string | null;
  firstName: string | null;
  loading: boolean;
  setUsername: Dispatch<SetStateAction<string | null>>;
  setRole: Dispatch<SetStateAction<string | null>>;
  setFirstName: Dispatch<SetStateAction<string | null>>;
};

/** Create the context, initially undefined */
const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * This provider wraps your entire app (e.g. in the RootLayout).
 * Any component inside can call `useUser()`.
 */
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // When the component mounts, call getCurrentUser() to obtain Cognito session details.
    (async () => {
      try {
        const result = await getCurrentUser();
        if (!result) {
          // Not logged in
          setUsername(null);
          setRole(null);
          setFirstName(null);
        } else {
          const { cognitoUser } = result;
          setUsername(cognitoUser.getUsername());
          // Wrap getUserAttributes in a promise so that we wait for it before marking loading as false.
          const attributes = await new Promise<CognitoUserAttribute[] | null>((resolve) => {
            cognitoUser.getUserAttributes((err, attrs) => {
              if (err || !attrs) {
                resolve(null);
              } else {
                resolve(attrs);
              }
            });
          });
          // Print to make sure correct attributes retrieved.
          console.log("UserContext - Retrieved attributes:", attributes);
          if (attributes) {
            let userRole = "student"; // Default role
            let givenName: string | null = null;
            for (const attr of attributes) {
              if (attr.getName() === "custom:role") {
                userRole = attr.getValue();
                break;
              }
              if (attr.getName() === "given_name") {
                givenName = attr.getValue();
              }
            }
            setRole(userRole);
            setFirstName(givenName);
          } else {
            setRole(null);
            setFirstName(null);
          }
        }
      } catch (error) {
        console.error("getCurrentUser failed:", error);
        setUsername(null);
        setRole(null);
        setFirstName(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{
        username,
        role,
        firstName,
        loading,
        setUsername,
        setRole,
        setFirstName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

/** Custom hook to read/update the user context from global. */
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
