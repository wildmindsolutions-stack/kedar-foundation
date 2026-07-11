'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

function CartAutoOpenInner() {
  const searchParams = useSearchParams();
  const { openCart } = useCart();

  useEffect(() => {
    if (searchParams.get('cart') === 'open') {
      openCart();
    }
  }, [searchParams, openCart]);

  return null;
}

export function CartAutoOpen() {
  return (
    <Suspense fallback={null}>
      <CartAutoOpenInner />
    </Suspense>
  );
}
