import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout.tsx';
import UserManagement from './pages/UserManagement';

import Orders from './pages/Order';
import Dashboard from './pages/Dashboard.tsx';
import Delivery from './pages/Delivery.tsx';
import Settings from './pages/Settings.tsx';

export function App() {
  return <Router>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Dashboard/>}/>

        <Route path="users" element={<UserManagement />} />
        <Route path="orders" element={<Orders/>}/>
        <Route path="delivery" element={<Delivery/>}/>
        <Route path="settings" element={<Settings/>}/>
        {/* Additional routes would go here */}
      </Route>
    </Routes>
  </Router>;
}