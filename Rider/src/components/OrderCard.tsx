import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPinIcon, ClockIcon, DollarSignIcon } from "lucide-react";
import { Order } from "../types/types";
import { useDriver } from "../contexts/DriverContext";
interface OrderCardProps {
  order: Order;
  showActions?: boolean;
}
const OrderCard: React.FC<OrderCardProps> = ({
  order,
  showActions = false,
}) => {
  const navigate = useNavigate();
  const { acceptOrder } = useDriver();
  const handleAccept = (e: React.MouseEvent) => {
    e.stopPropagation();
    acceptOrder(order);
    navigate("/");
  };
  const handleReject = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would call an API to reject the order
    console.log("Order rejected:", order.id);
  };
  const handleCardClick = () => {
    navigate(`/orders/${order.id}`);
  };
  return (
    <div
      className="bg-gray-900 rounded-lg p-4 mb-4 shadow-md cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">{order.restaurantName}</h3>
        <span className="bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">
          ${order.earnings.toFixed(2)}
        </span>
      </div>
      <div className="space-y-2 mb-3">
        <div className="flex items-start">
          <MapPinIcon size={18} className="mr-2 text-green-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Pickup</p>
            <p className="text-xs text-gray-400">{order.restaurantAddress}</p>
          </div>
        </div>
        <div className="flex items-start">
          <MapPinIcon size={18} className="mr-2 text-red-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Dropoff</p>
            <p className="text-xs text-gray-400">{order.customerAddress}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-400">
        <div className="flex items-center">
          <ClockIcon size={14} className="mr-1" />
          <span>{order.estimatedTime} min</span>
        </div>
        <div className="flex items-center">
          <DollarSignIcon size={14} className="mr-1" />
          <span>Order: ${order.totalAmount.toFixed(2)}</span>
        </div>
      </div>
      {showActions && (
        <div className="flex mt-4 space-x-2">
          <button
            onClick={handleAccept}
            className="flex-1 bg-green-500 text-black font-medium py-2 rounded-lg"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="flex-1 bg-gray-700 text-white font-medium py-2 rounded-lg"
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
};
export default OrderCard;
