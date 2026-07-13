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

const LOGO_SRC = '/images/logo.png';
const INTERVAL_MS = 6000;
const TRANSITION_MS = 700;
const SWIPE_THRESHOLD = 48;

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
      className="relative flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden bg-kedar-navy text-white sm:min-h-[calc(100dvh-5rem)]"
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
          {/* Slide 0 — plain navy (logo lives in foreground layout, not background) */}
          <div className="relative h-full w-screen shrink-0 bg-kedar-navy">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-kedar-navy via-kedar-navy to-kedar-navy-dark" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: 'radial-gradient(circle at 30% 20%, #D4AF37 0%, transparent 50%)',
              }}
            />
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
      <div className="section-container relative z-10 flex flex-1 flex-col justify-center py-5 sm:py-8 md:py-12">
        {isBrandSlide ? (
          <>
            <div className="mx-auto w-full max-w-xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-kedar-gold/90 sm:text-xs">
                {SITE.name}
              </p>
              <h1 className="mt-2 font-serif text-[1.35rem] font-bold leading-[1.2] text-white sm:mt-3 sm:text-3xl md:text-4xl">
                {KEDAR_ACRONYM.subtitle}
                <span className="mt-1 block text-2xl font-bold tracking-[0.08em] text-kedar-gold sm:mt-2 sm:text-3xl md:text-4xl">
                  {KEDAR_ACRONYM.title}
                </span>
              </h1>
            </div>

            {/* Mobile — fullform only, no logo */}
            <div className="mx-auto mt-5 w-full max-w-md rounded-2xl border border-white/20 bg-kedar-navy/70 px-4 py-3 shadow-lg backdrop-blur-md md:hidden">
              <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-kedar-gold/85">
                What KEDAR Stands For
              </p>
              <ul className="divide-y divide-white/10">
                {KEDAR_ACRONYM.pillars.map(({ letter, short }) => (
                  <li key={letter} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-kedar-gold font-serif text-sm font-bold text-kedar-navy shadow-sm">
                      {letter}
                    </span>
                    <span className="text-sm font-medium text-white/95">{short}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop — logo + fullform side by side */}
            <div className="mx-auto mt-8 hidden w-full max-w-5xl items-center gap-8 md:grid md:grid-cols-2 lg:gap-12">
              <div className="flex items-center justify-center">
                <Image
                  src={LOGO_SRC}
                  alt="Kedar Foundation"
                  width={400}
                  height={400}
                  className="h-auto max-h-[min(50vh,380px)] w-auto max-w-full object-contain"
                  priority
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
              <div className="rounded-2xl border border-white/20 bg-kedar-navy/60 px-5 py-5 shadow-lg backdrop-blur-md">
                <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-kedar-gold/85">
                  What KEDAR Stands For
                </p>
                <div className="grid grid-cols-5 gap-1.5 lg:gap-2">
                  {KEDAR_ACRONYM.pillars.map(({ letter, short }) => (
                    <div
                      key={letter}
                      className="flex min-w-0 flex-col items-center gap-1.5 overflow-hidden rounded-xl bg-white/[0.06] px-0.5 py-2.5 text-center sm:px-1 sm:py-3"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-kedar-gold font-serif text-sm font-bold text-kedar-navy lg:h-10 lg:w-10">
                        {letter}
                      </span>
                      <p className="w-full min-w-0 break-words text-[8px] leading-[1.25] text-white/90 sm:text-[9px]">
                        {short}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mx-auto mt-4 hidden max-w-xl text-center text-sm leading-relaxed text-white/90 sm:block md:mt-8">
              {KEDAR_ACRONYM.visionStatement}
            </p>

            <div className="mx-auto mt-5 flex w-full max-w-xs flex-col gap-2.5 sm:mt-8 sm:max-w-none sm:flex-row sm:justify-center sm:gap-3 md:mt-10">
              <Link href="/about" className="btn-primary w-full !py-2.5 !text-sm sm:w-auto sm:!px-6 sm:!py-3">
                Our Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/products" className="btn-outline w-full !py-2.5 !text-sm sm:w-auto sm:!px-6 sm:!py-3">
                Shop Products
              </Link>
            </div>
          </>
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
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/25 bg-kedar-navy/40 p-2 text-white backdrop-blur-sm transition-colors hover:border-kedar-gold hover:text-kedar-gold sm:left-4 sm:p-2.5"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/25 bg-kedar-navy/40 p-2 text-white backdrop-blur-sm transition-colors hover:border-kedar-gold hover:text-kedar-gold sm:right-4 sm:p-2.5"
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
                  : 'h-2 w-2 bg-white/50 hover:bg-white/80',
              )}
              aria-label={i === 0 ? 'Go to Kedar logo slide' : `Go to work photo ${i}`}
              aria-current={i === index ? 'true' : undefined}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 mt-auto shrink-0 border-t border-white/15 bg-kedar-navy/60 px-4 py-2 backdrop-blur-md sm:py-3">
        <p className="text-center text-[10px] leading-relaxed text-white/55 sm:text-xs">
          <span className="block sm:inline">{SITE.tagline}</span>
          <span className="mx-1.5 hidden text-kedar-gold/40 sm:inline">·</span>
          <span className="mt-0.5 block text-[9px] text-white/45 sm:mt-0 sm:inline sm:text-xs sm:text-white/55">
            {SITE.taglineGujarati}
          </span>
        </p>
      </div>
    </section>
  );
}
