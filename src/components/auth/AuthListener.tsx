// src/components/auth/AuthListener.tsx
"use client";
import { FC, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

export const AuthListener: FC<{ children: ReactNode }> = ({ children }) => {
  // The hook sets up Firebase auth listener and syncs Redux state.
  useAuth();
  return <>{children}</>;
};
