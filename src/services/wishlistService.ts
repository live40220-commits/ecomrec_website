// src/services/wishlistService.ts
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import type { Wishlist } from "@/types/models";

export const wishlistService = {
  async getWishlist(userId: string): Promise<Wishlist> {
    const ref = doc(db, "wishlists", userId);
    const snap = await getDoc(ref);
    if (snap.exists()) return snap.data() as Wishlist;
    const empty: Wishlist = { userId, productIds: [], updatedAt: new Date() } as any;
    await setDoc(ref, empty);
    return empty;
  },
  async addProduct(userId: string, productId: string): Promise<void> {
    const ref = doc(db, "wishlists", userId);
    const snap = await getDoc(ref);
    const list = snap.exists() ? (snap.data() as Wishlist) : { userId, productIds: [], updatedAt: new Date() } as any;
    if (!list.productIds.includes(productId)) list.productIds.push(productId);
    await setDoc(ref, { ...list, updatedAt: new Date() });
  },
  async removeProduct(userId: string, productId: string): Promise<void> {
    const ref = doc(db, "wishlists", userId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;
    const list = snap.data() as Wishlist;
    list.productIds = list.productIds.filter(id => id !== productId);
    await setDoc(ref, { ...list, updatedAt: new Date() });
  },
  onWishlistChange(userId: string, callback: (list: Wishlist) => void): () => void {
    const ref = doc(db, "wishlists", userId);
    const unsub = onSnapshot(ref, snap => {
      if (snap.exists()) callback(snap.data() as Wishlist);
    });
    return unsub;
  },
};
