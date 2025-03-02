// src/context/UserContext.tsx

'use client';

import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import getCurrentUser from "@/lib/getCurrentUser";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

/** Type describing the user context data */
export type UserContextType = {
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

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    (async () => {
      try {
        const result = await getCurrentUser();
        if (!result) {
          setUsername(null);
          setRole(null);
          setFirstName(null);
        } else {
          const { cognitoUser } = result;
          setUsername(cognitoUser.getUsername());
          const attributes = await new Promise<CognitoUserAttribute[] | null>((resolve) => {
            cognitoUser.getUserAttributes((err, attrs) => {
              if (err || !attrs) {
                resolve(null);
              } else {
                resolve(attrs);
              }
            });
          });
          console.log("UserContext - Retrieved attributes:", attributes);
          if (attributes) {
            let userRole = "student"; // 默认角色
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

/** Custom hook to read/update the user context */
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
