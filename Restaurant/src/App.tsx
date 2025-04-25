import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantDashboard from './pages/RestaurantDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<RestaurantDashboard restaurantId="12345" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;