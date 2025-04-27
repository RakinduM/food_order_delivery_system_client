import React, { useState, createContext, useContext } from 'react';
import axios from 'axios';

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    phoneNumber: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8089/api/auth/login', { username, password });
      const { token, username: responseUsername } = response.data;

      // Save token and username to local storage
      localStorage.setItem('token', token);
      localStorage.setItem('username', responseUsername);

      setUser({ username: responseUsername });
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    phoneNumber: string,
    password: string
  ) => {
    try {
      const response = await axios.post('http://localhost:8089/api/auth/register', {
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
        password,
      });
      const { token, username: responseUsername } = response.data;

      // Save token and username to local storage
      localStorage.setItem('token', token);
      localStorage.setItem('username', responseUsername);

      setUser({ username: responseUsername });
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    // Clear user state and remove token and username from local storage
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};