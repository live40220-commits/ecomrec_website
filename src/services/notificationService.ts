// src/services/notificationService.ts
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import type { Notification, AuthUser } from "@/types/models";

export const notificationService = {
  // Get all notifications for a user (creates empty collection if none)
  async getNotifications(userId: string): Promise<Notification[]> {
    const q = collection(db, "notifications", userId, "items");
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as Notification);
  },

  // Add a new notification for a user
  async addNotification(userId: string, payload: Omit<Notification, "id" | "createdAt">): Promise<void> {
    const notifRef = doc(collection(db, "notifications", userId, "items"));
    const newNotif: Notification = {
      id: notifRef.id,
      userId,
      createdAt: serverTimestamp(),
      read: false,
      ...payload,
    } as any;
    await setDoc(notifRef, newNotif);
  },

  // Mark a notification as read
  async markAsRead(userId: string, notificationId: string): Promise<void> {
    const notifRef = doc(db, "notifications", userId, "items", notificationId);
    await updateDoc(notifRef, { read: true, updatedAt: serverTimestamp() });
  },

  // Real‑time listener for a user's notifications
  onNotificationChange(userId: string, callback: (notifications: Notification[]) => void): () => void {
    const q = collection(db, "notifications", userId, "items");
    const unsub = onSnapshot(q, snap => {
      const notifs = snap.docs.map(d => d.data() as Notification);
      callback(notifs);
    });
    return unsub;
  },
};
