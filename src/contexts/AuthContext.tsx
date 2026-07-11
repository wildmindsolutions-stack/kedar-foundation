'use client';

import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { apiFetch } from '@/lib/api';
import type { AuthResponse, FoundationCustomer } from '@/lib/types';

const TOKEN_KEY = 'kedar-foundation-token';
const USER_KEY = 'kedar-foundation-user';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  city?: string;
  state?: string;
}

interface AuthContextValue {
  user: FoundationCustomer | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<{ profileFromErp?: boolean }>;
  logout: () => void;
  placeOrder: (items: { productId: string; qty: number; rate: number }[]) => Promise<{ id: string; awaitingStock?: boolean }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FoundationCustomer | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const persistAuth = useCallback((data: AuthResponse) => {
    localStorage.setItem(TOKEN_KEY, data.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    setToken(data.accessToken);
    setUser(data.user);
  }, []);

  useEffect(() => {
    async function restore() {
      try {
        const savedToken = localStorage.getItem(TOKEN_KEY);
        if (!savedToken) return;

        const savedUser = localStorage.getItem(USER_KEY);
        if (savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser) as FoundationCustomer);
        }

        const profile = await apiFetch<FoundationCustomer>('/store/auth/me', { token: savedToken });
        setUser(profile);
        localStorage.setItem(USER_KEY, JSON.stringify(profile));
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    restore();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await apiFetch<AuthResponse>('/store/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    persistAuth(data);
  }, [persistAuth]);

  const register = useCallback(async (data: RegisterData) => {
    const res = await apiFetch<AuthResponse>('/store/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    persistAuth(res);
    return { profileFromErp: res.profileFromErp };
  }, [persistAuth]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const placeOrder = useCallback(async (
    items: { productId: string; qty: number; rate: number }[],
  ) => {
    if (!token) throw new Error('Please log in to place an order');
    const order = await apiFetch<{ id: string; awaitingStock?: boolean }>('/store/orders', {
      method: 'POST',
      token,
      body: JSON.stringify({ items }),
    });
    return order;
  }, [token]);

  const value = useMemo(
    () => ({
      user, token, isLoading, login, register, logout, placeOrder,
    }),
    [user, token, isLoading, login, register, logout, placeOrder],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
