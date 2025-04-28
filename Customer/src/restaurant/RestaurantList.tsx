import React, { useEffect, useState } from "react";
import { RestaurantCard } from "./RestaurantCard";
import { useRestaurantContext } from "../contexts/RestaurantContext";

export function RestaurantList() {
  const { restaurants, isLoading, error } = useRestaurantContext();
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  useEffect(() => {
    // Update filtered restaurants whenever the restaurant list changes
    setFilteredRestaurants(restaurants);
  }, [restaurants]);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}