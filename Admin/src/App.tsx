import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout.tsx';
import UserManagement from './pages/UserManagement';
import Orders from './pages/Order';
import Dashboard from './pages/Dashboard.tsx';
import Delivery from './pages/Delivery.tsx';
import Settings from './pages/Settings.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import { UserProvider } from './contexts/UserContext.tsx';

export function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="orders" element={<Orders />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="settings" element={<Settings />} />
            {/* Additional routes would go here */}
          </Route>
        </Routes>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}