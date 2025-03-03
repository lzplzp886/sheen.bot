'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import getCurrentUser from "@/lib/getCurrentUser";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

/** Type describing the user context data */
export type UserContextType = {
  username: string | null;
  role: string | null;
  firstName: string | null;
  attributes: Record<string, string>;
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
  const [attributes, setAttributes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await getCurrentUser();
        if (!result) {
          setUsername(null);
          setRole(null);
          setFirstName(null);
          setAttributes({});
        } else {
          const { cognitoUser } = result;
          setUsername(cognitoUser.getUsername());
          const attrs = await new Promise<CognitoUserAttribute[] | null>((resolve) => {
            cognitoUser.getUserAttributes((err, attrs) => {
              if (err || !attrs) {
                resolve(null);
              } else {
                resolve(attrs);
              }
            });
          });
          console.log("UserContext - Retrieved attributes:", attrs);
          if (attrs) {
            const attrMap: Record<string, string> = {};
            let userRole = "student"; // 默认角色
            let givenName: string | null = null;
            for (const attr of attrs) {
              attrMap[attr.getName()] = attr.getValue();
              if (attr.getName() === "custom:role") {
                userRole = attr.getValue();
              }
              if (attr.getName() === "given_name") {
                givenName = attr.getValue();
              }
            }
            setAttributes(attrMap);
            setRole(userRole);
            setFirstName(givenName);
          } else {
            setRole(null);
            setFirstName(null);
            setAttributes({});
          }
        }
      } catch (error) {
        console.error("getCurrentUser failed:", error);
        setUsername(null);
        setRole(null);
        setFirstName(null);
        setAttributes({});
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
        attributes,
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
