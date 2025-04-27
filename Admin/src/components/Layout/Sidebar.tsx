import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UsersIcon, ShoppingBagIcon, TruckIcon, BarChart2Icon, SettingsIcon, LogOutIcon, HomeIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext'; // Import the AuthContext hook

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth(); // Destructure the logout function from AuthContext

  const navItems = [
    {
      name: 'Dashboard',
      icon: <HomeIcon size={20} />,
      path: '/',
    },
    {
      name: 'User Management',
      icon: <UsersIcon size={20} />,
      path: '/users',
    },
    {
      name: 'Orders',
      icon: <ShoppingBagIcon size={20} />,
      path: '/orders',
    },
    {
      name: 'Delivery',
      icon: <TruckIcon size={20} />,
      path: '/delivery',
    },
    {
      name: 'Analytics',
      icon: <BarChart2Icon size={20} />,
      path: '/analytics',
    },
    {
      name: 'Settings',
      icon: <SettingsIcon size={20} />,
      path: '/settings',
    },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-black text-white">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-[#06C167] flex items-center justify-center text-white font-bold text-lg">
            E
          </div>
          <span className="ml-2 text-xl font-semibold">EatsAdmin</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                  isActive
                    ? 'bg-[#06C167] text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout} // Call the logout function on click
          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-lg w-full"
        >
          <LogOutIcon size={20} className="mr-3" />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;