import React, { useState, createContext, useContext, useMemo, useCallback } from "react";
import { MenuItem } from "../utils/mockMenuData";

interface CartItem extends MenuItem {
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, restaurantId: string, restaurantName: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback(
    (item: MenuItem, restaurantId: string, restaurantName: string) => {
      setItems((currentItems) => {
        const existingItem = currentItems.find((i) => i.id === item.id);
        if (existingItem) {
          return currentItems.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  quantity: i.quantity + 1,
                }
              : i
          );
        }
        return [
          ...currentItems,
          {
            ...item,
            quantity: 1,
            restaurantId,
            restaurantName,
          },
        ];
      });
    },
    []
  );

  const removeItem = useCallback((itemId: string) => {
    setItems((items) => items.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 0) {
      console.error("Quantity cannot be negative");
      return;
    }
    setItems((items) =>
      items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
