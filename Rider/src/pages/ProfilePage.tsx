import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import the AuthContext
import { UserIcon, StarIcon, CarIcon, ShieldCheckIcon, BellIcon, HelpCircleIcon, LogOutIcon } from 'lucide-react';

// Mock driver data
const mockDriverData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '(555) 123-4567',
  profileImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
  rating: 4.8,
  totalDeliveries: 342,
  vehicle: {
    type: 'car',
    model: 'Toyota Corolla',
    licensePlate: 'ABC 1234',
  },
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Use the logout function from AuthContext

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <div className="bg-gray-900 rounded-lg p-5 mb-6 flex items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
          <img src={mockDriverData.profileImage} alt={mockDriverData.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{mockDriverData.name}</h2>
          <div className="flex items-center">
            <StarIcon size={16} className="text-yellow-400 mr-1" />
            <span className="text-sm">
              {mockDriverData.rating} • {mockDriverData.totalDeliveries} deliveries
            </span>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg mb-6">
        <div className="p-4 border-b border-gray-800 flex items-center">
          <UserIcon size={20} className="mr-4 text-gray-400" />
          <div>
            <p className="text-sm text-gray-400">Account</p>
            <p>{mockDriverData.email}</p>
          </div>
        </div>
        <div className="p-4 flex items-center">
          <CarIcon size={20} className="mr-4 text-gray-400" />
          <div>
            <p className="text-sm text-gray-400">Vehicle</p>
            <p>
              {mockDriverData.vehicle.model} • {mockDriverData.vehicle.licensePlate}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg mb-6">
        <button className="w-full p-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center">
            <ShieldCheckIcon size={20} className="mr-4 text-gray-400" />
            <span>Security</span>
          </div>
          <ChevronRightIcon size={20} className="text-gray-400" />
        </button>
        <button className="w-full p-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center">
            <BellIcon size={20} className="mr-4 text-gray-400" />
            <span>Notifications</span>
          </div>
          <ChevronRightIcon size={20} className="text-gray-400" />
        </button>
        <button className="w-full p-4 flex items-center justify-between">
          <div className="flex items-center">
            <HelpCircleIcon size={20} className="mr-4 text-gray-400" />
            <span>Help</span>
          </div>
          <ChevronRightIcon size={20} className="text-gray-400" />
        </button>
      </div>
      <button
        onClick={handleLogout}
        className="w-full p-4 flex items-center justify-center bg-gray-800 rounded-lg text-red-500"
      >
        <LogOutIcon size={20} className="mr-2" />
        <span>Sign Out</span>
      </button>
    </div>
  );
};

const ChevronRightIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default ProfilePage;