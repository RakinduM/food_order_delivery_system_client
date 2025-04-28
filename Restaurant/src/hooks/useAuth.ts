import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_AUTH_URL;

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [restaurantDetails, setRestaurantDetails] = useState<any | null>(null); // State to store restaurant details
  const navigate = useNavigate(); // Initialize the navigate function

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(`${API_URL}/restaurant/login`, {
        email,
        password,
      });
      localStorage.setItem("token", data.token); // Save token to localStorage
      localStorage.setItem("email", data.email); // Save email to localStorage
      localStorage.setItem("restaurantId", data.restaurantId); // Save restaurantId to localStorage
      navigate("/"); // Navigate to the dashboard after successful login
      return true;
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.post(`${API_URL}/restaurant/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return true;
    } catch (err) {
      setError("Failed to register. Please check the provided details.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getRestaurantDetails = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${API_URL}/restaurant/user/${email}`);
      setRestaurantDetails(data); // Save restaurant details to state
      return data;
    } catch (err) {
      setError("Failed to fetch restaurant details.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("email"); // Remove email from localStorage
    localStorage.removeItem("restaurantId"); // Remove restaurantId from localStorage
    navigate("/login"); // Navigate to the login page after logout
  };

  return {
    login,
    register,
    getRestaurantDetails,
    logout,
    isLoading,
    error,
    restaurantDetails, // Expose restaurant details
  };
};