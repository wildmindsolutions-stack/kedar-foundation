'use client';

import { useState, type MouseEvent } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getProductGallery } from '@/lib/product-images';
import { cn } from '@/lib/utils';

interface ProductViewCarouselProps {
  product: { slug?: string; name: string };
  variant?: 'card' | 'detail';
  priority?: boolean;
}

export function ProductViewCarousel({
  product,
  variant = 'detail',
  priority = false,
}: ProductViewCarouselProps) {
  const images = getProductGallery(product);
  const [active, setActive] = useState(0);

  if (images.length === 0) return null;

  const current = images[active] ?? images[0];
  const multiple = images.length > 1;

  function go(event: MouseEvent, index: number) {
    event.preventDefault();
    event.stopPropagation();
    setActive(index);
  }

  function step(event: MouseEvent, delta: number) {
    event.preventDefault();
    event.stopPropagation();
    setActive((index) => (index + delta + images.length) % images.length);
  }

  return (
    <div>
      <div
        className={cn(
          'relative overflow-hidden bg-[#faf7f2]',
          variant === 'detail' ? 'aspect-square rounded-2xl shadow-card' : 'aspect-square',
        )}
      >
        <Image
          src={current.src}
          alt={`${product.name} — ${current.label}`}
          fill
          priority={priority && active === 0}
          className="object-contain object-center p-3"
          sizes={variant === 'detail' ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 640px) 100vw, 33vw'}
        />
        {multiple && (
          <>
            <button
              type="button"
              aria-label="Previous view"
              onClick={(event) => step(event, -1)}
              className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-kedar-navy shadow-sm hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next view"
              onClick={(event) => step(event, 1)}
              className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-kedar-navy shadow-sm hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {multiple && (
        <div className={cn('grid grid-cols-4', variant === 'detail' ? 'mt-3 gap-2' : 'gap-1.5 p-2')}>
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={(event) => go(event, index)}
              aria-label={`Show ${image.label} view`}
              aria-pressed={index === active}
              className={cn(
                'overflow-hidden rounded-lg border bg-[#faf7f2] text-left transition-colors',
                index === active
                  ? 'border-kedar-gold ring-2 ring-kedar-gold/40'
                  : 'border-kedar-gold/20 hover:border-kedar-gold/50',
              )}
            >
              <span className="relative block aspect-square">
                <Image src={image.src} alt="" fill className="object-contain p-0.5" sizes="80px" />
              </span>
              {variant === 'detail' && (
                <span className="block px-1 pb-1.5 text-center text-[10px] font-semibold uppercase tracking-wide text-kedar-navy/70">
                  {image.label}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
