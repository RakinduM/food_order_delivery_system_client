import React from "react";
import { useOrders } from "@/hooks/useOrders";

interface OrdersPageProps {
  restaurantId: string;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ restaurantId }) => {
  const { orders, isLoading, error, refetch, updateOrderStatus } = useOrders(restaurantId);

  const statuses = ["PLACED", "PROCESSING", "READY_TO_DELIVER", "DELIVER", "COMPLETED"];

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus);
  };

  if (isLoading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={refetch}>Retry</button>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 rounded mb-4">
        <h1 className="text-3xl font-bold">Restaurant Orders</h1>
        <p>Manage and update the status of your orders</p>
      </header>

      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">Total Amount</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Items</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                <td className="border border-gray-300 px-4 py-2">${order.totalAmount.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <ul className="list-disc ml-4">
                    {order.items.map((item) => (
                      <li key={item.menuItemId}>
                        {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <label htmlFor={`status-${order.id}`} className="block font-medium mb-2">
                    Change Status:
                  </label>
                  <select
                    id={`status-${order.id}`}
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border rounded p-2 w-full"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersPage;