'use client';

import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import type { CartItem, StoreProduct } from '@/lib/types';
import { fetchLiveStoreProducts, isFallbackCatalogProduct } from '@/lib/products';

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
  prepareForCheckout: () => Promise<{ ok: true; items: CartItem[] } | { ok: false; message: string }>;
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
      if (!item || item.product.inStock) return 0;
      return item.quantity;
    },
    [items],
  );

  const hasStockShortfall = useMemo(
    () => items.some((i) => !i.product.inStock),
    [items],
  );

  const addItem = useCallback((product: StoreProduct, quantity = 1) => {
    if (isFallbackCatalogProduct(product.id)) {
      return {
        ok: false,
        message: 'Ordering is unavailable while the product catalog is offline. Please try again later.',
      };
    }

    let message: string | undefined;
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      const newQty = (existing?.quantity ?? 0) + quantity;
      if (!product.inStock) {
        message = `${product.name} is out of stock. Your order will be held until production is complete.`;
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
      if (!item.product.inStock) {
        message = `${item.product.name} is out of stock. Extra units may require production before confirmation.`;
      }
      return prev.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i,
      );
    });
    return { ok: true, message };
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const prepareForCheckout = useCallback(async (): Promise<
    { ok: true; items: CartItem[] } | { ok: false; message: string }
  > => {
    const current = loadCart();
    if (!current.length) {
      return { ok: false, message: 'Your cart is empty.' };
    }

    if (current.some((item) => isFallbackCatalogProduct(item.product.id))) {
      return {
        ok: false,
        message: 'Your cart has offline demo products. Please clear the cart and add items again while the store is connected.',
      };
    }

    try {
      const liveCatalog = await fetchLiveStoreProducts();
      const byId = new Map(liveCatalog.map((product) => [product.id, product]));
      const updated: CartItem[] = [];
      let removed = false;

      for (const item of current) {
        const fresh = byId.get(item.product.id);
        if (!fresh) {
          removed = true;
          continue;
        }
        updated.push({ product: fresh, quantity: item.quantity });
      }

      if (!updated.length) {
        setItems([]);
        return {
          ok: false,
          message: 'Products in your cart are no longer available. Please add items again.',
        };
      }

      setItems(updated);

      if (removed) {
        return {
          ok: false,
          message: 'Some items were removed because they are no longer available. Please review your cart and try again.',
        };
      }

      return { ok: true, items: updated };
    } catch {
      return {
        ok: false,
        message: 'Could not reach the store. Please check your connection and try again.',
      };
    }
  }, []);

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
      prepareForCheckout,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [items, itemCount, total, addItem, removeItem, updateQuantity, clearCart, getStockShortfall, hasStockShortfall, prepareForCheckout, isOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
