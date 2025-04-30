export interface Category {
  name: string;
  imageUrl: string;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  deliveryTime: number;
  deliveryFee: number;
  distance: number;
  categories: string[];
  imageUrl: string;
}

export const categories: Category[] = [
  {
    name: 'Fast Food',
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Pizza',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=3181&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Healthy',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Sushi',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Mexican',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Chinese',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Italian',
    imageUrl: 'https://images.unsplash.com/photo-1574636573716-062c8c8c6179?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Dessert',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Vegetarian',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
];

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Burger Palace',
    rating: 4.7,
    deliveryTime: 25,
    deliveryFee: 2.99,
    distance: 1.2,
    categories: ['Fast Food', 'American'],
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '2',
    name: 'Pizza Heaven',
    rating: 4.5,
    deliveryTime: 30,
    deliveryFee: 1.99,
    distance: 0.8,
    categories: ['Pizza', 'Italian'],
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '3',
    name: 'Green Bowl',
    rating: 4.8,
    deliveryTime: 20,
    deliveryFee: 3.99,
    distance: 1.5,
    categories: ['Healthy', 'Salads', 'Vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '4',
    name: 'Sushi Express',
    rating: 4.6,
    deliveryTime: 35,
    deliveryFee: 4.99,
    distance: 2.0,
    categories: ['Sushi', 'Japanese'],
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '5',
    name: 'Taco Fiesta',
    rating: 4.3,
    deliveryTime: 25,
    deliveryFee: 2.49,
    distance: 1.7,
    categories: ['Mexican', 'Fast Food'],
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '6',
    name: 'Noodle House',
    rating: 4.4,
    deliveryTime: 30,
    deliveryFee: 0,
    distance: 1.3,
    categories: ['Chinese', 'Asian'],
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
];