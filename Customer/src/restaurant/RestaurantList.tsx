import React, { useEffect, useState } from "react";
import { RestaurantCard } from "./RestaurantCard";
import { useRestaurantContext } from "../contexts/RestaurantContext";

export function RestaurantList() {
  const { restaurants, isLoading, error } = useRestaurantContext();
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    // Filter restaurants by type
    if (selectedType === "") {
      setFilteredRestaurants(restaurants);
    } else {
      setFilteredRestaurants(
        restaurants.filter((restaurant) => restaurant.type === selectedType)
      );
    }
  }, [restaurants, selectedType]);

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">Loading restaurants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (filteredRestaurants.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">
          No restaurants found. Try changing your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Restaurants near you</h2>

      {/* Filter by Type */}
      <div className="mb-4">
        <button
          className={`px-4 py-2 rounded-full ${
            selectedType === ""
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setSelectedType("")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-full ml-2 ${
            selectedType === "Fast Food"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setSelectedType("Fast Food")}
        >
          Fast Food
        </button>
        <button
          className={`px-4 py-2 rounded-full ml-2 ${
            selectedType === "Fine Dining"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setSelectedType("Fine Dining")}
        >
          Fine Dining
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}