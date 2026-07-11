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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-kedar-navy-dark/95" />

      <div className="section-container relative flex flex-1 flex-col justify-center px-3 py-4 sm:px-4 sm:py-8 md:py-12">
        <div className="w-full text-center">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-kedar-gold/90 sm:text-xs">
            {SITE.name}
          </p>
          <h1 className="mt-1 font-serif text-base font-bold leading-tight text-white sm:mt-3 sm:text-2xl md:text-3xl lg:text-[2.25rem]">
            {KEDAR_ACRONYM.subtitle}
          </h1>
          <p className="mt-0.5 font-serif text-sm font-semibold tracking-[0.12em] text-kedar-gold sm:mt-2 sm:text-xl md:text-2xl">
            {KEDAR_ACRONYM.title}
          </p>
        </div>

        <div className="mt-3 w-full rounded-lg border border-kedar-gold/20 bg-white/[0.04] px-2 py-2 sm:mt-6 sm:rounded-xl sm:px-4 sm:py-4 md:mt-8 md:mx-auto md:max-w-4xl">
          <p className="mb-1.5 text-center text-[8px] font-semibold uppercase tracking-[0.18em] text-kedar-gold/80 sm:mb-3 sm:text-[10px] md:text-xs">
            What KEDAR Stands For
          </p>
          <div className="grid grid-cols-5 gap-0.5 sm:gap-2">
            {KEDAR_ACRONYM.pillars.map(({ letter, short }) => (
              <div
                key={letter}
                className="flex flex-col items-center gap-0.5 rounded-md bg-white/[0.03] px-0.5 py-1 text-center sm:gap-1 sm:rounded-lg sm:px-1 sm:py-2 md:py-3"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded bg-kedar-gold font-serif text-[9px] font-bold text-kedar-navy sm:h-7 sm:w-7 sm:text-xs md:h-9 md:w-9 md:text-sm">
                  {letter}
                </span>
                <p className="text-[6px] leading-tight text-white/85 sm:text-[9px] md:text-xs">{short}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-2 line-clamp-2 max-w-2xl text-center text-[10px] leading-snug text-white/65 sm:mt-5 sm:line-clamp-none sm:text-sm md:mt-8">
          {KEDAR_ACRONYM.visionStatement}
        </p>

        <div className="mt-3 flex flex-wrap justify-center gap-2 sm:mt-6 sm:gap-3 md:mt-8">
          <Link href="/about" className="btn-primary !px-3 !py-1.5 !text-[10px] sm:!px-6 sm:!py-3 sm:!text-sm">
            Our Story
            <ArrowRight className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
          </Link>
          <Link href="/products" className="btn-outline !px-3 !py-1.5 !text-[10px] sm:!px-6 sm:!py-3 sm:!text-sm">
            Shop Products
          </Link>
        </div>
      </div>

      <div className="relative mt-auto shrink-0 border-t border-kedar-gold/15 bg-kedar-navy-dark/60 py-1.5 sm:py-3">
        <p className="section-container text-center text-[8px] text-white/55 sm:text-xs">
          {SITE.tagline} · {SITE.taglineGujarati}
        </p>
      </div>
    </section>
  );
}
