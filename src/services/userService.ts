// src/services/userService.ts
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { AuthUser } from "@/types/models";

export const userService = {
  async getUser(uid: string): Promise<AuthUser | null> {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? (snap.data() as AuthUser) : null;
  },
  async createUser(user: AuthUser): Promise<void> {
    await setDoc(doc(db, "users", user.id), user);
  },
  async updateUser(uid: string, data: Partial<AuthUser>): Promise<void> {
    await updateDoc(doc(db, "users", uid), data);
  },
  async deleteUser(uid: string): Promise<void> {
    await deleteDoc(doc(db, "users", uid));
  },
};
