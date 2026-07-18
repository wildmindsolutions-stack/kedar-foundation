import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LotusDivider, LotusMotif, MountainHeroBackdrop } from '@/components/BrandMotifs';
import { Reveal } from '@/components/Reveal';

interface InitiativeCardProps {
  title: string;
  description: string;
  items: string[];
  image?: string;
  images?: string[];
  tagline?: string;
}

export function InitiativeCard({
  title, description, items, image, images, tagline,
}: InitiativeCardProps) {
  const cover = image || images?.[0];
  const remaining = Math.max(0, items.length - 4);

  return (
    <article className="card group flex h-full cursor-pointer flex-col !p-0 overflow-hidden transition-shadow hover:shadow-lg">
      {cover && (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-kedar-navy/10">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-contain object-center p-2 transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-semibold text-kedar-navy group-hover:text-kedar-gold-dark">
          {title}
        </h3>
        {tagline && tagline !== description && (
          <p className="mt-2 text-xs font-medium leading-relaxed text-kedar-gold-dark">
            {tagline}
          </p>
        )}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-kedar-navy/70 line-clamp-3">{description}</p>
        <ul className="mt-4 space-y-1.5 border-t border-kedar-navy/5 pt-4">
          {items.slice(0, 4).map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-kedar-navy/60">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-kedar-gold" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-kedar-gold-dark">
          {remaining > 0 ? `View details · +${remaining} more` : 'View details'}
        </p>
      </div>
    </article>
  );
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
  mountain = true,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  mountain?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-radial py-20 text-white sm:py-24 lg:py-28">
      {mountain && <MountainHeroBackdrop />}
      {/* Soft gold glow for depth */}
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-kedar-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-kedar-gold/40 to-transparent" />
      <div className="section-container relative z-10 text-center">
        <LotusMotif className="mx-auto mb-5 h-11 w-auto text-kedar-gold opacity-90 sm:h-14" />
        {eyebrow && <p className="eyebrow eyebrow-center mb-4 text-kedar-gold">{eyebrow}</p>}
        <h1 className="heading-hero">{title}</h1>
        <LotusDivider className="my-6" />
        {subtitle && (
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-navy-radial section-padding">
      <LotusMotif className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-auto -translate-x-1/2 -translate-y-1/2 text-kedar-gold opacity-[0.08] sm:h-72" />
      <div className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-kedar-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-kedar-gold/10 blur-3xl" />
      <Reveal className="section-container relative z-10 text-center">
        <p className="eyebrow eyebrow-center mb-4 text-kedar-gold">Be Part of the Change</p>
        <h2 className="heading-section mx-auto max-w-3xl text-white">
          Your skills, ideas, and heart can shape a stronger India
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
          Whether you want to volunteer, partner, or simply believe in the cause — there is a place
          for you here. Let&apos;s build a self-reliant, compassionate, and empowered society, together.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="btn-primary">
            Collaborate With Us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/initiatives" className="btn-outline !border-white/40 !text-white hover:!bg-white hover:!text-kedar-navy">
            Explore Our Work
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
