import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone, Wheat } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/content';

export function Footer() {
  return (
    <footer className="bg-kedar-navy-dark text-white">
      <div className="border-b border-kedar-gold/20 bg-kedar-navy py-8">
        <div className="section-container flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-3">
            <Wheat className="h-5 w-5 text-kedar-gold" />
            <p className="font-serif text-xl font-semibold text-kedar-gold">{SITE.tagline}</p>
            <Wheat className="h-5 w-5 scale-x-[-1] text-kedar-gold" />
          </div>
          <p className="text-sm text-white/70">{SITE.taglineGujarati}</p>
        </div>
      </div>

      <div className="section-container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt={SITE.name} width={44} height={44} className="rounded-full" />
            <div>
              <p className="font-serif text-lg font-bold text-kedar-gold">Kedar Foundation</p>
              <p className="text-xs text-white/60">Empowering communities, enriching lives</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            Inspired by the sacred mountains of Kedar, dedicated to pure quality, social welfare, and sustainable development across India.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-kedar-gold">Quick Links</h3>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-kedar-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-kedar-gold">Contact</h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-kedar-gold" />
              {SITE.location}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-kedar-gold" />
              {SITE.email}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-kedar-gold" />
              {SITE.phone}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-kedar-gold">Quality Promise</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>100% Pure Wheat</li>
            <li>Food-Safety Approved</li>
            <li>Export Documentation Ready</li>
            <li>Heritage Values, Global Quality</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Kedar Foundation. All rights reserved.
      </div>
    </footer>
  );
}
