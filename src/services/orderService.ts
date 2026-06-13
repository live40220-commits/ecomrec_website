// src/services/orderService.ts
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, onSnapshot, serverTimestamp } from "firebase/firestore";
import type { Order, CartItem, Address, AuthUser } from "@/types/models";

export const orderService = {
  // Place a new order
  async createOrder(user: AuthUser, items: CartItem[], shippingAddress: Address, totalAmount: number): Promise<{ ok: boolean; order?: Order; message?: string }> {
    try {
      const orderRef = doc(collection(db, "orders"));
      const newOrder: Order = {
        id: orderRef.id,
        userId: user.id,
        items,
        totalAmount,
        shippingAddress: { ...shippingAddress, id: "" }, // address embedded
        status: "Pending",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      } as any;
      await setDoc(orderRef, newOrder);
      return { ok: true, order: newOrder };
    } catch (e: any) {
      return { ok: false, message: e.message ?? "Failed to create order" };
    }
  },
  // Cancel order (only if still pending)
  async cancelOrder(orderId: string, userId: string): Promise<{ ok: boolean; message?: string }> {
    try {
      const orderRef = doc(db, "orders", orderId);
      const snap = await getDoc(orderRef);
      if (!snap.exists()) return { ok: false, message: "Order not found" };
      const order = snap.data() as Order;
      if (order.userId !== userId) return { ok: false, message: "Unauthorized" };
      if (order.status !== "Pending") return { ok: false, message: "Cannot cancel at this stage" };
      await updateDoc(orderRef, { status: "Cancelled", updatedAt: serverTimestamp() });
      return { ok: true };
    } catch (e: any) {
      return { ok: false, message: e.message };
    }
  },
  // Get all orders for a user
  async getUserOrders(userId: string): Promise<Order[]> {
    const q = query(collection(db, "orders"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as Order);
  },
  // Real‑time listener for a user's orders
  onUserOrders(userId: string, callback: (orders: Order[]) => void): () => void {
    const q = query(collection(db, "orders"), where("userId", "==", userId));
    const unsub = onSnapshot(q, snap => {
      const orders = snap.docs.map(d => d.data() as Order);
      callback(orders);
    });
    return unsub;
  },
  // Update order status (admin only)
  async updateStatus(orderId: string, status: Order["status"], trackingNumber?: string): Promise<void> {
    const ref = doc(db, "orders", orderId);
    const data: Partial<Order> = { status, updatedAt: serverTimestamp() };
    if (trackingNumber) data.trackingNumber = trackingNumber;
    await updateDoc(ref, data);
  },
};
