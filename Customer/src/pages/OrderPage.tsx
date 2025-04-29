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
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Order ID</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Total Amount</th>
            <th className="border border-gray-300 px-4 py-2">Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{order.id}</td>
              <td className="border border-gray-300 px-4 py-2">{order.status}</td>
              <td className="border border-gray-300 px-4 py-2">${order.totalAmount.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2">
                <ul className="list-disc ml-4">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}