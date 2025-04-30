import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Categories } from "./restaurant/Categories";
import { RestaurantList } from "./restaurant/RestaurantList";
import { RestaurantDetail } from "./restaurant/RestaurantDetail";
import { OrderSummary } from "./pages/OrderSummary"; // Import the OrderSummary component
import { restaurants, categories } from "./utils/mockData";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { LoginModal } from "./auth/LoginModal";
import { RegisterModal } from "./auth/RegisterModal";
import { CartSidebar } from "./cart/CartSideBar";
import { RestaurantProvider } from "./contexts/RestaurantContext";
import { OrderProvider } from "./contexts/OrderContext";
import { OrdersPage } from "./pages/OrderPage";

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
      {/* Banner Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Banner Image 1 */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Delicious Foods 1"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <div className="absolute inset-0 bg-[#0012013a] flex items-center justify-center rounded-lg">
            <h2 className="text-white text-xl font-bold text-center">
              Fresh & Tasty
            </h2>
          </div>
        </div>

        {/* Banner Image 2 */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Delicious Foods 2"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <div className="absolute inset-0 bg-[#0012013a] flex items-center justify-center rounded-lg">
            <h2 className="text-white text-xl font-bold text-center">
              Quick Delivery
            </h2>
          </div>
        </div>

        {/* Banner Image 3 */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1631942195933-bbca808dee25?q=80&w=2900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Delicious Foods 3"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <div className="absolute inset-0 bg-[#0012013a] flex items-center justify-center rounded-lg">
            <h2 className="text-white text-xl font-bold text-center">
              Explore Cuisines
            </h2>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Restaurant List Section */}
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
        <OrderProvider>
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
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/order-summary/:id" element={<OrderSummary />} /> {/* New Route */}
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
              {/* Footer Section */}
              <footer className="bg-gray-800 text-white py-4">
                  <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-sm">
                      © {new Date().getFullYear()} FoodiFY. All rights reserved.
                    </p>
                    <p className="text-sm mt-2">Made with ❤️ by FoodiFY Team.</p>
                  </div>
                </footer>
            </div>
          </BrowserRouter>
        </CartProvider>
        </OrderProvider>
      </RestaurantProvider>
    </AuthProvider>
  );
}