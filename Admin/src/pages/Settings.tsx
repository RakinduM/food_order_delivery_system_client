import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';

const Settings: React.FC = () => {
  const [email, setEmail] = useState('user@example.com');
  const [username, setUsername] = useState('john_doe');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const handleDarkModeChange = () => {
    setIsDarkMode(!isDarkMode);
    // You could add logic to switch the theme here if needed (CSS class or localStorage).
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
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            </div>

            {/* Settings Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Settings */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Settings</h2>
                <form>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="mt-4 w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 rounded-lg"
                      >
                        Save Profile
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Notification Settings */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Settings</h2>
                <form>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notifications"
                        checked={isNotificationsEnabled}
                        onChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
                        className="h-4 w-4 border-gray-300 rounded"
                      />
                      <label htmlFor="notifications" className="ml-3 text-sm text-gray-600">
                        Enable Notifications
                      </label>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="mt-4 w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 rounded-lg"
                      >
                        Save Notifications
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Theme Settings */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Theme Settings</h2>
                <form>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="darkmode"
                        checked={isDarkMode}
                        onChange={handleDarkModeChange}
                        className="h-4 w-4 border-gray-300 rounded"
                      />
                      <label htmlFor="darkmode" className="ml-3 text-sm text-gray-600">
                        Dark Mode
                      </label>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="mt-4 w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 rounded-lg"
                      >
                        Save Theme
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Account Settings */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>
                <button
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg"
                  onClick={() => alert('Account deleted')}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
