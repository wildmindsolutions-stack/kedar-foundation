'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { CartAutoOpen } from '@/components/CartAutoOpen';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <CartAutoOpen />
        {children}
      </CartProvider>
    </AuthProvider>
  );
}
