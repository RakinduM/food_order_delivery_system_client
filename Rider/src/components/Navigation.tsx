import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, ClipboardListIcon, DollarSignIcon, UserIcon } from 'lucide-react';
const Navigation = () => {
  const navItems = [{
    path: '/',
    icon: <HomeIcon size={24} />,
    label: 'Home'
  }, {
    path: '/orders',
    icon: <ClipboardListIcon size={24} />,
    label: 'Orders'
  }, {
    path: '/earnings',
    icon: <DollarSignIcon size={24} />,
    label: 'Earnings'
  }, {
    path: '/profile',
    icon: <UserIcon size={24} />,
    label: 'Profile'
  }];
  return <nav className="sticky bottom-0 bg-black text-white border-t border-gray-800">
      <div className="flex justify-around">
        {navItems.map(item => <NavLink key={item.path} to={item.path} className={({
        isActive
      }) => `flex flex-col items-center py-2 px-4 ${isActive ? 'text-green-500' : 'text-gray-400'}`}>
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>)}
      </div>
    </nav>;
};
export default Navigation;