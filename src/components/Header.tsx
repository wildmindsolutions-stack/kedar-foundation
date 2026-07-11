'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { LogIn, LogOut, Menu, Package, ShoppingCart, User, X } from 'lucide-react';
import { CartDrawer } from '@/components/CartDrawer';
import { NotificationPanel } from '@/components/NotificationPanel';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { NAV_LINKS, SITE } from '@/lib/content';
import { cn } from '@/lib/utils';

export function Header() {
  const [open, setOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { user, logout, isLoading } = useAuth();

  return (
    <>
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

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/90 transition-colors hover:text-kedar-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={openCart}
              className="relative rounded-lg p-2.5 text-white transition-colors hover:bg-white/10 hover:text-kedar-gold"
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
                className="relative rounded-lg p-2.5 text-white transition-colors hover:bg-white/10 hover:text-kedar-gold sm:hidden"
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
                    className="rounded-lg p-2.5 text-white/80 hover:bg-white/10 hover:text-white"
                    aria-label="Log out"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:text-kedar-gold sm:inline-flex"
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
              className="rounded-lg p-2 text-white lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            'border-t border-kedar-gold/10 bg-kedar-navy lg:hidden',
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
            {user ? (
              <>
                <Link
                  href="/orders"
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-kedar-gold hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  <Package className="h-4 w-4" />
                  My Orders
                </Link>
                <button
                  type="button"
                  onClick={() => { logout(); setOpen(false); }}
                  className="rounded-lg px-4 py-3 text-left text-sm font-medium text-white/90 hover:bg-white/5"
                >
                  Log out ({user.name})
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-lg px-4 py-3 text-sm font-medium text-kedar-gold hover:bg-white/5"
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
