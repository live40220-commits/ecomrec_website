// src/services/reviewService.ts
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc, query, where, getDocs, onSnapshot, serverTimestamp } from "firebase/firestore";
import type { Review } from "@/types/models";

export const reviewService = {
  // Add a review for a product
  async addReview(review: Omit<Review, "id" | "createdAt">): Promise<Review> {
    const ref = await addDoc(collection(db, "reviews"), {
      ...review,
      createdAt: serverTimestamp(),
    });
    const snapshot = await getDoc(ref);
    return { id: ref.id, ...(snapshot.data() as Omit<Review, "id">) } as Review;
  },
  async getProductReviews(productId: string): Promise<Review[]> {
    const q = query(collection(db, "reviews"), where("productId", "==", productId));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Review, "id">) } as Review));
  },
  async updateReview(reviewId: string, data: Partial<Review>): Promise<void> {
    await updateDoc(doc(db, "reviews", reviewId), { ...data, updatedAt: serverTimestamp() });
  },
  async deleteReview(reviewId: string): Promise<void> {
    await deleteDoc(doc(db, "reviews", reviewId));
  },
  onProductReviews(productId: string, callback: (reviews: Review[]) => void): () => void {
    const q = query(collection(db, "reviews"), where("productId", "==", productId));
    const unsub = onSnapshot(q, snap => {
      const revs = snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Review, "id">) } as Review));
      callback(revs);
    });
    return unsub;
  },
};
