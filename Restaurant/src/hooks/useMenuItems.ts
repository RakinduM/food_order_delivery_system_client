import { useState, useEffect } from "react";
import axios from "axios";
import { MenuItem, MenuItemRequest } from "../types/menu.type";

const API_URL = import.meta.env.VITE_API_URL;

export const useMenuItems = (restaurantId: string) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMenuItems = async () => {
    try {
      const { data } = await axios.get<MenuItem[]>(`${API_URL}/menu-items`);
      setMenuItems(data);
      setError("");
    } catch {
      setError("Failed to load menu items");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [restaurantId]);

  const addMenuItem = async (item: MenuItemRequest) => {
    try {
      const { data } = await axios.post<MenuItem>(
        `${API_URL}/menu-items`,
        item
      );
      setMenuItems((prev) => [...prev, data]);
      return true;
    } catch {
      setError("Failed to add menu item");
      return false;
    }
  };

  const updateMenuItem = async (
    id: string,
    updates: Partial<MenuItemRequest>
  ): Promise<void> => {
    try {
      const { data } = await axios.put<MenuItem>(
        `${API_URL}/menu-items/${id}`,
        updates
      );
      setMenuItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...data } : item))
      );
      console.log("Menu item updated successfully");
    } catch (error) {
      setError("Failed to update menu item");
      console.error("Error updating menu item:", error);
    }
  };

  const updateAvailability = async (id: string, isAvailable: boolean) => {
    try {
      const { data } = await axios.patch<MenuItem>(
        `${API_URL}/menu-items/${id}/availability`,
        null,
        { params: { isAvailable } }
      );
      setMenuItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...data } : item))
      );
      return true;
    } catch (err) {
      setError("Failed to update availability");
      console.error("Error updating availability:", err);
      return false;
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/menu-items/${id}`);
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
      return true;
    } catch {
      setError("Failed to delete menu item");
      return false;
    }
  };

  const filteredItems = Array.isArray(menuItems)
  ? menuItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

  return {
    menuItems: filteredItems,
    addMenuItem,
    updateMenuItem,
    updateAvailability,
    deleteMenuItem,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
    retry: fetchMenuItems,
  };
};
