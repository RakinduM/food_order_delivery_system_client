import React, { useState, createContext, useContext } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const login = async (email: string, password: string) => {
    // Simulate API call
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0]
    };
    setUser(mockUser);
  };
  const register = async (email: string, password: string, name: string) => {
    // Simulate API call
    const mockUser = {
      id: '1',
      email,
      name
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };
  
  return <AuthContext.Provider value={{
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }}>
      {children}
    </AuthContext.Provider>;
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};