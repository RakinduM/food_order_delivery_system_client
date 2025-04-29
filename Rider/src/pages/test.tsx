import React, { useEffect, useState } from 'react';
import Map from '../components/Map';
import { useDriver } from '../contexts/DriverContext';
import OrderCard from '../components/OrderCard';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';

// Mock data for incoming order
const mockIncomingOrder = {
  id: 'order123',
  restaurantName: 'Burger Palace',
  restaurantAddress: '123 Main St, New York, NY',
  customerName: 'John Smith',
  customerAddress: '456 Park Ave, New York, NY',
  items: [
    { name: 'Double Cheeseburger', quantity: 1 },
    { name: 'French Fries', quantity: 1 },
    { name: 'Chocolate Shake', quantity: 1 },
  ],
  totalAmount: 23.45,
  earnings: 8.5,
  distance: 2.3,
  estimatedTime: 25,
  status: 'pending' as const,
  timestamp: new Date(),
  coordinates: {
    pickup: [80.096057, 6.912862],
    dropoff: [80.110447, 6.924201],
  },
};

const VITE_DRIVER_URL = import.meta.env.VITE_API_DRIVER_URL;

const HomePage = () => {
  const { isOnline, currentOrder, toggleOnlineStatus, driverId } = useDriver();
  const [incomingOrder, setIncomingOrder] = useState<typeof mockIncomingOrder | null>(null);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  // Update driver availability on the server
  const updateDriverAvailability = async (isAvailable: boolean) => {
    try {
      await axios.patch(`${VITE_DRIVER_URL}/driver/${driverId}/availability`, {
        isAvailable,
      });
      console.log(`Driver availability updated to: ${isAvailable}`);
    } catch (error) {
      console.error(`Failed to update driver availability of ${driverId} cause `, error);
    }
  };

  const handleToggleOnlineStatus = () => {
    toggleOnlineStatus(); // Toggle the online status in the context
    updateDriverAvailability(!isOnline); // Update the driver's availability on the server
  };

  useEffect(() => {
    if (isOnline) {
      console.log('Driver is online, initializing WebSocket connection...');
      const socket = new SockJS('http://localhost:8086/ws'); // WebSocket URL
      const client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        onConnect: () => {
          console.log('Connected to STOMP server');
          // Notify the server that the driver is online
          client.publish({
            destination: '/app/driver/online',
            body: JSON.stringify({ type: 'DRIVER_ONLINE' }),
          });

          // Set the mock incoming order
          setIncomingOrder(mockIncomingOrder);
        },
        onStompError: (frame) => {
          console.error('STOMP error:', frame);
        },
      });

      client.activate();
      setStompClient(client);

      return () => {
        console.log('Deactivating STOMP client...');
        client.deactivate(); // Clean up the STOMP client on unmount or offline
      };
    } else {
      console.log('Driver is offline, resetting state...');
      stompClient?.deactivate();
      setStompClient(null);
      setIncomingOrder(null);
    }
  }, [isOnline]);

  // Current delivery UI
  const renderCurrentDelivery = () => {
    if (!currentOrder) return null;
    return (
      <div className="absolute bottom-4 left-4 right-4 bg-gray-900 rounded-lg p-4 shadow-lg z-10">
        <h3 className="font-bold text-lg mb-2">Current Delivery</h3>
        <OrderCard order={currentOrder} />
      </div>
    );
  };

  // Incoming order UI
  const renderIncomingOrder = () => {
    if (!incomingOrder) return null;
    return (
      <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-20">
        <div className="w-full max-w-md bg-gray-900 rounded-lg p-4 shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-center">New Order Request</h2>
          <OrderCard order={incomingOrder} showActions={true} />
        </div>
      </div>
    );
  };

  // Offline state UI
  const renderOfflineState = () => {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4 text-center">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mb-4">
          <span className="text-red-500 text-5xl">⚠</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">You're offline</h2>
        <p className="text-gray-400 mb-6">Go online to start receiving delivery requests</p>
        <button
          onClick={handleToggleOnlineStatus}
          className="px-6 py-3 bg-green-500 text-black font-medium rounded-lg"
        >
          Go Online
        </button>
      </div>
    );
  };

  return (
    <div className="relative h-full">
      {isOnline ? (
        <>
          <Map className="h-full w-full" />
          {renderCurrentDelivery()}
          {renderIncomingOrder()}
        </>
      ) : (
        renderOfflineState()
      )}
    </div>
  );
};

export default HomePage;