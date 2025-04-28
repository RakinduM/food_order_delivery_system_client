import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Categories } from "./restaurant/Categories";
import { RestaurantList } from "./restaurant/RestaurantList";
import { RestaurantDetail } from "./restaurant/RestaurantDetail";
import { restaurants, categories } from "./utils/mockData";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { LoginModal } from "./auth/LoginModal";
import { RegisterModal } from "./auth/RegisterModal";
import { CartSidebar } from "./cart/CartSideBar";
import { RestaurantProvider } from "./contexts/RestaurantContext";

function Home({
  searchQuery,
  selectedCategory,
  setSelectedCategory,
}: {
  searchQuery: string;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}) {
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesCategory =
      selectedCategory === "All" ||
      restaurant.categories.includes(selectedCategory);
    const matchesSearch =
      searchQuery === "" ||
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.categories.some((category) =>
        category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });
  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <RestaurantList restaurants={filteredRestaurants} />
    </main>
  );
}

export function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const handleLoginClick = () => {
    setShowLogin(true);
    setShowCart(false);
  };
  return (
    <AuthProvider>
      <RestaurantProvider>
        <CartProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
              <Header
                onSearch={setSearchQuery}
                onCartClick={() => setShowCart(true)}
                onAuthClick={() => setShowLogin(true)}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      searchQuery={searchQuery}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                    />
                  }
                />
                <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              </Routes>
              {showLogin && (
                <LoginModal
                  onClose={() => setShowLogin(false)}
                  onSwitchToRegister={() => {
                    setShowLogin(false);
                    setShowRegister(true);
                  }}
                />
              )}
              {showRegister && (
                <RegisterModal
                  onClose={() => setShowRegister(false)}
                  onSwitchToLogin={() => {
                    setShowRegister(false);
                    setShowLogin(true);
                  }}
                />
              )}
              <CartSidebar
                isOpen={showCart}
                onClose={() => setShowCart(false)}
                onLoginClick={handleLoginClick}
              />
            </div>
          </BrowserRouter>
        </CartProvider>
      </RestaurantProvider>
    </AuthProvider>
  );
}
