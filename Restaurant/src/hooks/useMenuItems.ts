import { useState, useEffect } from "react";
import { MenuItem, PortionSize, Category } from "../types/menu";

export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    // Load from localStorage if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("menuItems");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
  }, [menuItems]);

  const addMenuItem = (item: Omit<MenuItem, "id" | "createdAt">) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setMenuItems((prev) => [...prev, newItem]);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    menuItems: filteredItems,
    addMenuItem,
    updateMenuItem,
    searchTerm,
    setSearchTerm,
  };
};
