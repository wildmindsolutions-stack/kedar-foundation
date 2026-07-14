'use client';

import { useEffect, useState } from 'react';
import { Info, X } from 'lucide-react';

const STORAGE_KEY = 'kedar-foundation-signup-notice';

export function SignupNoticeBanner() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      setMessage(stored);
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  if (!message) return null;

  return (
    <div className="border-b border-kedar-gold/30 bg-kedar-gold/10">
      <div className="section-container flex items-start gap-3 py-3 text-sm text-kedar-navy">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-kedar-gold-dark" />
        <p className="flex-1">{message}</p>
        <button
          type="button"
          onClick={() => setMessage('')}
          className="rounded p-1 text-kedar-navy/50 hover:bg-kedar-gold/20 hover:text-kedar-navy"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
