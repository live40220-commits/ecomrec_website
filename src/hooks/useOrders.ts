// src/hooks/useOrders.ts
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/hooks/useAuth";
import { orderService } from "@/services/orderService";
import { setOrders } from "@/store/store";
import type { Order } from "@/types/models";

/**
 * Hook to manage user's orders.
 * It loads orders from Firestore and keeps them in sync via a real‑time listener.
 */
export const useOrders = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const orders = useSelector((state: any) => state.commerce.orders) as Order[];
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {

    if (!user) {
      dispatch(setOrders([]));
      return;
    }
    const userId = user.id;
    setIsSyncing(true);
    orderService.getUserOrders(userId).then((list) => {
      dispatch(setOrders(list));
      setIsSyncing(false);
    });
    const unsub = orderService.onUserOrders(userId, (list) => {
      dispatch(setOrders(list));
    });
    return () => unsub();
  }, [user, dispatch]);

  const cancelOrder = async (orderId: string) => {
    if (!user) return false;
    const result = await orderService.cancelOrder(orderId, user.id);
    return result.ok;
  };

  return { orders, isSyncing, cancelOrder };
};
