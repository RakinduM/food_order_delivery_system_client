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
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded shadow">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Items:</strong></p>
              <ul className="ml-4 list-disc">
                {order.items.map((item) => (
                  <li key={item.menuItemId}>
                    {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <label htmlFor={`status-${order.id}`} className="block font-medium mb-2">
                  Change Status:
                </label>
                <select
                  id={`status-${order.id}`}
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="border rounded p-2"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;