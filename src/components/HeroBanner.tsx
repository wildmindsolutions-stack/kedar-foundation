import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { KEDAR_ACRONYM, SITE } from '@/lib/content';

export function HeroBanner() {
  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden bg-kedar-navy text-white sm:min-h-[calc(100dvh-5rem)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 25%, #D4AF37 0%, transparent 50%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-kedar-navy/20 to-kedar-navy-dark/95" />

      <div className="section-container relative flex flex-1 flex-col justify-center py-5 sm:py-8 md:py-12">
        {/* Headline */}
        <div className="mx-auto w-full max-w-xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-kedar-gold/90 sm:text-xs">
            {SITE.name}
          </p>
          <h1 className="mt-2 font-serif text-[1.35rem] font-bold leading-[1.2] text-white sm:mt-3 sm:text-3xl md:text-4xl lg:text-[2.25rem]">
            {KEDAR_ACRONYM.subtitle}
            <span className="mt-1 block text-2xl font-bold tracking-[0.08em] text-kedar-gold sm:mt-2 sm:text-3xl md:text-4xl">
              {KEDAR_ACRONYM.title}
            </span>
          </h1>
        </div>

        {/* KEDAR acronym — mobile: clean list · tablet+: 5-col grid */}
        <div className="mx-auto mt-5 w-full max-w-md rounded-2xl border border-kedar-gold/25 bg-white/[0.05] px-4 py-3 backdrop-blur-sm sm:mt-8 sm:max-w-4xl sm:px-5 sm:py-5 md:mt-10">
          <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-kedar-gold/85 sm:mb-4 sm:text-xs">
            What KEDAR Stands For
          </p>

          {/* Mobile list */}
          <ul className="divide-y divide-white/10 sm:hidden">
            {KEDAR_ACRONYM.pillars.map(({ letter, short }) => (
              <li key={letter} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-kedar-gold font-serif text-sm font-bold text-kedar-navy shadow-sm">
                  {letter}
                </span>
                <span className="text-sm font-medium text-white/95">{short}</span>
              </li>
            ))}
          </ul>

          {/* Tablet / desktop grid */}
          <div className="hidden grid-cols-5 gap-2 sm:grid md:gap-3">
            {KEDAR_ACRONYM.pillars.map(({ letter, short }) => (
              <div
                key={letter}
                className="flex flex-col items-center gap-2 rounded-xl bg-white/[0.04] px-2 py-3 text-center md:py-4"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-kedar-gold font-serif text-sm font-bold text-kedar-navy md:h-10 md:w-10 md:text-base">
                  {letter}
                </span>
                <p className="text-[11px] leading-snug text-white/90 md:text-xs">{short}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-4 hidden max-w-xl text-center text-sm leading-relaxed text-white/70 sm:block md:mt-8">
          {KEDAR_ACRONYM.visionStatement}
        </p>

        {/* CTAs — stacked on mobile */}
        <div className="mx-auto mt-5 flex w-full max-w-xs flex-col gap-2.5 sm:mt-8 sm:max-w-none sm:flex-row sm:justify-center sm:gap-3 md:mt-10">
          <Link
            href="/about"
            className="btn-primary w-full !py-2.5 !text-sm sm:w-auto sm:!px-6 sm:!py-3"
          >
            Our Story
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/products"
            className="btn-outline w-full !py-2.5 !text-sm sm:w-auto sm:!px-6 sm:!py-3"
          >
            Shop Products
          </Link>
        </div>
      </div>

      <div className="relative mt-auto shrink-0 border-t border-kedar-gold/15 bg-kedar-navy-dark/70 px-4 py-2 sm:py-3">
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
