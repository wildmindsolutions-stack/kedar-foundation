'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/content';
import { cn } from '@/lib/utils';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-kedar-gold/20 bg-kedar-navy/95 backdrop-blur-md">
      <div className="section-container flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt={SITE.name}
            width={48}
            height={48}
            className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
            priority
          />
          <div className="hidden sm:block">
            <p className="font-serif text-lg font-bold leading-tight text-kedar-gold">Kedar</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/80">Foundation</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/90 transition-colors hover:text-kedar-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary !py-2.5 !text-xs">
            Get in Touch
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={cn(
          'border-t border-kedar-gold/10 bg-kedar-navy md:hidden',
          open ? 'block' : 'hidden',
        )}
      >
        <nav className="section-container flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-3 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-kedar-gold"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
