import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

interface User {
  username: string;
  id: string;
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

const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Rehydrate user state from localStorage
    const username = localStorage.getItem('username');
    const id = localStorage.getItem('id');
    return username && id ? { username, id } : null;
  });

  useEffect(() => {
    // Optional: Validate token on app load (if needed)
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      const { token, username: responseUsername, id: responseId } = response.data;

      // Save token and user details to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', responseUsername);
      localStorage.setItem('id', responseId);

      setUser({ username: responseUsername, id: responseId });
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
      const response = await axios.post(`${API_URL}/auth/register`, {
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
        password,
      });
      const { token, username: responseUsername, id: responseId } = response.data;

      // Save token and user details to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', responseUsername);
      localStorage.setItem('id', responseId);

      setUser({ username: responseUsername, id: responseId });
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    // Clear user state and remove token and username from localStorage
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    delete axios.defaults.headers.common['Authorization'];
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