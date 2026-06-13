// src/hooks/useCart.ts
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/hooks/useAuth";
import { cartService } from "@/services/cartService";
import { setCart as setCartAction } from "@/store/store";
import type { Cart, CartItem } from "@/types/models";

/**
 * Custom hook to manage the user's cart.
 * It syncs the cart in Firestore via cartService and updates the Redux store.
 */
export const useCart = () => {
  const dispatch = useDispatch();
  const { user } = useAuth(); // user could be null if not logged in
  const cart = useSelector((state: any) => state.commerce.cart) as CartItem[];

  const [isSyncing, setIsSyncing] = useState(false);

  // Load cart on auth change
  useEffect(() => {
    if (loading) return;
    if (!user) {
      // clear cart when logged out
      dispatch(setCartAction([]));
      return;
    }
    const userId = user.id;
    setIsSyncing(true);
    // initial fetch
    cartService.getCart(userId).then((c) => {
      dispatch(setCartAction(c.items));
      setIsSyncing(false);
    });
    // subscribe to real‑time updates
    const unsubscribe = cartService.onCartChange(userId, (c) => {
      dispatch(setCartAction(c.items));
    });
    return () => {
      unsubscribe();
    };
  }, [user, loading, dispatch]);

  const addToCart = async (item: CartItem) => {
    if (!user) return;
    await cartService.addItem(user.id, item);
    // optimistic update handled by real‑time listener
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;
    await cartService.removeItem(user.id, productId);
  };

  const clearCart = async () => {
    if (!user) return;
    await cartService.clearCart(user.id);
  };

  return {
    cart,
    isSyncing,
    addToCart,
    removeFromCart,
    clearCart,
  };
};
