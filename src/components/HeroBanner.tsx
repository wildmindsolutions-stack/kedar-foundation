import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { KEDAR_ACRONYM, SITE } from '@/lib/content';

export function HeroBanner() {
  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden bg-kedar-navy text-white sm:min-h-[calc(100dvh-5rem)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 25%, #D4AF37 0%, transparent 50%),
            radial-gradient(circle at 80% 75%, #D4AF37 0%, transparent 45%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-kedar-navy/30 via-transparent to-kedar-navy-dark/95" />

      {/* Main content — vertically centred, fills available height */}
      <div className="section-container relative flex flex-1 flex-col items-center justify-center px-4 py-10 sm:py-12">
        <div className="w-full max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-kedar-gold/90">
            {SITE.name}
          </p>
          <h1 className="mt-3 font-serif text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[2.25rem]">
            {KEDAR_ACRONYM.subtitle}
          </h1>
          <p className="mt-2 font-serif text-xl font-semibold tracking-[0.2em] text-kedar-gold sm:text-2xl">
            {KEDAR_ACRONYM.title}
          </p>
        </div>

        {/* KEDAR full form — balanced width, fills horizontal space */}
        <div className="mt-8 w-full max-w-4xl rounded-xl border border-kedar-gold/20 bg-white/[0.04] px-4 py-4 sm:mt-10 sm:px-6 sm:py-5">
          <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-kedar-gold/80 sm:text-xs">
            What KEDAR Stands For
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-2">
            {KEDAR_ACRONYM.pillars.map(({ letter, short }) => (
              <div
                key={letter}
                className="flex flex-col items-center gap-2 rounded-lg bg-white/[0.03] px-2 py-3 text-center md:py-3.5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-kedar-gold font-serif text-sm font-bold text-kedar-navy sm:h-9 sm:w-9">
                  {letter}
                </span>
                <p className="text-[11px] leading-snug text-white/85 sm:text-xs">{short}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-center text-sm leading-relaxed text-white/70 sm:mt-10">
          {KEDAR_ACRONYM.visionStatement}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10">
          <Link href="/about" className="btn-primary">
            Our Story
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/products" className="btn-outline">
            Shop Products
          </Link>
        </div>
      </div>

      {/* Tagline pinned to bottom of hero */}
      <div className="relative border-t border-kedar-gold/15 bg-kedar-navy-dark/60 py-3">
        <p className="section-container text-center text-xs text-white/55">
          {SITE.tagline} · {SITE.taglineGujarati}
        </p>
      </div>
    </section>
  );
}
