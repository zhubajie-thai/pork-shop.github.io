
export interface Product {
  id: string;
  name: string;
  category: PorkCategory;
  price: number;
  unit: string;
  description: string;
  imageUrl: string;
}

export enum PorkCategory {
  CHOPS = 'Chops & Steaks',
  ROASTS = 'Roasts',
  RIBS = 'Ribs',
  SAUSAGES = 'Sausages & Bacon',
  SPECIALTY = 'Specialty Cuts'
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  difficulty: 'Easy' | 'Intermediate' | 'Advanced';
}

export interface User {
  id: string;
  name: string;
  email: string;
}

// Basic customer record for orders and admin views
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
}

// Order domain model
export type OrderStatus = 'pending' | 'paid' | 'preparing' | 'shipped' | 'completed' | 'cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  id: string;
  customer: Customer;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: string; // ISO date string
}
