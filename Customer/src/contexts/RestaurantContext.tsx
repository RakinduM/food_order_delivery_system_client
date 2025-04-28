import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

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
  isLoading: boolean;
  error: string | null;
}

const RestaurantContext = createContext<RestaurantContextProps | undefined>(
  undefined
);

const API_URL = import.meta.env.VITE_API_URL;

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all restaurants
  const fetchRestaurants = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<Restaurant[]>(`${API_URL}/restaurant/`);
      setRestaurants(data);
    } catch (err) {
      setError("Failed to fetch restaurants");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch a restaurant by ID
  const getRestaurantById = async (id: string): Promise<Restaurant | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<Restaurant>(`${API_URL}/restaurant/${id}`);
      return data;
    } catch (err) {
      setError("Failed to fetch restaurant details");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <RestaurantContext.Provider
      value={{ restaurants, getRestaurantById, isLoading, error }}
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