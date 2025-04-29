import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';

interface Order {
  id: number;
  restaurantName: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
}

const Order: React.FC = () => {
  const [orders] = useState<Order[]>([
    { id: 1, restaurantName: 'Pizza Palace', customerName: 'John Doe', orderDate: '2025-04-25T15:30:00Z', totalAmount: 25.99 },
    { id: 2, restaurantName: 'Burger Hub', customerName: 'Jane Smith', orderDate: '2025-04-26T11:00:00Z', totalAmount: 15.50 },
    { id: 3, restaurantName: 'Pizza Palace', customerName: 'Alice Brown', orderDate: '2025-04-24T18:20:00Z', totalAmount: 30.00 },
  ]);

  const [restaurantFilter, setRestaurantFilter] = useState<string>('');

  const filteredOrders = orders
    .filter(order =>
      restaurantFilter ? order.restaurantName.toLowerCase().includes(restaurantFilter.toLowerCase()) : true
    )
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());

  return (
    <div className="flex h-screen overflow-hidden">


      {/* Main Content */}


        <main className="flex-1 p-6 bg-gray-100">
          <div className="space-y-6">

            {/* Page Title */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
              <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <input
                type="text"
                placeholder="Filter by restaurant name"
                value={restaurantFilter}
                onChange={(e) => setRestaurantFilter(e.target.value)}
                className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400"
              />
            </div>

            {/* Orders Table */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Restaurant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order, idx) => (
                        <tr key={order.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.restaurantName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(order.orderDate).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            ${order.totalAmount.toFixed(2)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                          No orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
  );
};

export default Order;
