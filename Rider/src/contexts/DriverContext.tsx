import React, { useState, createContext, useContext, ReactNode } from "react";
import { Order } from "../types/types";
import { useAuth } from "../contexts/AuthContext"; // Import the AuthContext
import stompWebSocketService from "../utils/WebSocket";

interface DriverContextType {
  isOnline: boolean;
  toggleOnlineStatus: () => void;
  currentOrder: Order | null;
  acceptOrder: (order: Order) => void;
  completeOrder: () => void;
  sendDriverLocation: () => void;
  earnings: number;
  orderHistory: Order[];
  driverId: string | null; // Add driverId to the context
}

const DriverContext = createContext<DriverContextType | undefined>(undefined);

export const useDriver = () => {
  const context = useContext(DriverContext);
  if (context === undefined) {
    throw new Error("useDriver must be used within a DriverProvider");
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

    const assignPayload = {
      orderId: order.id,
      //driverId: driverId, // Replace with actual logged-in driver ID
      restaurantLatitude: order.coordinates.pickup[1],
      restaurantLongitude: order.coordinates.pickup[0],
      customerLatitude: order.coordinates.dropoff[1],
      customerLongitude: order.coordinates.dropoff[0],
    };

    // Subscribe to updates for this order
    stompWebSocketService.subscribeToTopic(
      `/topic/delivery/${order.id}`,
      (msg) => {
        console.log("Assignment update received:", msg);
        // You can update state or UI here based on delivery assignment result
        // e.g. setCurrentOrder(prev => ({ ...prev, status: msg.status }));
      }
    );

    // Send assignment request to backend
    stompWebSocketService.send("/app/delivery/assign-auto", assignPayload);
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
      stompWebSocketService.unsubscribeFromTopic(`/topic/delivery/${currentOrder.id}`);
      setEarnings(earnings + currentOrder.earnings);
      setCurrentOrder(null);

    }
  };

  const sendDriverLocation = () => {
    if (!driverId) {
      console.error("Driver ID is not available.");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationPayload = {
            driverId: driverId,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          // Send location to backend
          stompWebSocketService.send("/app/driver/location", locationPayload);
          console.log("Driver location sent:", locationPayload);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
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
        sendDriverLocation,
        earnings,
        orderHistory,
        driverId, // Provide driverId in the context
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};
