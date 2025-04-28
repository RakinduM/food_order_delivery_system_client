import { useState, useEffect } from "react";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";
import { useMenuItems } from "@/hooks/useMenuItems";
import { MenuItemCard } from "@/components/MenuItemCard";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
  restaurantId: string;
}

export default function RestaurantDashboard({ restaurantId }: Props) {
  const {
    menuItems,
    addMenuItem,
    updateMenuItem,
    updateAvailability,
    deleteMenuItem,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
    retry,
  } = useMenuItems(restaurantId);

  const navigate = useNavigate();

  const { logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    // Check if the user is logged in by verifying the presence of a token
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleDeleteClick = (id: string, name: string) => {
    setItemToDelete({ id, name });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      await deleteMenuItem(itemToDelete.id);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  const handleViewMenuItems = () => {
    console.log("View Menu Items clicked");
    // Add logic to navigate or display menu items
  };

  const handleViewOrders = () => {
    console.log("View Orders clicked");
    navigate("/orders");
    // Add logic to navigate or display orders
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-500 mb-4">
            You are not logged in
          </h2>
          <Button
            onClick={() => (window.location.href = "/login")} // Redirect to login page
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 text-green-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-500">
              Loading menu items...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12 text-red-500">
            <h2 className="text-xl font-medium mb-4">{error}</h2>
            <Button onClick={retry} className="bg-green-600 hover:bg-green-700">
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          restaurantId={restaurantId}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          addMenuItem={addMenuItem}
          handleLogout={handleLogout}
          onViewMenuItems={handleViewMenuItems}
          onViewOrders={handleViewOrders}
        />

        {menuItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-500">
              No menu items found
            </h2>
            <p className="text-gray-400 mt-2">
              Start by adding your first menu item
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onAvailabilityChange={updateAvailability}
                restaurantId={restaurantId}
                updateMenuItem={updateMenuItem}
                onDelete={() => handleDeleteClick(item.id, item.name)}
              />
            ))}
          </div>
        )}
        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          itemName={itemToDelete?.name || ""}
        />
      </div>
    </div>
  );
}