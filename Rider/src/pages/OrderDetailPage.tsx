import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPinIcon, ClockIcon, ShoppingBagIcon, PhoneIcon, MessageSquareIcon, UserIcon } from 'lucide-react';
import Map from '../components/Map';
import { useDriver } from '../contexts/DriverContext';
import axios from 'axios';

// Mock order details
const mockOrderDetails = {
  id: '68173866b63bfd00087ebdb6',
  restaurantName: 'Perera and Sons',
  restaurantAddress: '123 Kaluagglaa Rd, Kaduwela',
  customerName: 'James Sembu',
  customerAddress: '143, Pahathgama, Malabe',
  items: [
    { name: 'Kottu', quantity: 1 },
    { name: 'Ice Cream', quantity: 1 },
  ],
  totalAmount: 89.0,
  earnings: 8.5,
  distance: 5.3,
  estimatedTime: 25,
  status: 'pending' as const,
  timestamp: new Date(),
  coordinates: {
    pickup: [79.977806, 6.923695] as [number, number],
    dropoff: [79.962746, 6.905469] as [number, number]
  }
};

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { completeOrder } = useDriver();

  // In a real app, this would fetch the order details based on the ID
  const order = mockOrderDetails;

  const handleMarkPickedUp = async () => {
    try {
      // Make the API call to notify the customer that the order is on the way
      await axios.post('http://localhost:8092/api/sms/send-order-on-the-way', null, {
        params: { to: '0774820985' },
      });
      alert('Order marked as picked up and SMS sent successfully!');
    } catch (error) {
      console.error('Failed to send SMS:', error);
      alert('Failed to mark as picked up or send SMS.');
    }
  };

  const handleMarkDelivered = async () => {
    try {
      // Make the API call to notify the customer that the order is delivered
      // await axios.post('http://localhost:8092/api/sms/send-order-delivered', null, {
      //   params: { to: '0774820985' },
      // });
      await axios.get('http://localhost:8092/api/notification/sendDeliverComplete', {
        params: { toEmail: 'rakindumarambe17@gmail.com' },
      });
      alert('Delivery completed and SMS sent successfully!');
      completeOrder();
      navigate('/');
    } catch (error) {
      console.error('Failed to send SMS:', error);
      alert('Failed to complete delivery or send SMS.');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="h-64">
        <Map className="h-full" />
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-xl">{order.restaurantName}</h3>
            <span className="bg-green-500 text-black text-sm font-bold px-2 py-1 rounded">
              ${order.earnings.toFixed(2)}
            </span>
          </div>
          <div className="space-y-3 mb-4">
            <div className="flex items-start">
              <MapPinIcon size={20} className="mr-2 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-medium">Pickup</p>
                <p className="text-sm text-gray-400">{order.restaurantAddress}</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPinIcon size={20} className="mr-2 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-medium">Dropoff</p>
                <p className="text-sm text-gray-400">{order.customerAddress}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <div className="flex items-center">
              <ClockIcon size={16} className="mr-1" />
              <span>{order.estimatedTime} min</span>
            </div>
            <div className="flex items-center">
              <span>{order.distance.toFixed(1)} miles</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-3">
            <ShoppingBagIcon size={18} className="mr-2" />
            <h3 className="font-bold">Order Items</h3>
          </div>
          <ul className="space-y-2">
            {order.items.map((item, index) => (
              <li key={index} className="flex justify-between">
                <div>
                  <span className="font-medium">
                    {item.quantity}x {item.name}
                  </span>
                  {item.notes && <p className="text-xs text-gray-400">{item.notes}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-3">
            <UserIcon size={18} className="mr-2" />
            <h3 className="font-bold">Customer</h3>
          </div>
          <p className="mb-2">{order.customerName}</p>
          <div className="flex space-x-2">
            <button className="flex-1 bg-gray-800 py-2 rounded-lg flex items-center justify-center">
              <PhoneIcon size={16} className="mr-2" />
              Call
            </button>
            <button className="flex-1 bg-gray-800 py-2 rounded-lg flex items-center justify-center">
              <MessageSquareIcon size={16} className="mr-2" />
              Message
            </button>
          </div>
        </div>
        <div className="space-y-3 mt-6">
          <button onClick={handleMarkPickedUp} className="w-full py-3 bg-gray-800 text-white font-medium rounded-lg">
            Mark as Picked Up
          </button>
          <button onClick={handleMarkDelivered} className="w-full py-3 bg-green-500 text-black font-medium rounded-lg">
            Complete Delivery
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;