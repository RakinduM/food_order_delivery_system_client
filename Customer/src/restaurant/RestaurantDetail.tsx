import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StarIcon, ClockIcon, PlusIcon } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useRestaurantContext } from "../contexts/RestaurantContext";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
};

type Restaurant = {
  id: string;
  restaurantName: string;
  address: string;
  businessDoc: string;
  type: string;
  isAvailable: boolean;
};

export function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const { getRestaurantById, getMenuItemsByRestaurantId, isLoading, error } = useRestaurantContext();
  const { addItem } = useCart();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      const [fetchedRestaurant, fetchedMenuItems] = await Promise.all([
        getRestaurantById(id),
        getMenuItemsByRestaurantId(id),
      ]);

      setRestaurant(fetchedRestaurant);
      setMenuItems(fetchedMenuItems || []);
    };

    fetchDetails();
  }, [id]);

  const handleAddToCart = (itemId: string) => {
    const item = menuItems.find((item) => item.id === itemId);
    if (item && restaurant) {
      addItem(item, restaurant.id, restaurant.restaurantName);
    }
  };

  const renderCategoryButtons = () => {
    const categories = Array.from(new Set(menuItems.map((item) => item.category)));
    return (
      <div className="flex space-x-4 overflow-x-auto pb-2">
        <CategoryButton
          label="All"
          selected={selectedCategory === ""}
          onClick={() => setSelectedCategory("")}
        />
        {categories.map((category) => (
          <CategoryButton
            key={category}
            label={category}
            selected={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        Loading restaurant details...
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        {error || "Restaurant not found."}
      </div>
    );
  }

  const filteredItems = selectedCategory
    ? menuItems.filter((item) => item.category === selectedCategory)
    : menuItems;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative h-64 bg-gray-900">
        <img
          src={restaurant.businessDoc}
          alt={restaurant.restaurantName}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{restaurant.restaurantName}</h1>
          <div className="flex items-center gap-4">
            <InfoIcon icon={<StarIcon className="text-yellow-400" />} text={restaurant.type || "N/A"} />
            <InfoIcon
              icon={<ClockIcon />}
              text={restaurant.isAvailable ? "Open Now" : "Closed"}
            />
          </div>
          <p className="mt-2 text-sm text-gray-200">{restaurant.address}</p>
        </div>
      </header>

      {/* Menu Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        {/* Categories */}
        {renderCategoryButtons()}

        {/* Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-medium">${item.price.toFixed(2)}</span>
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    className="flex items-center px-3 py-1 bg-green-600 text-white rounded-full hover:bg-green-700"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Reusable Components
const InfoIcon = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-1 text-sm">
    {icon}
    <span>{text}</span>
  </div>
);

const CategoryButton = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
      selected ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }`}
  >
    {label}
  </button>
);
