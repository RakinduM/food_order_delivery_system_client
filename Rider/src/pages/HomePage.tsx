import React, { useEffect, useState } from 'react';
import Map from '../components/Map';
import { useDriver } from '../contexts/DriverContext';
import OrderCard from '../components/OrderCard';
// Mock data for incoming order
const mockIncomingOrder = {
  id: 'order123',
  restaurantName: 'Perera and Sons',
  restaurantAddress: '123 Kaluagglaa Rd, Mattegoda',
  customerName: 'James Sembu',
  customerAddress: '143, Pahathgama, Hanwella',
  items: [{
    name: 'Kottu',
    quantity: 1
  }, {
    name: 'Ice Cream',
    quantity: 1
  }],
  totalAmount: 89.00,
  earnings: 8.5,
  distance: 5.3,
  estimatedTime: 25,
  status: 'pending' as const,
  timestamp: new Date(),
  coordinates: {
    pickup: [80.095885, 6.913008] as [number, number],
    dropoff: [80.087579, 6.902191] as [number, number]
  }
};
const HomePage = () => {
  const {
    isOnline,
    currentOrder,
    toggleOnlineStatus
  } = useDriver();
  const [incomingOrder, setIncomingOrder] = useState<typeof mockIncomingOrder | null>(null);
  // Simulate receiving orders when online
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOnline && !currentOrder && !incomingOrder) {
      timer = setTimeout(() => {
        setIncomingOrder(mockIncomingOrder);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isOnline, currentOrder, incomingOrder]);
  // Current delivery UI
  const renderCurrentDelivery = () => {
    if (!currentOrder) return null;
    return <div className="absolute bottom-4 left-4 right-4 bg-gray-900 rounded-lg p-4 shadow-lg z-10">
        <h3 className="font-bold text-lg mb-2">Current Delivery</h3>
        <OrderCard order={currentOrder} />
      </div>;
  };
  // Incoming order UI
  const renderIncomingOrder = () => {
    if (!incomingOrder) return null;
    return <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-20">
        <div className="w-full max-w-md bg-gray-900 rounded-lg p-4 shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-center">
            New Order Request
          </h2>
          <OrderCard order={incomingOrder} showActions={true} />
        </div>
      </div>;
  };
  // Offline state UI
  const renderOfflineState = () => {
    return <div className="h-full flex flex-col items-center justify-center p-4 text-center">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mb-4">
          <span className="text-red-500 text-5xl">⚠</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">You're offline</h2>
        <p className="text-gray-400 mb-6">
          Go online to start receiving delivery requests
        </p>
        <button onClick={toggleOnlineStatus} className="px-6 py-3 bg-green-500 text-black font-medium rounded-lg">
          Go Online
        </button>
      </div>;
  };
  return <div className="relative h-full">
      {isOnline ? <>
          <Map className="h-full w-full" />
          {renderCurrentDelivery()}
          {renderIncomingOrder()}
        </> : renderOfflineState()}
    </div>;
};
export default HomePage;