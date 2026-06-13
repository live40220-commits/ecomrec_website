// src/types/models.ts

export interface AuthUser {
  id: string; // Firebase UID
  email: string;
  name: string;
  role: "super_admin" | "admin" | "staff" | "user";
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[]; // URLs stored in Firebase Storage
  categoryId: string;
  // other fields as needed, preserving existing schema
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  updatedAt: any; // Firestore timestamp
}

export interface Wishlist {
  userId: string;
  productIds: string[];
  updatedAt: any;
}

export interface Address {
  id: string;
  userId: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: Address;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  trackingNumber?: string;
  createdAt: any;
  updatedAt: any;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: any;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: any;
  // optional fields for FCM payload
  data?: Record<string, string>;
}
