import { useState, useEffect } from "react";
import axios from "axios";

interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerId: string;
  restaurantId: string;
  totalAmount: number;
  status: string; // Assuming OrderStatus is a string (e.g., "PENDING", "COMPLETED")
  items: OrderItem[];
  createdAt: string; // ISO string for date
  updatedAt: string; // ISO string for date
}

export const useOrders = (restaurantId: string) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const VITE_ORDERS_API_URL = import.meta.env.VITE_API_ORDERS_URL;

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${VITE_ORDERS_API_URL}/orders/restaurant/${restaurantId}`);
      setOrders(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await axios.put(`${VITE_ORDERS_API_URL}/orders/${orderId}/status?status=${newStatus}`);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: response.data.status } : order
        )
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update order status");
    }
  };

  useEffect(() => {
    if (restaurantId) {
      fetchOrders();
    }
  }, [restaurantId]);

  return {
    orders,
    isLoading,
    error,
    refetch: fetchOrders, // Function to manually refetch orders
    updateOrderStatus, // Function to update the status of an order
  };
};