import React, { useEffect, useState } from "react";
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
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  restaurantId,
  searchTerm,
  setSearchTerm,
  addMenuItem,
  handleLogout,
}) => {
  const { getRestaurantDetails, restaurantDetails } = useAuth();
  const [restaurantName, setRestaurantName] = useState<string>("");

  useEffect(() => {
    const fetchRestaurantName = async () => {
      const email = localStorage.getItem("email"); // Retrieve email from localStorage
      if (email) {
        const details = await getRestaurantDetails(email);
        setRestaurantName(details?.restaurantName || "Restaurant Dashboard");
      }
    };

    fetchRestaurantName();
  }, [getRestaurantDetails]);

  return (
    <header className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-green-600">
          {restaurantName}
        </h1>
        <div className="flex gap-4 w-full sm:w-auto">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <MenuItemDialog restaurantId={restaurantId} onSubmit={addMenuItem}>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Add New Item
            </Button>
          </MenuItemDialog>
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