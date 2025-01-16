'use client';

import React, { createContext, useContext, useState } from 'react';

/** Type describing the user context data */
type UserContextType = {
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
};

/** Create the context, initially undefined */
const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * This provider wraps your entire app (e.g. in the RootLayout).
 * Any component inside can call `useUser()`.
 */
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}

/** Custom hook to read/update the user context from anywhere. */
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
