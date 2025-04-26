import React from 'react';

import { FaShoppingCart, FaStore, FaUsers } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  const barData = [
    { name: 'Mon', orders: 400 },
    { name: 'Tue', orders: 300 },
    { name: 'Wed', orders: 500 },
    { name: 'Thu', orders: 700 },
    { name: 'Fri', orders: 600 },
    { name: 'Sat', orders: 900 },
    { name: 'Sun', orders: 800 },
  ];

  const pieData = [
    { name: 'Food', value: 400 },
    { name: 'Grocery', value: 300 },
    { name: 'Pharmacy', value: 300 },
    { name: 'Other', value: 200 },
  ];

  const pieColors = ['#34D399', '#FBBF24', '#60A5FA', '#F472B6'];

  return (

       
    <div className="space-y-6">
          {/* Add space between sections */}
          <div className="space-y-8">

            {/* Cards Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Orders Card */}
              <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition">
                <div className="bg-green-100 p-3 rounded-full text-green-600 mb-4">
                  <FaShoppingCart size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
                <p className="text-2xl font-bold">1,250</p>
              </div>

              {/* Restaurants Card */}
              <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition">
                <div className="bg-yellow-100 p-3 rounded-full text-yellow-600 mb-4">
                  <FaStore size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Active Restaurants</h3>
                <p className="text-2xl font-bold">320</p>
              </div>

              {/* Users Card */}
              <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600 mb-4">
                  <FaUsers size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Customers</h3>
                <p className="text-2xl font-bold">5,600</p>
              </div>
            </section>

            {/* Charts Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                <h2 className="text-xl font-semibold mb-4">Orders This Week</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#34D399" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                <h2 className="text-xl font-semibold mb-4">Order Types</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>

          </div>
</div>
       

  );
};

export default Dashboard;
