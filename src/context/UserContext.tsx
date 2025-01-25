'use client';

import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import getCurrentUser from "@/lib/getCurrentUser";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

/** Type describing the user context data */
type UserContextType = {
  username: string | null;
  role: string | null;
  loading: boolean;
  setUsername: Dispatch<SetStateAction<string | null>>;
  setRole: Dispatch<SetStateAction<string | null>>;
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
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // When component did mount, call getCurrentUser() and obtain Cognito session details
    (async () => {
      try {
        const result = await getCurrentUser();
        if (!result) {
          // Not logged in
          setUsername(null);
          setRole(null);
        } else {
          // Logged in
          const { cognitoUser } = result;
          setUsername(cognitoUser.getUsername());
          // Reading customized attributes e.g. custom:role
          cognitoUser.getUserAttributes(
            (attrErr: Error | undefined, attrs: CognitoUserAttribute[] | undefined) => {
              if (attrErr || !attrs) {
                setRole(null);
              } else {
                let userRole = "student"; // Default set to student
                for (const attr of attrs) {
                  if (attr.getName() === "custom:role") {
                    userRole = attr.getValue();
                    break;
                  }
                }
                setRole(userRole);
              }
            }
          );
        }
      } catch (error) {
        console.error("getCurrentUser failed:", error);
        setUsername(null);
        setRole(null);
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
        loading,
        setUsername,
        setRole,
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