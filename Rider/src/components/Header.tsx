import React from 'react';
import { useLocation } from 'react-router-dom';
import OnlineToggle from './OnlineToggle';
import { useDriver } from '../contexts/DriverContext';
const Header = () => {
  const location = useLocation();
  const {
    isOnline
  } = useDriver();
  // Determine title based on current route
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/orders':
        return 'Orders';
      case '/earnings':
        return 'Earnings';
      case '/profile':
        return 'Profile';
      default:
        if (location.pathname.startsWith('/orders/')) {
          return 'Order Details';
        }
        return 'Uber Eats Driver';
    }
  };
  return <header className="sticky top-0 z-10 bg-black text-white p-4 flex items-center justify-between shadow-md">
      <h1 className="text-xl font-bold">{getTitle()}</h1>
      <div className="flex items-center">
        <div className="mr-3">
          <span className={`inline-block w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="ml-2 text-sm">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
        <OnlineToggle />
      </div>
    </header>;
};
export default Header;