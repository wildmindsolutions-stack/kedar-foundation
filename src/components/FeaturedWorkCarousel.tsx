'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarouselSwipe } from '@/hooks/useCarouselSwipe';
import { cn } from '@/lib/utils';

interface FeaturedWorkCarouselProps {
  images: string[];
  altPrefix: string;
  intervalMs?: number;
}

export function FeaturedWorkCarousel({
  images,
  altPrefix,
  intervalMs = 4000,
}: FeaturedWorkCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const timer = setInterval(next, intervalMs);
    return () => clearInterval(timer);
  }, [paused, next, images.length, intervalMs]);

  const swipe = useCarouselSwipe(prev, next, setPaused);

  if (images.length === 0) return null;

  return (
    <div
      className="relative mx-auto max-w-4xl overflow-hidden rounded-xl border border-kedar-navy/10 bg-kedar-navy/5 shadow-sm touch-pan-y"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      {...swipe}
    >
      <div className="relative aspect-[4/3] w-full max-h-[min(72vw,420px)] sm:max-h-[480px]">
        {images.map((src, i) => (
          <div
            key={src}
            className={cn(
              'absolute inset-0 flex items-center justify-center transition-opacity duration-700',
              i === index ? 'opacity-100' : 'opacity-0',
            )}
          >
            <div className="relative h-full w-full max-w-[85%]">
              <Image
                src={src}
                alt={`${altPrefix} ${i + 1}`}
                fill
                className="object-contain object-center"
                sizes="(max-width: 896px) 100vw, 896px"
                priority={i === 0}
              />
            </div>
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-kedar-navy/10 bg-white/90 p-2 text-kedar-navy shadow-sm transition-colors hover:border-kedar-gold hover:text-kedar-gold sm:left-4"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-kedar-navy/10 bg-white/90 p-2 text-kedar-navy shadow-sm transition-colors hover:border-kedar-gold hover:text-kedar-gold sm:right-4"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-3 left-0 right-0 z-10 flex flex-col items-center gap-2">
            <span className="rounded-full bg-kedar-navy/75 px-3 py-1 text-xs font-medium text-white">
              {index + 1} / {images.length}
            </span>
            {images.length <= 12 && (
              <div className="flex max-w-full flex-wrap justify-center gap-1.5 px-4">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      i === index ? 'w-5 bg-kedar-gold' : 'w-1.5 bg-kedar-navy/30 hover:bg-kedar-navy/50',
                    )}
                    aria-label={`Show photo ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
