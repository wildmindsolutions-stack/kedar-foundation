'use client';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { CartAutoOpen } from '@/components/CartAutoOpen';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <CartAutoOpen />
        <SessionMessageBanner />
        {children}
      </CartProvider>
    </AuthProvider>
  );
}

function SessionMessageBanner() {
  const { sessionMessage, clearSessionMessage } = useAuth();
  if (!sessionMessage) return null;
  return (
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-900">
      {sessionMessage}
      <button type="button" onClick={clearSessionMessage} className="ml-2 font-medium underline">
        Dismiss
      </button>
    </div>
  );
}
