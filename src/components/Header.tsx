'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LogIn, LogOut, Menu, Package, ShoppingCart, User, X } from 'lucide-react';
import { CartDrawer } from '@/components/CartDrawer';
import { NotificationPanel } from '@/components/NotificationPanel';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { NAV_LINKS, SITE } from '@/lib/content';
import { cn } from '@/lib/utils';

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname() || '/';

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-b from-kedar-navy-light to-kedar-navy shadow-lg shadow-kedar-navy/25">
        {/* Gold gradient hairline at the bottom edge */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-kedar-gold/70 to-transparent" />

        <div className="section-container flex h-16 items-center justify-between sm:h-20">
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="relative">
              <Image
                src="/images/logo.png"
                alt={SITE.name}
                width={48}
                height={48}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-kedar-gold/40 transition-all duration-300 group-hover:ring-kedar-gold sm:h-12 sm:w-12"
                priority
              />
            </span>
            <div className="hidden leading-none sm:block">
              <p className="font-sans text-xl font-extrabold tracking-tight text-kedar-gold">Kedar</p>
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.34em] text-white/70">
                Foundation
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'group relative text-[13px] font-semibold uppercase tracking-[0.13em] transition-colors duration-200',
                    active ? 'text-kedar-gold' : 'text-white/85 hover:text-white',
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-gold-gradient transition-all duration-300',
                      active ? 'w-full' : 'w-0 group-hover:w-full',
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={openCart}
              className="relative rounded-full p-2.5 text-white transition-colors hover:bg-white/10 hover:text-kedar-gold"
              aria-label={`Open cart, ${itemCount} items`}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-kedar-gold px-1 text-[10px] font-bold text-kedar-navy">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            {user && <NotificationPanel />}

            {user && (
              <Link
                href="/orders"
                className="relative rounded-full p-2.5 text-white transition-colors hover:bg-white/10 hover:text-kedar-gold sm:hidden"
                aria-label="My orders"
              >
                <Package className="h-5 w-5" />
              </Link>
            )}

            {!isLoading && (
              user ? (
                <div className="hidden items-center gap-2 sm:flex">
                  <Link
                    href="/orders"
                    className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/90 transition-colors hover:border-kedar-gold/40 hover:text-kedar-gold"
                  >
                    <Package className="h-3.5 w-3.5" />
                    My Orders
                  </Link>
                  <span className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/90">
                    <User className="h-3.5 w-3.5 text-kedar-gold" />
                    {user.name.split(' ')[0]}
                  </span>
                  <button
                    type="button"
                    onClick={logout}
                    className="rounded-full p-2.5 text-white/80 hover:bg-white/10 hover:text-white"
                    aria-label="Log out"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:text-kedar-gold sm:inline-flex"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              )
            )}

            <Link href="/contact" className="btn-primary !hidden !py-2.5 !text-xs lg:!inline-flex">
              Get in Touch
            </Link>

            <button
              type="button"
              className="rounded-full p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            'overflow-hidden border-t border-kedar-gold/10 bg-kedar-navy transition-[max-height,opacity] duration-300 lg:hidden',
            open ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <nav className="section-container flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.1em] transition-colors',
                    active
                      ? 'bg-kedar-gold/15 text-kedar-gold'
                      : 'text-white/90 hover:bg-white/5 hover:text-kedar-gold',
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/contact"
              className="mt-2 btn-primary !py-3 !text-xs"
              onClick={() => setOpen(false)}
            >
              Get in Touch
            </Link>

            {user ? (
              <>
                <Link
                  href="/orders"
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-kedar-gold hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  <Package className="h-4 w-4" />
                  My Orders
                </Link>
                <button
                  type="button"
                  onClick={() => { logout(); setOpen(false); }}
                  className="rounded-xl px-4 py-3 text-left text-sm font-medium text-white/90 hover:bg-white/5"
                >
                  Log out ({user.name})
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-xl px-4 py-3 text-sm font-medium text-kedar-gold hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      <CartDrawer />
    </>
  );
}
