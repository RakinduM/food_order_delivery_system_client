import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  items: { name: string; quantity: number; price: number }[];
}

interface OrderContextType {
  orders: Order[];
  fetchOrders: () => Promise<void>;
  loading: boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const ORDERS_API_URL = import.meta.env.VITE_API_ORDER_URL;

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const response = await axios.get(`${ORDERS_API_URL}/orders/customer/${user.id}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return (
    <OrderContext.Provider value={{ orders, fetchOrders, loading }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}