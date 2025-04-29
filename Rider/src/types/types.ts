export interface Order {
  id: string;
  restaurantName: string;
  restaurantAddress: string;
  customerName: string;
  customerAddress: string;
  items: OrderItem[];
  totalAmount: number;
  earnings: number;
  distance: number;
  estimatedTime: number;
  status: 'pending' | 'accepted' | 'pickedUp' | 'delivered' | 'cancelled';
  timestamp: Date;
  completed?: boolean;
  coordinates: {
    pickup: [number, number];
    dropoff: [number, number];
  };
}
export interface OrderItem {
  name: string;
  quantity: number;
  notes?: string;
}
export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  vehicle: {
    type: 'car' | 'motorcycle' | 'bicycle';
    model: string;
    licensePlate: string;
  };
  rating: number;
  totalDeliveries: number;
  accountBalance: number;
}