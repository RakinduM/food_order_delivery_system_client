import React from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const STRIPE_API_KEY = import.meta.env.VITE_API_STRIPE_URL; // Replace with your Stripe API key
// Initialize Stripe with your public key
const STRIP_PUBLIC_KEY = import.meta.env.VITE_STRIPE_KEY; // Replace with your Stripe public key
const stripePromise = loadStripe(STRIP_PUBLIC_KEY); // Replace with your Stripe public key

export function OrderSummary() {
  const { items, total } = useCart();
  const { user } = useAuth(); // Assuming `user` contains the logged-in user's details
  const { id: restaurantId } = useParams<{ id: string }>();

  // Default geo-coordinates
  const customerLatitude = 6.902191;
  const customerLongitude = 80.087579;
  const restaurantLatitude = 6.913008;
  const restaurantLongitude = 80.095885;

  // Order status
  const status = "Pending";

  // Prepare order items
  const orderItems = items.map((item) => ({
    menuItemId: item.id,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  }));

  return (
    <Elements stripe={stripePromise}>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Order Summary</h1>

        {/* Customer and Restaurant Details */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Order Details</h2>
          <p>
            <strong>Customer ID:</strong> {user?.id || "Not Logged In"}
          </p>
          <p>
            <strong>Restaurant ID:</strong> {restaurantId || "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {status}
          </p>
          <p>
            <strong>Total Amount:</strong> ${total.toFixed(2)}
          </p>
        </div>

        {/* Geo-coordinates */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Geo-coordinates</h2>
          <p>
            <strong>Customer Latitude:</strong> {customerLatitude}
          </p>
          <p>
            <strong>Customer Longitude:</strong> {customerLongitude}
          </p>
          <p>
            <strong>Restaurant Latitude:</strong> {restaurantLatitude}
          </p>
          <p>
            <strong>Restaurant Longitude:</strong> {restaurantLongitude}
          </p>
        </div>

        {/* Order Items */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Order Items</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Menu Item ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => (
                <tr key={item.menuItemId}>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.menuItemId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Payment</h2>
          <PaymentForm total={total} />
        </div>
      </div>
    </Elements>
  );
}

function PaymentForm({ total }: { total: number }) {
  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Create a payment session on the server using Axios
      const response = await axios.post(`${STRIPE_API_KEY}/checkout`, {
        amount: total * 100, // Stripe expects the amount in cents
        quantity: 1, // Default quantity
        name: "Order Payment", // Name of the order
        currency: "USD", // Default currency
      });

      console.log("Backend response:", response.data); // Log the backend response for debugging

      const { status, sessionUrl, message } = response.data;

      if (status === "SUCCESS" && sessionUrl) {
        // Redirect to the Stripe Checkout page
        window.location.href = sessionUrl;
      } else {
        console.error("Failed to create payment session:", message || "Unknown error");
        alert("Failed to create payment session. Please try again.");
      }
    } catch (error) {
      console.error("Error creating payment session:", error);
      alert("An error occurred while processing your payment. Please try again.");
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
      >
        Pay ${total.toFixed(2)}
      </button>
    </form>
  );
}