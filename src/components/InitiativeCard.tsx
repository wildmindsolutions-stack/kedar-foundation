import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface InitiativeCardProps {
  title: string;
  description: string;
  items: string[];
}

export function InitiativeCard({ title, description, items }: InitiativeCardProps) {
  return (
    <article className="card group flex h-full flex-col">
      <h3 className="font-serif text-xl font-semibold text-kedar-navy group-hover:text-kedar-gold-dark">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-kedar-navy/70">{description}</p>
      <ul className="mt-4 space-y-1.5 border-t border-kedar-navy/5 pt-4">
        {items.slice(0, 4).map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs text-kedar-navy/60">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-kedar-gold" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <section className="bg-hero-gradient py-16 text-white sm:py-20">
      <div className="section-container text-center">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-kedar-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-4xl font-bold sm:text-5xl">{title}</h1>
        <div className="gold-divider my-5" />
        {subtitle && (
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/80">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="section-padding bg-kedar-navy">
      <div className="section-container text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-kedar-gold">
          Join Our Mission
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
          If you have talent, innovative ideas, or a passion to create positive social impact
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/75">
          Kedar Foundation welcomes you to collaborate with us. Together we can build a self-reliant,
          innovative, and socially empowered India.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="btn-primary">
            Collaborate With Us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/initiatives" className="btn-outline">
            Explore Initiatives
          </Link>
        </div>
      </div>
    </section>
  );
}
