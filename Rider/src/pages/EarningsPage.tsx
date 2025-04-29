import React, { useState } from 'react';
import { ChevronDownIcon, TrendingUpIcon, ClockIcon, CalendarIcon } from 'lucide-react';
import { useDriver } from '../contexts/DriverContext';
const mockEarningsData = {
  currentWeek: {
    total: 245.75,
    trips: 18,
    hours: 12.5,
    days: [{
      day: 'Mon',
      amount: 45.25
    }, {
      day: 'Tue',
      amount: 52.5
    }, {
      day: 'Wed',
      amount: 38.75
    }, {
      day: 'Thu',
      amount: 0
    }, {
      day: 'Fri',
      amount: 0
    }, {
      day: 'Sat',
      amount: 58.25
    }, {
      day: 'Sun',
      amount: 51.0
    }]
  },
  previousWeek: {
    total: 328.5,
    trips: 24,
    hours: 16.5
  }
};
const EarningsPage = () => {
  const {
    earnings
  } = useDriver();
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  // Combine mock data with context earnings
  const totalEarnings = mockEarningsData.currentWeek.total + earnings;
  return <div className="p-4">
      <div className="relative mb-4">
        <button className="w-full flex items-center justify-between bg-gray-800 px-4 py-3 rounded-lg" onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}>
          <span>{selectedPeriod}</span>
          <ChevronDownIcon size={20} />
        </button>
        {showPeriodDropdown && <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 rounded-lg shadow-lg z-10">
            {['Today', 'This Week', 'Last Week', 'This Month'].map(period => <button key={period} className="w-full text-left px-4 py-3 hover:bg-gray-700" onClick={() => {
          setSelectedPeriod(period);
          setShowPeriodDropdown(false);
        }}>
                {period}
              </button>)}
          </div>}
      </div>
      <div className="bg-gray-900 rounded-lg p-5 mb-6">
        <p className="text-gray-400 mb-1">Total Earnings</p>
        <h2 className="text-3xl font-bold">${totalEarnings.toFixed(2)}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center mb-1">
            <TrendingUpIcon size={16} className="mr-1 text-green-500" />
            <p className="text-gray-400 text-sm">Trips</p>
          </div>
          <p className="text-xl font-bold">
            {mockEarningsData.currentWeek.trips}
          </p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center mb-1">
            <ClockIcon size={16} className="mr-1 text-green-500" />
            <p className="text-gray-400 text-sm">Online Hours</p>
          </div>
          <p className="text-xl font-bold">
            {mockEarningsData.currentWeek.hours}
          </p>
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg p-4 mb-6">
        <h3 className="font-bold mb-4">Daily Breakdown</h3>
        <div className="space-y-4">
          {mockEarningsData.currentWeek.days.map(day => <div key={day.day} className="flex items-center justify-between">
              <span>{day.day}</span>
              <span className="font-medium">${day.amount.toFixed(2)}</span>
            </div>)}
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold">Recent Payments</h3>
          <button className="text-sm text-green-500">See All</button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-800">
            <div className="flex items-center">
              <CalendarIcon size={16} className="mr-3 text-gray-400" />
              <div>
                <p className="font-medium">Last Week</p>
                <p className="text-xs text-gray-400">May 1 - May 7</p>
              </div>
            </div>
            <span className="font-medium">
              ${mockEarningsData.previousWeek.total.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <CalendarIcon size={16} className="mr-3 text-gray-400" />
              <div>
                <p className="font-medium">Two Weeks Ago</p>
                <p className="text-xs text-gray-400">Apr 24 - Apr 30</p>
              </div>
            </div>
            <span className="font-medium">$287.25</span>
          </div>
        </div>
      </div>
    </div>;
};
export default EarningsPage;