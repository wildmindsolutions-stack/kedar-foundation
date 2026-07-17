'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { InitiativeCard } from '@/components/InitiativeCard';
import { cn } from '@/lib/utils';

export interface InitiativeItem {
  title: string;
  description: string;
  items: string[];
  image?: string;
  images?: string[];
  tagline?: string;
}

interface InitiativesGridProps {
  initiatives: InitiativeItem[];
}

function getPhotos(initiative: InitiativeItem | null): string[] {
  if (!initiative) return [];
  if (initiative.images?.length) return initiative.images;
  if (initiative.image) return [initiative.image];
  return [];
}

export function InitiativesGrid({ initiatives }: InitiativesGridProps) {
  const [selected, setSelected] = useState<InitiativeItem | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const titleId = useId();
  const photos = getPhotos(selected);

  const close = useCallback(() => {
    setSelected(null);
    setPhotoIndex(0);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft' && photos.length > 1) {
        setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
      }
      if (e.key === 'ArrowRight' && photos.length > 1) {
        setPhotoIndex((i) => (i + 1) % photos.length);
      }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [selected, close, photos.length]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {initiatives.map((initiative) => (
          <button
            key={initiative.title}
            type="button"
            onClick={() => {
              setSelected(initiative);
              setPhotoIndex(0);
            }}
            className="h-full text-left transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kedar-gold focus-visible:ring-offset-2"
            aria-label={`View details for ${initiative.title}`}
          >
            <InitiativeCard {...initiative} />
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <button
            type="button"
            className="absolute inset-0 bg-kedar-navy/60 backdrop-blur-sm"
            aria-label="Close details"
            onClick={close}
          />

          <div className="relative z-10 flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-kedar-navy/10 px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-kedar-gold-dark">
                  Program details
                </p>
                <h2 id={titleId} className="mt-1 font-serif text-xl font-bold text-kedar-navy sm:text-2xl">
                  {selected.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                className="rounded-full border border-kedar-navy/10 p-2 text-kedar-navy/70 transition-colors hover:border-kedar-gold hover:text-kedar-gold-dark"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto">
              {photos.length > 0 && (
                <div className="relative border-b border-kedar-navy/8 bg-kedar-cream">
                  <div className="relative mx-auto aspect-[4/3] w-full max-h-[280px] sm:max-h-[340px]">
                    {photos.map((src, i) => (
                      <div
                        key={src}
                        className={cn(
                          'absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-500',
                          i === photoIndex ? 'opacity-100' : 'opacity-0',
                        )}
                      >
                        <div className="relative h-full w-full max-w-[90%]">
                          <Image
                            src={src}
                            alt={`${selected.title} photo ${i + 1}`}
                            fill
                            className="object-contain object-center"
                            sizes="(max-width: 768px) 100vw, 720px"
                            priority={i === 0}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {photos.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => setPhotoIndex((i) => (i - 1 + photos.length) % photos.length)}
                        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-kedar-navy/10 bg-white/95 p-2 text-kedar-navy shadow-sm hover:border-kedar-gold hover:text-kedar-gold"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPhotoIndex((i) => (i + 1) % photos.length)}
                        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-kedar-navy/10 bg-white/95 p-2 text-kedar-navy shadow-sm hover:border-kedar-gold hover:text-kedar-gold"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                        {photos.map((src, i) => (
                          <button
                            key={src}
                            type="button"
                            onClick={() => setPhotoIndex(i)}
                            className={cn(
                              'h-1.5 rounded-full transition-all',
                              i === photoIndex ? 'w-5 bg-kedar-gold' : 'w-1.5 bg-kedar-navy/25 hover:bg-kedar-navy/40',
                            )}
                            aria-label={`Show photo ${i + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="space-y-5 px-5 py-6 sm:px-6 sm:py-8">
                {selected.tagline && selected.tagline !== selected.description && (
                  <p className="text-sm font-medium leading-relaxed text-kedar-gold-dark">
                    {selected.tagline}
                  </p>
                )}

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-kedar-navy/50">
                    About this program
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-kedar-navy/80 sm:text-base">
                    {selected.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-kedar-navy/50">
                    Key focus areas
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {selected.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-kedar-navy/8 bg-kedar-cream/60 px-4 py-3 text-sm text-kedar-navy"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-kedar-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
