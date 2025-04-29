export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface RestaurantMenu {
  [restaurantId: string]: {
    categories: string[];
    items: MenuItem[];
  };
}

export const menuData: RestaurantMenu = {
  "1": {
    categories: ["Burgers", "Sides", "Drinks"],
    items: [
      {
        id: "1-1",
        name: "Classic Burger",
        description: "Beef patty, lettuce, tomato, onions, pickles",
        price: 8.99,
        imageUrl:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        category: "Burgers",
      },
      {
        id: "1-2",
        name: "Cheese Burger",
        description: "Classic burger with melted cheddar cheese",
        price: 9.99,
        imageUrl:
          "https://images.unsplash.com/photo-1565299507177-b0ac66763828",
        category: "Burgers",
      },
      {
        id: "1-3",
        name: "French Fries",
        description: "Crispy golden fries",
        price: 3.99,
        imageUrl:
          "https://images.unsplash.com/photo-1573080496219-bb080dd4f877",
        category: "Sides",
      },
    ],
  },
  "2": {
    categories: ["Pizza", "Pasta", "Salads"],
    items: [
      {
        id: "2-1",
        name: "Margherita Pizza",
        description: "Fresh tomatoes, mozzarella, basil",
        price: 12.99,
        imageUrl:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
        category: "Pizza",
      },
      {
        id: "2-2",
        name: "Pepperoni Pizza",
        description: "Classic pepperoni with cheese",
        price: 14.99,
        imageUrl:
          "https://images.unsplash.com/photo-1628840042765-356cda07504e",
        category: "Pizza",
      },
      {
        id: "2-3",
        name: "Spaghetti Carbonara",
        description: "Creamy pasta with bacon and parmesan",
        price: 13.99,
        imageUrl:
          "https://images.unsplash.com/photo-1612874742237-6526221588e3",
        category: "Pasta",
      },
    ],
  },
};
