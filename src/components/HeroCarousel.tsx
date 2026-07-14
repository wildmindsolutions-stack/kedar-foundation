'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { MountainMotif } from '@/components/BrandMotifs';
import { KEDAR_ACRONYM, SITE } from '@/lib/content';
import { HERO_CAROUSEL_IMAGES } from '@/lib/hero-images.generated';
import { cn } from '@/lib/utils';

const INTERVAL_MS = 6000;
const TRANSITION_MS = 700;
const SWIPE_THRESHOLD = 48;

function KedarAcronymPanel() {
  return (
    <div className="rounded-xl border border-kedar-navy/8 bg-white px-4 py-5 shadow-card sm:px-8 sm:py-8">
      <p className="text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-kedar-gold-dark sm:text-xs">
        What KEDAR Stands For
      </p>
      <div className="gold-divider my-3 sm:my-4" />

      {/* Mobile — vertical list for readable labels */}
      <ul className="divide-y divide-kedar-navy/8 md:hidden">
        {KEDAR_ACRONYM.pillars.map(({ letter, short }) => (
          <li key={letter} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-kedar-gold font-serif text-sm font-bold text-kedar-navy shadow-sm">
              {letter}
            </span>
            <span className="text-sm font-semibold text-kedar-navy">{short}</span>
          </li>
        ))}
      </ul>

      {/* Tablet+ — compact horizontal grid */}
      <div className="mx-auto hidden max-w-3xl grid-cols-5 gap-2 md:grid sm:gap-3">
        {KEDAR_ACRONYM.pillars.map(({ letter, short }) => (
          <div key={letter} className="min-w-0 text-center">
            <p className="font-serif text-2xl font-bold leading-none tracking-tight text-kedar-gold sm:text-3xl">
              {letter}
            </p>
            <div className="mx-auto my-2 h-px w-6 bg-kedar-gold/50 sm:w-8" />
            <p className="text-xs font-semibold leading-tight text-kedar-navy sm:text-sm">{short}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandSlideContent() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="relative z-10">
        <div className="mx-auto max-w-4xl px-1 text-center sm:px-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-kedar-gold-dark sm:text-xs">
            {SITE.name}
          </p>
          <h1 className="mt-2 font-serif text-base font-bold leading-snug text-kedar-navy sm:mt-3 sm:text-3xl md:text-4xl md:whitespace-nowrap">
            {KEDAR_ACRONYM.subtitle}{' '}
            <span className="tracking-tight text-kedar-gold">{KEDAR_ACRONYM.title}</span>
          </h1>
        </div>

        <div className="mt-5 sm:mt-8 md:mt-10">
          <KedarAcronymPanel />
        </div>

        <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-kedar-navy/75 sm:mt-8 sm:text-base">
          {KEDAR_ACRONYM.visionStatement}
        </p>

        <div className="mx-auto mt-5 flex w-full max-w-xs flex-col gap-2.5 sm:mt-8 sm:max-w-none sm:flex-row sm:justify-center sm:gap-3">
          <Link href="/about" className="btn-primary w-full !py-2.5 !text-sm sm:w-auto sm:!px-6 sm:!py-3">
            Our Story
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/products" className="btn-outline w-full !py-2.5 !text-sm sm:w-auto sm:!px-6 sm:!py-3">
            Shop Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export function HeroCarousel() {
  const workImages = HERO_CAROUSEL_IMAGES;
  const totalSlides = 1 + workImages.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const isBrandSlide = index === 0;

  const goTo = useCallback((i: number) => {
    setIndex(((i % totalSlides) + totalSlides) % totalSlides);
  }, [totalSlides]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (totalSlides <= 1 || paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % totalSlides);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [totalSlides, paused]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setPaused(true);
  }

  function onTouchMove(e: React.TouchEvent) {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }

  function onTouchEnd() {
    if (touchDeltaX.current < -SWIPE_THRESHOLD) next();
    else if (touchDeltaX.current > SWIPE_THRESHOLD) prev();
    touchDeltaX.current = 0;
    setPaused(false);
  }

  return (
    <section
      className={cn(
        'relative flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden sm:min-h-[calc(100dvh-5rem)]',
        isBrandSlide ? 'bg-kedar-cream text-kedar-navy' : 'bg-kedar-navy text-white',
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Sliding backgrounds — each slide is exactly 100vw to prevent stretch */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="flex h-full will-change-transform"
          style={{
            width: `${totalSlides * 100}vw`,
            transform: `translate3d(-${index * 100}vw, 0, 0)`,
            transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        >
          {/* Slide 0 — cream brand intro with mountain bottom-left */}
          <div className="relative h-full w-screen shrink-0 overflow-hidden bg-kedar-cream">
            <div
              className="pointer-events-none absolute bottom-0 left-0 flex w-[85%] max-w-4xl items-end justify-start overflow-hidden sm:w-[75%] sm:max-w-5xl"
              aria-hidden
            >
              <div
                className={cn(
                  '-translate-x-4 sm:-translate-x-6',
                  '[mask-image:linear-gradient(to_right,transparent_0%,black_40%,black_100%)]',
                  '[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_40%,black_100%)]',
                )}
              >
                <MountainMotif className="h-52 w-auto opacity-[0.22] sm:h-[26rem] md:h-[32rem] lg:h-[36rem]" />
              </div>
            </div>
          </div>

          {/* Work photo slides */}
          {workImages.map((src, i) => (
            <div key={src} className="relative h-full w-screen shrink-0 overflow-hidden bg-kedar-navy">
              <Image
                src={src}
                alt={`Kedar Foundation community work ${i + 1}`}
                fill
                className="object-cover object-center"
                sizes="100vw"
                quality={90}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-kedar-navy/50 via-transparent to-kedar-navy/15" />
            </div>
          ))}
        </div>
      </div>

      {/* Foreground content */}
      <div className="section-container relative z-10 flex flex-1 flex-col justify-center py-4 sm:py-8 md:py-12">
        {isBrandSlide ? (
          <BrandSlideContent />
        ) : (
          <div className="mx-auto max-w-lg text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-kedar-gold/90 sm:text-xs [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
              {SITE.name}
            </p>
            <p className="mt-2 font-serif text-xl font-bold text-white sm:text-2xl [text-shadow:0_2px_10px_rgba(0,0,0,0.75)]">
              Empowering Communities
            </p>
          </div>
        )}
      </div>

      {/* Prev / next */}
      {totalSlides > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className={cn(
              'absolute left-1 top-1/2 z-20 -translate-y-1/2 rounded-full border p-1.5 backdrop-blur-sm transition-colors sm:left-4 sm:p-2.5',
              isBrandSlide
                ? 'border-kedar-navy/15 bg-white/80 text-kedar-navy hover:border-kedar-gold hover:text-kedar-gold-dark'
                : 'border-white/25 bg-kedar-navy/40 text-white hover:border-kedar-gold hover:text-kedar-gold',
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className={cn(
              'absolute right-1 top-1/2 z-20 -translate-y-1/2 rounded-full border p-1.5 backdrop-blur-sm transition-colors sm:right-4 sm:p-2.5',
              isBrandSlide
                ? 'border-kedar-navy/15 bg-white/80 text-kedar-navy hover:border-kedar-gold hover:text-kedar-gold-dark'
                : 'border-white/25 bg-kedar-navy/40 text-white hover:border-kedar-gold hover:text-kedar-gold',
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dot navigation */}
      {totalSlides > 1 && (
        <div className="absolute bottom-16 left-0 right-0 z-20 flex items-center justify-center gap-2 sm:bottom-20">
          {Array.from({ length: totalSlides }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                'rounded-full transition-all duration-300',
                i === index
                  ? 'h-2 w-7 bg-kedar-gold'
                  : isBrandSlide
                    ? 'h-2 w-2 bg-kedar-navy/25 hover:bg-kedar-navy/40'
                    : 'h-2 w-2 bg-white/50 hover:bg-white/80',
              )}
              aria-label={i === 0 ? 'Go to Kedar introduction slide' : `Go to work photo ${i}`}
              aria-current={i === index ? 'true' : undefined}
            />
          ))}
        </div>
      )}

      <div
        className={cn(
          'relative z-10 mt-auto shrink-0 border-t px-4 py-2 backdrop-blur-md sm:py-3',
          isBrandSlide
            ? 'border-kedar-navy/10 bg-white/70 text-kedar-navy/70'
            : 'border-white/15 bg-kedar-navy/60 text-white/55',
        )}
      >
        <p className="text-center text-[10px] leading-relaxed sm:text-xs">
          <span className="block sm:inline">{SITE.tagline}</span>
          <span className={cn('mx-1.5 hidden sm:inline', isBrandSlide ? 'text-kedar-gold/50' : 'text-kedar-gold/40')}>·</span>
          <span className={cn('mt-0.5 block text-[9px] sm:mt-0 sm:inline sm:text-xs', isBrandSlide ? 'text-kedar-navy/55' : 'text-white/45 sm:text-white/55')}>
            {SITE.taglineGujarati}
          </span>
        </p>
      </div>
    </section>
  );
}
