import { useState, useEffect } from "react";
import axios from "axios";
import { MenuItem } from "@/types/menu.type";

export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all menu items
  const fetchMenuItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/menu-items");
      setMenuItems(response.data);
    } catch (err) {
      console.error("Failed to fetch menu items:", err);
      setError("Failed to load menu items. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Add new menu item
  const addMenuItem = async (newItem: Omit<MenuItem, "id" | "createdAt">) => {
    try {
      const response = await axios.post("/api/menu-items", newItem);
      setMenuItems((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error("Failed to add menu item:", err);
      throw err;
    }
  };

  // Update menu item
  const updateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    try {
      const response = await axios.patch(`/api/menu-items/${id}`, updates);
      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...response.data } : item
        )
      );
    } catch (err) {
      console.error("Failed to update menu item:", err);
      throw err;
    }
  };

  // Filter menu items based on search term
  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    menuItems: filteredItems,
    addMenuItem,
    updateMenuItem,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
    refetch: fetchMenuItems, // Optional: in case you need to refresh the data
  };
};
