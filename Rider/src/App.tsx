import React, { JSX, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DriverProvider } from "./contexts/DriverContext";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";
import EarningsPage from "./pages/EarningsPage";
import ProfilePage from "./pages/ProfilePage";
import OrderDetailPage from "./pages/OrderDetailPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import stompWebSocketService from "./utils/WebSocket";

// Component to protect routes that require authentication
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export function App() {
  // useEffect(() => {
  //   // Connect to WebSocket on app load
  //   stompWebSocketService.connect((data) => {
  //     console.log("Received from server:", data);
  //   });

  //   return () => {
  //     // Disconnect WebSocket on app unload
  //     stompWebSocketService.disconnect();
  //   };
  // }, []);

  // const handleSend = () => {
  //   stompWebSocketService.send("/app/send", {
  //     content: "Hello from React",
  //   });
  // };

  return (
    <AuthProvider>
      <BrowserRouter>
        <DriverProvider>
          {/* <button onClick={handleSend}>Send Message</button> */}
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<Layout />}>
              {/* Protect routes that require authentication */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <PrivateRoute>
                    <OrdersPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/orders/:id"
                element={
                  <PrivateRoute>
                    <OrderDetailPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/earnings"
                element={
                  <PrivateRoute>
                    <EarningsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </DriverProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}