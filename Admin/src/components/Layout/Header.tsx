import React from 'react';
import { MenuIcon, BellIcon, SearchIcon } from 'lucide-react';
const Header: React.FC = () => {
  return <header className="bg-white border-b border-gray-200 z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center md:hidden">
            <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
              <MenuIcon size={24} />
            </button>
          </div>
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-start">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={18} className="text-gray-400" />
                </div>
                <input id="search" name="search" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#06C167] focus:border-[#06C167] sm:text-sm" placeholder="Search" type="search" />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
              <BellIcon size={20} />
            </button>
            <div className="ml-4 relative flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="font-medium text-gray-700">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;