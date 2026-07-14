'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AlertTriangle, CheckCircle, Loader2, LogIn, Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/products';
import { cn } from '@/lib/utils';

export function CartDrawer() {
  const { user, placeOrder } = useAuth();
  const {
    items, itemCount, total, isOpen, closeCart,
    updateQuantity, removeItem, clearCart, getStockShortfall, hasStockShortfall, prepareForCheckout,
  } = useCart();
  const [placing, setPlacing] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [orderAwaitingStock, setOrderAwaitingStock] = useState(false);
  const [error, setError] = useState('');
  const [itemMessage, setItemMessage] = useState('');

  if (!isOpen) return null;

  async function handlePlaceOrder() {
    setError('');
    setPlacing(true);
    try {
      const prepared = await prepareForCheckout();
      if (!prepared.ok) {
        setError(prepared.message);
        return;
      }

      const result = await placeOrder(
        prepared.items.map(({ product, quantity }) => ({
          productId: product.id,
          qty: quantity,
          rate: product.price,
        })),
      );
      setOrderAwaitingStock(Boolean(result?.awaitingStock));
      setOrderDone(true);
      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not place order.');
    } finally {
      setPlacing(false);
    }
  }

  function handleClose() {
    setOrderDone(false);
    setOrderAwaitingStock(false);
    setError('');
    setItemMessage('');
    closeCart();
  }

  function handleUpdateQty(productId: string, qty: number) {
    const result = updateQuantity(productId, qty);
    if (result.message) {
      setItemMessage(result.message);
      setTimeout(() => setItemMessage(''), 4000);
    }
  }

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[60] bg-kedar-navy/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-label="Close cart"
      />
      <aside className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-kedar-navy/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-kedar-gold" />
            <h2 className="font-serif text-lg font-semibold text-kedar-navy">
              Your Cart ({itemCount})
            </h2>
          </div>
          <button type="button" onClick={handleClose} className="rounded-lg p-2 text-kedar-navy/60 hover:bg-kedar-cream" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {orderDone ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <CheckCircle className="mb-4 h-14 w-14 text-green-500" />
              <p className="font-serif text-xl font-semibold text-kedar-navy">Order Placed!</p>
              <p className="mt-2 text-sm text-kedar-navy/65">
                {orderAwaitingStock
                  ? 'Your order is received. Some items need production before our team can confirm it. We will notify you when ready.'
                  : 'Your order has been sent to our sales team. They will review and confirm it shortly.'}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/orders" className="btn-primary" onClick={handleClose}>
                  View My Orders
                </Link>
                <button type="button" onClick={handleClose} className="rounded-xl border border-kedar-navy/15 px-5 py-2.5 text-sm font-medium text-kedar-navy hover:bg-kedar-cream">
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingCart className="mb-4 h-12 w-12 text-kedar-navy/20" />
              <p className="font-medium text-kedar-navy/70">Your cart is empty</p>
              <Link href="/products" className="btn-primary mt-6" onClick={handleClose}>
                View Products
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => {
                const shortfall = getStockShortfall(product.id);
                return (
                  <li key={product.id} className="flex gap-3 rounded-xl border border-kedar-navy/10 p-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-kedar-gold/15 font-serif text-sm font-bold text-kedar-gold-dark">
                      {product.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link href={`/products/${product.id}`} className="font-medium text-kedar-navy hover:text-kedar-gold-dark" onClick={handleClose}>
                        {product.name}
                      </Link>
                      <p className="text-xs text-kedar-navy/55">
                        {formatPrice(product.price)} / {product.unit}
                      </p>
                      {shortfall > 0 && (
                        <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-amber-700">
                          <AlertTriangle className="h-3 w-3" />
                          Awaiting production before confirmation
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        <button type="button" onClick={() => handleUpdateQty(product.id, quantity - 1)} className="rounded border border-kedar-navy/15 p-1 hover:bg-kedar-cream" aria-label="Decrease">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm font-medium">{quantity}</span>
                        <button type="button" onClick={() => handleUpdateQty(product.id, quantity + 1)} className="rounded border border-kedar-navy/15 p-1 hover:bg-kedar-cream" aria-label="Increase">
                          <Plus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-medium uppercase text-kedar-navy/55">{product.unit}</span>
                        <button type="button" onClick={() => removeItem(product.id)} className="ml-auto rounded p-1 text-red-500 hover:bg-red-50" aria-label="Remove">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-kedar-navy">{formatPrice(product.price * quantity)}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && !orderDone && (
          <div className="border-t border-kedar-navy/10 px-5 py-4">
            {itemMessage && (
              <p className="mb-3 flex items-start gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {itemMessage}
              </p>
            )}
            {hasStockShortfall && (
              <p className="mb-3 flex items-start gap-1.5 rounded-lg bg-orange-50 px-3 py-2 text-xs text-orange-800">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Some items exceed current stock. Your order will be held until production is complete — it cannot be confirmed until stock is available.
              </p>
            )}
            <div className="mb-4 flex justify-between text-base">
              <span className="text-kedar-navy/70">Subtotal</span>
              <span className="font-serif text-xl font-bold text-kedar-navy">{formatPrice(total)}</span>
            </div>
            <p className="mb-4 text-xs text-kedar-navy/50">
              GST included where applicable. Orders are reviewed by our sales team before confirmation.
            </p>

            {error && <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

            {user ? (
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={placing}
                className="btn-primary flex w-full items-center justify-center gap-2"
              >
                {placing ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
                {placing ? 'Placing Order…' : 'Place Order'}
              </button>
            ) : (
              <Link
                href="/login?from=cart"
                className={cn('btn-primary flex w-full items-center justify-center gap-2')}
                onClick={closeCart}
              >
                <LogIn className="h-4 w-4" />
                Login to Place Order
              </Link>
            )}

            {!user && (
              <p className="mt-2 text-center text-xs text-kedar-navy/50">
                New customer?{' '}
                <Link href="/login?from=cart&mode=signup" className="font-medium text-kedar-gold-dark hover:underline" onClick={closeCart}>
                  Create an account
                </Link>
              </p>
            )}

            <button type="button" onClick={clearCart} className="mt-2 w-full py-2 text-xs text-kedar-navy/50 hover:text-kedar-navy">
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
