import React, { useState } from 'react';
import OrderCard from '../components/OrderCard';
import { useDriver } from '../contexts/DriverContext';
// Mock data for past orders
const mockPastOrders = [{
  id: 'order789',
  restaurantName: 'Taco Time',
  restaurantAddress: '789 Broadway, New York, NY',
  customerName: 'Emma Johnson',
  customerAddress: '321 5th Ave, New York, NY',
  items: [{
    name: 'Beef Tacos',
    quantity: 3
  }, {
    name: 'Chips & Salsa',
    quantity: 1
  }],
  totalAmount: 18.95,
  earnings: 7.25,
  distance: 1.8,
  estimatedTime: 20,
  status: 'delivered' as const,
  timestamp: new Date(Date.now() - 86400000),
  completed: true,
  coordinates: {
    pickup: [-74.006, 40.7128],
    dropoff: [-74.009, 40.72]
  }
}, {
  id: 'order456',
  restaurantName: 'Pizza Palace',
  restaurantAddress: '456 5th Ave, New York, NY',
  customerName: 'Sarah Williams',
  customerAddress: '789 Park Ave, New York, NY',
  items: [{
    name: 'Large Pepperoni Pizza',
    quantity: 1
  }, {
    name: 'Garlic Knots',
    quantity: 1
  }, {
    name: '2L Soda',
    quantity: 1
  }],
  totalAmount: 28.75,
  earnings: 9.5,
  distance: 3.1,
  estimatedTime: 30,
  status: 'delivered' as const,
  timestamp: new Date(Date.now() - 172800000),
  completed: true,
  coordinates: {
    pickup: [-73.995, 40.71],
    dropoff: [-73.985, 40.72]
  }
}];
const OrdersPage = () => {
  const {
    orderHistory
  } = useDriver();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  // Combine mock data with context order history
  const allPastOrders = [...orderHistory, ...mockPastOrders];
  return <div className="p-4">
      <div className="flex mb-4 bg-gray-800 rounded-lg p-1">
        <button className={`flex-1 py-2 rounded-md text-center ${activeTab === 'upcoming' ? 'bg-green-500 text-black' : 'text-gray-400'}`} onClick={() => setActiveTab('upcoming')}>
          Upcoming
        </button>
        <button className={`flex-1 py-2 rounded-md text-center ${activeTab === 'past' ? 'bg-green-500 text-black' : 'text-gray-400'}`} onClick={() => setActiveTab('past')}>
          Past
        </button>
      </div>
      <div className="mt-4">
        {activeTab === 'upcoming' ? <div>
            {/* In a real app, this would show upcoming orders */}
            <p className="text-center text-gray-400 py-8">No upcoming orders</p>
          </div> : <div>
            {allPastOrders.length > 0 ? allPastOrders.map(order => <OrderCard key={order.id} order={order} />) : <p className="text-center text-gray-400 py-8">No past orders</p>}
          </div>}
      </div>
    </div>;
};
export default OrdersPage;