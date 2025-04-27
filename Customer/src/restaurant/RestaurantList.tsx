import React from "react";
import { RestaurantCard } from "./RestaurantCard";
import { Restaurant } from "../utils/mockData";

interface RestaurantListProps {
  restaurants: Restaurant[];
}

export function RestaurantList({ restaurants }: RestaurantListProps) {
  if (restaurants.length === 0) {
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
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}
