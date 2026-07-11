'use client';

import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import type { CartItem, StoreProduct } from '@/lib/types';

const CART_KEY = 'kedar-foundation-cart';

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (product: StoreProduct, quantity?: number) => { ok: boolean; message?: string };
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => { ok: boolean; message?: string };
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  getStockShortfall: (productId: string) => number;
  hasStockShortfall: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const getStockShortfall = useCallback(
    (productId: string) => {
      const item = items.find((i) => i.product.id === productId);
      if (!item) return 0;
      return Math.max(0, item.quantity - Math.floor(item.product.stock));
    },
    [items],
  );

  const hasStockShortfall = useMemo(
    () => items.some((i) => i.quantity > Math.floor(i.product.stock)),
    [items],
  );

  const addItem = useCallback((product: StoreProduct, quantity = 1) => {
    if (!product.inStock || product.stock < 1) {
      return { ok: false, message: `${product.name} is out of stock.` };
    }

    let message: string | undefined;
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      const newQty = (existing?.quantity ?? 0) + quantity;
      if (newQty > Math.floor(product.stock)) {
        message = `Only ${Math.floor(product.stock)} ${product.unit} in stock. Extra units will require production before confirmation.`;
      }
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: newQty, product }
            : i,
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsOpen(true);
    return { ok: true, message };
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      return { ok: true };
    }

    let message: string | undefined;
    setItems((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (!item) return prev;
      if (quantity > Math.floor(item.product.stock)) {
        message = `Only ${Math.floor(item.product.stock)} ${item.product.unit} in stock. Extra units need production.`;
      }
      return prev.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i,
      );
    });
    return { ok: true, message };
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getStockShortfall,
      hasStockShortfall,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [items, itemCount, total, addItem, removeItem, updateQuantity, clearCart, getStockShortfall, hasStockShortfall, isOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
