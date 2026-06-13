// src/services/cartService.ts
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, onSnapshot, arrayUnion, arrayRemove } from "firebase/firestore";
import type { Cart, CartItem } from "@/types/models";

export const cartService = {
  // Get cart for a user (creates if missing)
  async getCart(userId: string): Promise<Cart> {
    const cartRef = doc(db, "carts", userId);
    const snap = await getDoc(cartRef);
    if (snap.exists()) {
      return snap.data() as Cart;
    }
    const emptyCart: Cart = { userId, items: [], updatedAt: new Date() } as any;
    await setDoc(cartRef, emptyCart);
    return emptyCart;
  },
  // Add or update item
  async addItem(userId: string, item: CartItem): Promise<void> {
    const cartRef = doc(db, "carts", userId);
    const snap = await getDoc(cartRef);
    const cart = snap.exists() ? (snap.data() as Cart) : { userId, items: [], updatedAt: new Date() } as any;
    const existing = cart.items.find(i => i.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.items.push(item);
    }
    await setDoc(cartRef, { ...cart, updatedAt: new Date() });
  },
  async removeItem(userId: string, productId: string): Promise<void> {
    const cartRef = doc(db, "carts", userId);
    const snap = await getDoc(cartRef);
    if (!snap.exists()) return;
    const cart = snap.data() as Cart;
    cart.items = cart.items.filter(i => i.productId !== productId);
    await setDoc(cartRef, { ...cart, updatedAt: new Date() });
  },
  async clearCart(userId: string): Promise<void> {
    const cartRef = doc(db, "carts", userId);
    await setDoc(cartRef, { userId, items: [], updatedAt: new Date() } as any);
  },
  // Subscribe to real‑time updates
  onCartChange(userId: string, callback: (cart: Cart) => void): () => void {
    const cartRef = doc(db, "carts", userId);
    const unsub = onSnapshot(cartRef, snap => {
      if (snap.exists()) callback(snap.data() as Cart);
    });
    return unsub;
  },
};
