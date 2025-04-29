import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';

const VITE_DRIVER_URL = import.meta.env.VITE_API_DRIVER_URL;

// Define the shape of the user object
interface User {
  id: string;
  username: string;
  token: string;
}

// Define the context value shape
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (formData: FormData) => Promise<void>;
}

// Create the AuthContext with a default value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props for the AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component to wrap your app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user from localStorage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Register function
  const register = async (formData: FormData) => {
    const response = await axios.post(`${VITE_DRIVER_URL}/driver/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Driver registered:', response.data);
  };

  // Login function
  const login = async (username: string, password: string) => {
    const response = await axios.post(`${VITE_DRIVER_URL}/driver/login`, { username, password });
    const { token, id } = response.data;

    const userData = { id, username, token };
    setUser(userData);

    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(userData));

    console.log('Driver logged in:', response.data);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    console.log('Driver logged out');
  };

  // Provide the context value
  const contextValue = { user, login, logout, register };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};