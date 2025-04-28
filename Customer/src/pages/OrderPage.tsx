import React from "react";
import { useOrder } from "../contexts/OrderContext";

export function OrdersPage() {
  const { orders, loading } = useOrder();

  if (loading) {
    return <div className="text-center mt-6">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center mt-6">No orders found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className="mb-4 border-b pb-4">
          <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
          <p>Status: {order.status}</p>
          <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
          <h3 className="font-semibold mt-2">Items:</h3>
          <ul className="list-disc pl-5">
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} x ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}