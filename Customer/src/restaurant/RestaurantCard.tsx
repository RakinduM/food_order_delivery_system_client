import React from 'react';
import { ClockIcon, StarIcon } from 'lucide-react';
import { Restaurant } from '../utils/mockData';
import { useNavigate } from 'react-router-dom';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({
  restaurant
}: RestaurantCardProps) {
  const navigate = useNavigate();
  
  return <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
      <div className="relative h-48">
        <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md text-sm font-medium">
          {restaurant.deliveryTime} min
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{restaurant.name}</h3>
          <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="font-medium">{restaurant.rating}</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-1">
          {restaurant.categories.join(', ')}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center text-sm text-gray-600">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>
              {restaurant.deliveryFee === 0 ? 'Free delivery' : `$${restaurant.deliveryFee.toFixed(2)} delivery`}
            </span>
          </div>
          <span className="text-sm">{restaurant.distance} mi</span>
        </div>
      </div>
    </div>;
}