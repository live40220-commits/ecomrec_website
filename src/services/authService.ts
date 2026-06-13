// src/services/authService.ts
import { auth, db } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, signInWithPopup, User as FirebaseUser } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import type { AuthUser } from "@/types/auth";

const googleProvider = new GoogleAuthProvider();

export const authService = {
  // Email & password login
  async login(email: string, password: string): Promise<{ ok: boolean; user?: AuthUser; message?: string }> {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = cred.user;
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      let userData: AuthUser;
      if (userDoc.exists()) {
        userData = userDoc.data() as AuthUser;
      } else {
        // fallback: create minimal profile
        userData = {
          id: firebaseUser.uid,
          email: firebaseUser.email ?? email,
          name: firebaseUser.displayName ?? "",
          role: "user" as const,
        };
        await setDoc(doc(db, "users", firebaseUser.uid), userData);
      }
      return { ok: true, user: userData };
    } catch (e: any) {
      return { ok: false, message: e.message ?? "Login failed" };
    }
  },
  // Registration
  async register(email: string, password: string, firstName: string, lastName: string): Promise<{ ok: boolean; user?: AuthUser; message?: string }> {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = cred.user;
      const userData: AuthUser = {
        id: firebaseUser.uid,
        email,
        name: `${firstName} ${lastName}`,
        role: "user" as const,
      };
      await setDoc(doc(db, "users", firebaseUser.uid), userData);
      return { ok: true, user: userData };
    } catch (e: any) {
      return { ok: false, message: e.message ?? "Registration failed" };
    }
  },
  // Google Sign‑In
  async signInWithGoogle(): Promise<{ ok: boolean; user?: AuthUser; message?: string }> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      let userData: AuthUser;
      if (userDoc.exists()) {
        userData = userDoc.data() as AuthUser;
      } else {
        userData = {
          id: firebaseUser.uid,
          email: firebaseUser.email ?? "",
          name: firebaseUser.displayName ?? "",
          role: "user" as const,
        };
        await setDoc(doc(db, "users", firebaseUser.uid), userData);
      }
      return { ok: true, user: userData };
    } catch (e: any) {
      return { ok: false, message: e.message ?? "Google sign‑in failed" };
    }
  },
  // Password reset
  async resetPassword(email: string): Promise<{ ok: boolean; message?: string }> {
    try {
      await sendPasswordResetEmail(auth, email);
      return { ok: true };
    } catch (e: any) {
      return { ok: false, message: e.message ?? "Reset failed" };
    }
  },
  // Sign out
  async logout(): Promise<void> {
    await signOut(auth);
  },
  // Helper to get current Firebase user
  getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  },
};
