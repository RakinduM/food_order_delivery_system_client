import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { MenuItemDialog } from "@/components/MenuItemDialog";
import { useAuth } from "@/hooks/useAuth";

interface DashboardHeaderProps {
  restaurantId: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  addMenuItem: (item: any) => void;
  handleLogout: () => void;
  onViewMenuItems: () => void;
  onViewOrders: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  restaurantId,
  searchTerm,
  setSearchTerm,
  addMenuItem,
  handleLogout,
  onViewMenuItems,
  onViewOrders,
}) => {
  const { getRestaurantDetails } = useAuth();
  const [restaurantName, setRestaurantName] = useState<string>("");

  const fetchRestaurantName = useCallback(async () => {
    const email = localStorage.getItem("email"); // Retrieve email from localStorage
    if (email) {
      const details = await getRestaurantDetails(email);
      setRestaurantName(details?.restaurantName || "Restaurant Dashboard");
    }
  }, [getRestaurantDetails]);

  useEffect(() => {
    fetchRestaurantName();
  }, [fetchRestaurantName]);

  return (
    <header className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-green-600">
          {restaurantName}
        </h1>
        <div className="flex gap-4 w-full sm:w-auto">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <Button
            onClick={onViewMenuItems}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            View Menu Items
          </Button>
          <MenuItemDialog restaurantId={restaurantId} onSubmit={addMenuItem}>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Add Menu Item
            </Button>
          </MenuItemDialog>
          <Button
            onClick={onViewOrders}
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            View Orders
          </Button>
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};