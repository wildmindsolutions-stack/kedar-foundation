'use client';

import Link from 'next/link';
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/products';
import { cn } from '@/lib/utils';

export function CartDrawer() {
  const {
    items, itemCount, total, isOpen, closeCart,
    updateQuantity, removeItem, clearCart,
  } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[60] bg-kedar-navy/50 backdrop-blur-sm"
        onClick={closeCart}
        aria-label="Close cart"
      />
      <aside
        className={cn(
          'fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform',
        )}
      >
        <div className="flex items-center justify-between border-b border-kedar-navy/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-kedar-gold" />
            <h2 className="font-serif text-lg font-semibold text-kedar-navy">
              Your Cart ({itemCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-lg p-2 text-kedar-navy/60 hover:bg-kedar-cream"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingCart className="mb-4 h-12 w-12 text-kedar-navy/20" />
              <p className="font-medium text-kedar-navy/70">Your cart is empty</p>
              <p className="mt-1 text-sm text-kedar-navy/50">Browse our products and add items.</p>
              <Link href="/products" className="btn-primary mt-6" onClick={closeCart}>
                View Products
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex gap-3 rounded-xl border border-kedar-navy/10 p-3"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-kedar-gold/15 font-serif text-sm font-bold text-kedar-gold-dark">
                    {product.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${product.id}`}
                      className="font-medium text-kedar-navy hover:text-kedar-gold-dark"
                      onClick={closeCart}
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-kedar-navy/55">
                      {formatPrice(product.price)} / {product.unit}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="rounded border border-kedar-navy/15 p-1 hover:bg-kedar-cream"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-[1.5rem] text-center text-sm font-medium">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="rounded border border-kedar-navy/15 p-1 hover:bg-kedar-cream"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="ml-auto rounded p-1 text-red-500 hover:bg-red-50"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-kedar-navy">
                    {formatPrice(product.price * quantity)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-kedar-navy/10 px-5 py-4">
            <div className="mb-4 flex justify-between text-base">
              <span className="text-kedar-navy/70">Subtotal</span>
              <span className="font-serif text-xl font-bold text-kedar-navy">{formatPrice(total)}</span>
            </div>
            <p className="mb-4 text-xs text-kedar-navy/50">
              GST included where applicable. For bulk orders, contact our team.
            </p>
            <Link href="/contact" className="btn-primary w-full" onClick={closeCart}>
              Request Quote / Enquire
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="mt-2 w-full py-2 text-xs text-kedar-navy/50 hover:text-kedar-navy"
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
