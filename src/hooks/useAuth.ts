// src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "@/store/store";
import type { AuthUser } from "@/types/auth";

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        let profile: AuthUser;
        if (userDoc.exists()) {
          profile = userDoc.data() as AuthUser;
        } else {
          profile = {
            id: firebaseUser.uid,
            email: firebaseUser.email ?? "",
            name: firebaseUser.displayName ?? "",
            role: "user" as const,
          };
          await setDoc(doc(db, "users", firebaseUser.uid), profile);
        }
        setUser(profile);
        dispatch(loginUser(profile));
        localStorage.setItem("jahanara_user", JSON.stringify(profile));
      } else {
        setUser(null);
        dispatch(logoutUser());
        localStorage.removeItem("jahanara_user");
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return { user };
};
