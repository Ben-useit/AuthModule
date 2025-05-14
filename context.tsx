// context/AuthContext.tsx

'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type User = {
  userId: string;
  name: string;
  lang: string;
};

type AuthProviderState = {
  user: User | null;
  setUser: (user: User) => void;
};

const AuthContext = createContext<AuthProviderState | undefined>(undefined);

export function AuthProvider({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser?: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch('/api/me');
        if (!res.ok) throw new Error('Not logged in');
        const { user } = await res.json();
        setUser(user);
      } catch (err) {
        setUser(null);
      }
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
