import React, { useState } from "react";
import { SearchIcon, ShoppingBagIcon, UserIcon, MenuIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

interface HeaderProps {
  onSearch: (query: string) => void;
  onCartClick: () => void;
  onAuthClick: () => void;
}

export function Header({ onSearch, onCartClick, onAuthClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const { items } = useCart();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-green-600">Foodify</h1>
          </div>
          <div className="hidden md:flex items-center flex-1 mx-6 bg-gray-100 rounded-full px-4 py-2">
            <SearchIcon className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for food or restaurants"
              className="bg-transparent w-full focus:outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <button
              className="flex items-center text-gray-700 hover:text-green-600"
              onClick={onCartClick}
            >
              <div className="relative">
                <ShoppingBagIcon className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="ml-1">Cart</span>
            </button>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{user?.name}</span>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-green-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="flex items-center text-gray-700 hover:text-green-600"
                onClick={onAuthClick}
              >
                <UserIcon className="h-6 w-6" />
                <span className="ml-1">Login</span>
              </button>
            )}
          </nav>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-3 md:hidden">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
            <SearchIcon className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for food or restaurants"
              className="bg-transparent w-full focus:outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 py-2 border-t">
            <nav className="flex flex-col space-y-3">
              <button
                className="flex items-center text-gray-700 py-2"
                onClick={onCartClick}
              >
                <ShoppingBagIcon className="h-6 w-6 mr-2" />
                <span>Cart ({cartItemsCount})</span>
              </button>
              {isAuthenticated ? (
                <>
                  <span className="text-gray-700 py-2">{user?.name}</span>
                  <button onClick={logout} className="text-gray-700 py-2">
                    Logout
                  </button>
                </>
              ) : (
                <button
                  className="flex items-center text-gray-700 py-2"
                  onClick={onAuthClick}
                >
                  <UserIcon className="h-6 w-6 mr-2" />
                  <span>Login</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
