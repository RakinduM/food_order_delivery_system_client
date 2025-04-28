import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RestaurantDashboard from './pages/RestaurantDashboard';
import { LoginModal } from './pages/Login';
import { RegisterModal } from './pages/Register';

const App: React.FC = () => {
  const getRestaurantId = () => {
    return localStorage.getItem('restaurantId');
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              getRestaurantId() ? (
                <RestaurantDashboard restaurantId={getRestaurantId()!} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/login" element={<LoginModal onClose={() => {}} onSwitchToRegister={() => window.location.href = '/register'} />} />
          <Route path="/register" element={<RegisterModal onClose={() => {}} onSwitchToLogin={() => window.location.href = '/login'} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;