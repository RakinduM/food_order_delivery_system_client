import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { StarIcon, ClockIcon, PlusIcon } from "lucide-react";
import { restaurants } from "../utils/mockData";
import { menuData } from "../utils/mockMenuData";
import { useCart } from "../contexts/CartContext";

export function RestaurantDetail() {
  const { id } = useParams<{
    id: string;
  }>();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { addItem } = useCart();
  const restaurant = restaurants.find((r) => r.id === id);
  const menu = menuData[id || ""];

    // Check if restaurant and menu exist
  if (!restaurant || !menu) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">Restaurant not found.</p>
      </div>
    );
  }

  const handleAddToCart = (itemId: string) => {
    const item = menu.items.find((item) => item.id === itemId);
    if (item) {
      addItem(item, restaurant.id, restaurant.name);
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Restaurant Header */}
      <div className="relative h-64 bg-gray-900">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
              <span>{restaurant.rating}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 mr-1" />
              <span>{restaurant.deliveryTime} min</span>
            </div>
            <span>
              {restaurant.deliveryFee === 0
                ? "Free Delivery"
                : `$${restaurant.deliveryFee.toFixed(2)} Delivery`}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-200">
            {restaurant.categories.join(" • ")}
          </div>
        </div>
      </div>
      {/* Menu Categories */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === ""
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory("")}
            >
              All
            </button>
            {menu.categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menu.items
            .filter(
              (item) =>
                selectedCategory === "" || item.category === selectedCategory
            )
            .map((item) => (
              <div
                key={item.id}
                className="flex space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-medium">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item.id)}
                      className="flex items-center px-3 py-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
