'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const SCROLL_THRESHOLD = 300;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        'fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-kedar-gold bg-kedar-navy text-kedar-gold shadow-gold transition-all duration-300 hover:bg-kedar-gold hover:text-kedar-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-kedar-gold focus-visible:ring-offset-2 focus-visible:ring-offset-kedar-cream sm:bottom-8 sm:right-8',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <ChevronUp className="h-6 w-6" strokeWidth={2.5} />
    </button>
  );
}
