import React, { useState, createContext, useContext, ReactNode } from 'react';
import { Order } from '../types/types';
import { useAuth } from '../contexts/AuthContext'; // Import the AuthContext

interface DriverContextType {
  isOnline: boolean;
  toggleOnlineStatus: () => void;
  currentOrder: Order | null;
  acceptOrder: (order: Order) => void;
  completeOrder: () => void;
  earnings: number;
  orderHistory: Order[];
  driverId: string | null; // Add driverId to the context
}

const DriverContext = createContext<DriverContextType | undefined>(undefined);

export const useDriver = () => {
  const context = useContext(DriverContext);
  if (context === undefined) {
    throw new Error('useDriver must be used within a DriverProvider');
  }
  return context;
};

interface DriverProviderProps {
  children: ReactNode;
}

export const DriverProvider = ({ children }: DriverProviderProps) => {
  const { user } = useAuth(); // Access the logged-in user from AuthContext
  const driverId = user?.id || null; // Assume `id` is the driver's ID in the AuthContext

  const [isOnline, setIsOnline] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [earnings, setEarnings] = useState(0);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  const acceptOrder = (order: Order) => {
    setCurrentOrder(order);
  };

  const completeOrder = () => {
    if (currentOrder) {
      setOrderHistory([
        ...orderHistory,
        {
          ...currentOrder,
          completed: true,
        },
      ]);
      setEarnings(earnings + currentOrder.earnings);
      setCurrentOrder(null);
    }
  };

  return (
    <DriverContext.Provider
      value={{
        isOnline,
        toggleOnlineStatus,
        currentOrder,
        acceptOrder,
        completeOrder,
        earnings,
        orderHistory,
        driverId, // Provide driverId in the context
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};