import React from "react";
import { XIcon, MinusIcon, PlusIcon, ShoppingBagIcon } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export function CartSidebar({
  isOpen,
  onClose,
  onLoginClick,
}: CartSidebarProps) {
  const { items, removeItem, updateQuantity, total } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Extract the restaurantId from the first item in the cart
  const restaurantId = items.length > 0 ? items[0].restaurantId : null;

  const handleProceedToOrder = () => {
    if (restaurantId) {
      navigate(`/order-summary/${restaurantId}`); // Pass the restaurantId in the URL
    } else {
      console.error("No restaurant ID found in the cart.");
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-[#000000]/50"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <ShoppingBagIcon className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center py-4 border-b">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.restaurantName}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                      >
                        <MinusIcon className="h-5 w-5" />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <PlusIcon className="h-5 w-5" />
                      </button>
                      <div className="ml-auto">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 text-gray-500 hover:text-gray-700"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {items.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              {isAuthenticated ? (
                <button
                  onClick={handleProceedToOrder} // Navigate to order summary
                  className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
                >
                  Proceed to Order
                </button>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
                >
                  Login to Checkout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}