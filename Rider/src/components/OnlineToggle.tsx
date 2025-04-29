import React from 'react';
import { useDriver } from '../contexts/DriverContext';
const OnlineToggle = () => {
  const {
    isOnline,
    toggleOnlineStatus
  } = useDriver();
  return <button onClick={toggleOnlineStatus} className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors focus:outline-none ${isOnline ? 'bg-green-500' : 'bg-gray-600'}`}>
      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isOnline ? 'translate-x-7' : 'translate-x-1'}`} />
    </button>;
};
export default OnlineToggle;