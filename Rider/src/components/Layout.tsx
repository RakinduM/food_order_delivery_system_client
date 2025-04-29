import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { useDriver } from '../contexts/DriverContext';
const Layout = () => {
  const {
    isOnline
  } = useDriver();
  return <div className="flex flex-col h-screen bg-black text-white">
      <Header />
      <main className={`flex-1 overflow-auto ${isOnline ? 'bg-black' : 'bg-gray-900'}`}>
        <Outlet />
      </main>
      <Navigation />
    </div>;
};
export default Layout;