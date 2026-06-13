// src/store/store.ts
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, products as initialProducts } from "@/data/products";
import type { Notification, Order, AuthUser } from "@/types/models";

type Line = { id: string; qty: number; size?: string; color?: string };
export type UserState = { id?: string; email: string; name: string; role: "super_admin" | "admin" | "staff" | "user" };
export type OrderState = {
  id: string;
  items: Line[];
  totalAmount: number;
  shippingAddress: any;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  trackingNumber?: string;
  createdAt: any;
  updatedAt: any;
};

type CommerceState = {
  cart: Line[];
  wishlist: string[];
  recentlyViewed: string[];
  darkMode: boolean;
  cartDrawerOpen: boolean;
  products: Product[];
  user: UserState | null;
  priceTier: "all" | "premium" | "simple";
  orders: OrderState[];
  notifications: Notification[];
};

const initialState: CommerceState = {
  cart: [],
  wishlist: [],
  recentlyViewed: [],
  darkMode: false,
  cartDrawerOpen: false,
  products: initialProducts,
  user: null,
  priceTier: "all",
  orders: [],
  notifications: [],
};

const commerceSlice = createSlice({
  name: "commerce",
  initialState,
  reducers: {
    // Cart actions
    openCartDrawer: (state) => { state.cartDrawerOpen = true; },
    closeCartDrawer: (state) => { state.cartDrawerOpen = false; },
    addToCart: (state, action: PayloadAction<Line>) => {
      const found = state.cart.find(
        (i) => i.id === action.payload.id && i.size === action.payload.size && i.color === action.payload.color,
      );
      if (found) found.qty += action.payload.qty;
      else state.cart.push(action.payload);
    },
    updateQty: (state, action: PayloadAction<{ id: string; qty: number }>) => {
      state.cart = state.cart.map((i) => (i.id === action.payload.id ? { ...i, qty: Math.max(1, action.payload.qty) } : i));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => { state.cart = []; },
    setCart: (state, action: PayloadAction<Line[]>) => { state.cart = action.payload; },
    // Wishlist actions
    toggleWishlist: (state, action: PayloadAction<string>) => {
      state.wishlist = state.wishlist.includes(action.payload)
        ? state.wishlist.filter((id) => id !== action.payload)
        : [...state.wishlist, action.payload];
    },
    setWishlist: (state, action: PayloadAction<string[]>) => { state.wishlist = action.payload; },
    // Recently viewed
    viewProduct: (state, action: PayloadAction<string>) => {
      state.recentlyViewed = [action.payload, ...state.recentlyViewed.filter((id) => id !== action.payload)].slice(0, 6);
    },
    // UI
    toggleDarkMode: (state) => { state.darkMode = !state.darkMode; },
    // Products
    setProducts: (state, action: PayloadAction<Product[]>) => { state.products = action.payload; },
    addProduct: (state, action: PayloadAction<Product>) => { state.products.push(action.payload); },
    updateProduct: (state, action: PayloadAction<Product>) => {
      state.products = state.products.map((p) => (p.id === action.payload.id ? action.payload : p));
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    // Auth
    loginUser: (state, action: PayloadAction<UserState>) => { state.user = action.payload; },
    logoutUser: (state) => { state.user = null; },
    // Pricing
    setPriceTier: (state, action: PayloadAction<"all" | "premium" | "simple">) => { state.priceTier = action.payload; },
    // Orders
    setOrders: (state, action: PayloadAction<OrderState[]>) => { state.orders = action.payload; },
    createOrder: (state, action: PayloadAction<OrderState>) => { state.orders.push(action.payload); },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: string }>) => {
      state.orders = state.orders.map((o) => (o.id === action.payload.id ? { ...o, status: action.payload.status } : o));
    },
    deleteOrder: (state, action: PayloadAction<string>) => { state.orders = state.orders.filter((o) => o.id !== action.payload); },
    // Notifications
    setNotifications: (state, action: PayloadAction<Notification[]>) => { state.notifications = action.payload; },
    addNotification: (state, action: PayloadAction<Notification>) => { state.notifications.push(action.payload); },
    markNotificationRead: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.map((n) => (n.id === action.payload ? { ...n, read: true } : n));
    },
  },
});

export const {
  openCartDrawer,
  closeCartDrawer,
  addToCart,
  updateQty,
  removeFromCart,
  clearCart,
  setCart,
  toggleWishlist,
  setWishlist,
  viewProduct,
  toggleDarkMode,
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  loginUser,
  logoutUser,
  setPriceTier,
  setOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  setNotifications,
  addNotification,
  markNotificationRead,
} = commerceSlice.actions;

export const store = configureStore({ reducer: { commerce: commerceSlice.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
