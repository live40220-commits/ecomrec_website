// src/hooks/useWishlist.ts
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/hooks/useAuth";
import { wishlistService } from "@/services/wishlistService";
import { setWishlist, toggleWishlist } from "@/store/store";
import type { Wishlist } from "@/types/models";

/**
 * Hook to manage user's wishlist.
 * Syncs Firestore via wishlistService and updates Redux state.
 */
export const useWishlist = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const wishlist = useSelector((state: any) => state.commerce.wishlist) as string[];

  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(setWishlist([]));
      return;
    }
    const userId = user.id;
    setIsSyncing(true);
    wishlistService.getWishlist(userId).then((w) => {
      dispatch(setWishlist(w.productIds));
      setIsSyncing(false);
    });
    const unsub = wishlistService.onWishlistChange(userId, (w) => {
      dispatch(setWishlist(w.productIds));
    });
    return () => unsub();
  }, [user, dispatch]);

  const toggle = async (productId: string) => {
    if (!user) return;
    await wishlistService.addProduct(user.id, productId).catch(async () => {
      // if already exists, remove
      await wishlistService.removeProduct(user.id, productId);
    });
    // Optimistic UI handled by real‑time listener
  };

  return { wishlist, isSyncing, toggle };
};
