import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

interface MenuItem {
  id: string;
  restaurantId: string;
  category: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  portion: string;
  is_available: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Restaurant {
  id: string;
  restaurantName: string;
  restaurantAdmin: string;
  type: string;
  address: string;
  phoneNumber: string;
  businessDoc: string;
  isAvailable: boolean;
}

interface RestaurantContextProps {
  restaurants: Restaurant[];
  getRestaurantById: (id: string) => Promise<Restaurant | null>;
  getMenuItemsByRestaurantId: (restaurantId: string) => Promise<MenuItem[] | null>;
  isLoadingRestaurants: boolean;
  isLoadingMenuItems: boolean;
  error: string | null;
}

const RestaurantContext = createContext<RestaurantContextProps | undefined>(
  undefined
);

const API_URL = import.meta.env.VITE_API_URL;
const API_MENU_URL = import.meta.env.VITE_API_MENU_URL;

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(false);
  const [isLoadingMenuItems, setIsLoadingMenuItems] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all restaurants
  const fetchRestaurants = async () => {
    setIsLoadingRestaurants(true);
    setError(null);
    try {
      const { data } = await axios.get<Restaurant[]>(`${API_URL}/restaurant/`);
      setRestaurants(data);
    } catch (err) {
      setError("Failed to fetch restaurants");
    } finally {
      setIsLoadingRestaurants(false);
    }
  };

  // Fetch a restaurant by ID
  const getRestaurantById = async (id: string): Promise<Restaurant | null> => {
    setIsLoadingRestaurants(true);
    setError(null);
    try {
      const { data } = await axios.get<Restaurant>(`${API_URL}/restaurant/${id}`);
      return data;
    } catch (err) {
      setError("Failed to fetch restaurant details");
      return null;
    } finally {
      setIsLoadingRestaurants(false);
    }
  };

  // Fetch menu items by restaurant ID
  const getMenuItemsByRestaurantId = useCallback(async (
    restaurantId: string
  ): Promise<MenuItem[] | null> => {
    setIsLoadingMenuItems(true);
    setError(null);
    try {
      const { data } = await axios.get<MenuItem[]>(
        `${API_MENU_URL}/menu-items/restaurant/${restaurantId}`
      );
      return data;
    } catch (err) {
      setError("Failed to fetch menu items");
      return null;
    } finally {
      setIsLoadingMenuItems(false);
    }
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        getRestaurantById,
        getMenuItemsByRestaurantId,
        isLoadingRestaurants,
        isLoadingMenuItems,
        error,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurantContext = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error(
      "useRestaurantContext must be used within a RestaurantProvider"
    );
  }
  return context;
};