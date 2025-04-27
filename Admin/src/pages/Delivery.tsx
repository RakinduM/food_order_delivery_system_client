import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';

interface Delivery {
  id: number;
  driverName: string;
  deliveryDate: string; // ISO date string
  status: 'Pending' | 'Completed';
  location: string;
}

const Delivery: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    { id: 1, driverName: 'Mike Johnson', deliveryDate: '2025-04-26T13:45:00Z', status: 'Pending', location: 'Downtown' },
    { id: 2, driverName: 'Sarah Lee', deliveryDate: '2025-04-25T11:20:00Z', status: 'Completed', location: 'Uptown' },
    { id: 3, driverName: 'Chris Evans', deliveryDate: '2025-04-24T17:00:00Z', status: 'Pending', location: 'City Center' },
  ]);

  const markAsCompleted = (id: number) => {
    setDeliveries(prevDeliveries =>
      prevDeliveries.map(delivery =>
        delivery.id === id ? { ...delivery, status: 'Completed' } : delivery
      )
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">


      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-auto">


        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <div className="space-y-6">

            {/* Page Title */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
              <h1 className="text-3xl font-bold text-gray-900">Deliveries හිරුනි</h1>
            </div>

            {/* Deliveries Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-800">{delivery.driverName}</h2>
                    <p className="text-sm text-gray-500">
                      Delivery Date: {new Date(delivery.deliveryDate).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Location: {delivery.location}
                    </p>

                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        delivery.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {delivery.status}
                    </span>
                  </div>

                  {delivery.status === 'Pending' && (
                    <button
                      onClick={() => markAsCompleted(delivery.id)}
                      className="mt-4 w-full text-center bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 rounded-lg transition-all"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Delivery;
