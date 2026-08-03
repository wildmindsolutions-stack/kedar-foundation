'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { KEDAR_ACRONYM, SITE } from '@/lib/content';
import { HERO_CAROUSEL_IMAGES } from '@/lib/hero-images.generated';
import { cn } from '@/lib/utils';

const INTERVAL_MS = 6000;
const TRANSITION_MS = 700;
const SWIPE_THRESHOLD = 48;

/** Distinct caption per work photo slide (cycles if there are more photos). */
const WORK_SLIDES = [
  { title: 'Empowering Communities', caption: 'Standing beside people, uplifting lives' },
  { title: 'Nurturing Young Minds', caption: 'Education and care for every child' },
  { title: 'Standing With Our Farmers', caption: 'Water, tools, and hope for the fields' },
  { title: 'Compassion for All Beings', caption: 'Kindness that reaches every creature' },
  { title: 'Building a Self-Reliant India', caption: 'Skills, enterprise, and dignity' },
  { title: 'Rooted in Service', caption: 'Small steps, lasting change' },
];

function BrandSlideContent() {
  return (
    <div className="relative mx-auto w-full max-w-5xl text-center">
      <div className="relative z-10">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-kedar-gold sm:text-xs [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
            {SITE.name}
          </p>
          <h1 className="mt-2 font-sans text-2xl font-bold leading-tight tracking-tight text-white sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl [text-shadow:0_3px_20px_rgba(0,0,0,0.85)]">
            {KEDAR_ACRONYM.subtitle}{' '}
            <span className="bg-gold-gradient bg-clip-text text-transparent">{KEDAR_ACRONYM.title}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xs font-semibold uppercase tracking-[0.14em] text-white/90 sm:mt-6 sm:text-sm [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
            Rooted in Tradition · Driven by Purpose · Devoted to Service
          </p>
        </div>

        <div className="mx-auto mt-6 flex w-fit flex-row items-center justify-center gap-2 sm:mt-10 sm:gap-3">
          <Link href="/about" id="hero-link-about" className="btn-primary !px-4 !py-1.5 !text-xs sm:!px-6 sm:!py-3 sm:!text-sm">
            Our Story
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" />
          </Link>
          <Link href="/products" id="hero-link-products" className="btn-outline !border-white/40 !text-white hover:!bg-white hover:!text-kedar-navy !px-4 !py-1.5 !text-xs sm:!px-6 sm:!py-3 sm:!text-sm">
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
        'bg-kedar-navy text-white',
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
          {/* Slide 0 — dark brand intro with community welfare background */}
          <div className="relative h-full w-screen shrink-0 overflow-hidden bg-kedar-navy">
            <Image
              src="/images/brand/community-welfare.png"
              alt="Kedar Foundation community work"
              fill
              className="object-cover object-center"
              priority
            />
            {/* High-impact dark overlay for perfect white text contrast */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-kedar-navy/80 via-kedar-navy/40 to-kedar-navy/20 z-0" />
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
      <div className="section-container relative z-10 flex flex-1 flex-col justify-center py-3 sm:py-8 md:py-12">
        {isBrandSlide ? (
          <BrandSlideContent />
        ) : (
          <div className="mx-auto max-w-lg text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-kedar-gold sm:text-xs [text-shadow:0_2px_12px_rgba(0,0,0,0.9)]">
              {SITE.name}
            </p>
            <p className="mt-3 font-sans text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl [text-shadow:0_3px_20px_rgba(0,0,0,0.95)]">
              {WORK_SLIDES[(index - 1 + WORK_SLIDES.length) % WORK_SLIDES.length].title}
            </p>
          </div>
        )}
      </div>

      {/* Prev / next */}
      {totalSlides > 1 && (
        <>
          <button
            type="button"
            id="hero-btn-prev"
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
            id="hero-btn-next"
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
              id={`hero-dot-${i}`}
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
