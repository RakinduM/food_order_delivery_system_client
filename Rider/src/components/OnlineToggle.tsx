import React from 'react';
import { useDriver } from '../contexts/DriverContext';
import axios from 'axios';

const VITE_DRIVER_URL = import.meta.env.VITE_API_DRIVER_URL;

const OnlineToggle = () => {
  const { isOnline, toggleOnlineStatus, driverId } = useDriver();

  const updateDriverAvailability = async (isAvailable: boolean) => {
    try {
      await axios.patch(`${VITE_DRIVER_URL}/driver/${driverId}/availability`, {
        isAvailable,
      });
      console.log(`Driver availability updated to: ${isAvailable}`);
    } catch (error) {
      console.error('Failed to update driver availability:', error);
    }
  };

  const handleToggle = () => {
    toggleOnlineStatus(); // Toggle the online status in the context
    updateDriverAvailability(!isOnline); // Update the driver's availability on the server
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors focus:outline-none ${
        isOnline ? 'bg-green-500' : 'bg-gray-600'
      }`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
          isOnline ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export default OnlineToggle;