import React from "react";
import { ClockIcon, StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Restaurant {
  id: string;
  restaurantName: string;
  type: string;
  address: string;
  phoneNumber: string;
  businessDoc: string; // Assuming this is the image URL
  isAvailable: boolean;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      aria-label={`View details for ${restaurant.restaurantName}`}
    >
      {/* Restaurant Image */}
      <div className="relative h-48">
        <img
          src={restaurant.businessDoc || "https://via.placeholder.com/150"}
          alt={restaurant.restaurantName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md text-sm font-medium">
          {restaurant.isAvailable ? "Open Now" : "Closed"}
        </div>
      </div>

      {/* Restaurant Details */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg truncate">{restaurant.restaurantName}</h3>
          <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="font-medium">{restaurant.type}</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-1 truncate">{restaurant.address}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center text-sm text-gray-600">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>{restaurant.phoneNumber}</span>
          </div>
        </div>
        <div className="mt-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
          >
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
}