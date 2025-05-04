import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface UserContextType {
  customers: any[]; // Replace `any` with a proper type if available
  drivers: any[];
  restaurants: any[];
  fetchCustomers: () => void;
  fetchDrivers: () => void;
  fetchRestaurants: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);

  // Get the token from localStorage
  const token = localStorage.getItem("token");

  // Axios instance with Authorization header
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8089/api/admin",
    headers: {
      Authorization: `Bearer ${token}`, // Pass the JWT token in the Authorization header
    },
  });

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8089/api/admin/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await axios.get("http://localhost:8089/api/admin/drivers");
      setDrivers(response.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get("http://localhost:8089/api/admin/restaurants");
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  useEffect(() => {
    // Fetch all data on mount
    fetchCustomers();
    fetchDrivers();
    fetchRestaurants();
  }, []);

  return (
    <UserContext.Provider
      value={{
        customers,
        drivers,
        restaurants,
        fetchCustomers,
        fetchDrivers,
        fetchRestaurants,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};