'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Bell, Check, Package, X } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { apiFetch } from '@/lib/api';
import { cn } from '@/lib/utils';

interface CustomerNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  refId: string | null;
  isRead: boolean;
  createdAt: string;
}

const TYPE_STYLES: Record<string, string> = {
  ORDER_RECEIVED: 'bg-amber-100 text-amber-800',
  ORDER_AWAITING_STOCK: 'bg-orange-100 text-orange-800',
  ORDER_CONFIRMED: 'bg-emerald-100 text-emerald-800',
  ORDER_DISPATCHED: 'bg-cyan-100 text-cyan-800',
  ORDER_DELIVERED: 'bg-green-100 text-green-800',
  ORDER_CANCELLED: 'bg-red-100 text-red-800',
};

function formatWhen(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export function NotificationPanel() {
  const { token, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<CustomerNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    try {
      const [list, unread] = await Promise.all([
        apiFetch<CustomerNotification[]>('/store/notifications', { token }),
        apiFetch<{ count: number }>('/store/notifications/unread-count', { token }),
      ]);
      setNotifications(list);
      setUnreadCount(unread.count);
    } catch {
      /* ignore poll errors */
    }
  }, [token]);

  useEffect(() => {
    if (!user || !token) return;
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, [user, token, fetchNotifications]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [open]);

  if (!user || !token) return null;

  async function markRead(id: string) {
    if (!token) return;
    await apiFetch(`/store/notifications/${id}/read`, { method: 'PATCH', token });
    fetchNotifications();
  }

  async function markAllRead() {
    if (!token) return;
    await apiFetch('/store/notifications/read-all', { method: 'PATCH', token });
    fetchNotifications();
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative rounded-lg p-2.5 text-white transition-colors hover:bg-white/10 hover:text-kedar-gold"
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-kedar-gold px-1 text-[10px] font-bold text-kedar-navy">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[60] bg-kedar-navy/40 md:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close notifications"
          />
          <div
            className={cn(
              'z-[70] overflow-hidden rounded-xl border border-kedar-navy/10 bg-white shadow-2xl',
              'fixed left-3 right-3 top-[4.5rem] max-h-[min(70vh,32rem)]',
              'md:absolute md:inset-auto md:left-auto md:right-0 md:top-full md:mt-2 md:w-[min(24rem,calc(100vw-2rem))] md:max-h-80',
            )}
          >
            <div className="flex items-center justify-between border-b border-kedar-navy/10 px-3 py-2.5 sm:px-4 sm:py-3">
              <h3 className="font-serif text-sm font-semibold text-kedar-navy sm:text-base">Order Updates</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="flex items-center gap-1 text-[10px] font-medium text-kedar-gold-dark hover:underline sm:text-xs"
                  >
                    <Check className="h-3 w-3" />
                    Mark all read
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded p-1 text-kedar-navy/50 hover:bg-kedar-cream md:hidden"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="max-h-[calc(min(70vh,32rem)-7rem)] overflow-y-auto md:max-h-64">
              {notifications.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-kedar-navy/50">
                  No notifications yet. Place an order to track its status here.
                </p>
              ) : (
                <ul>
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className={cn(
                        'border-b border-kedar-navy/5 px-3 py-2.5 sm:px-4 sm:py-3',
                        !n.isRead && 'bg-kedar-gold/5',
                      )}
                    >
                      <button
                        type="button"
                        className="w-full text-left"
                        onClick={() => !n.isRead && markRead(n.id)}
                      >
                        <div className="mb-1 flex items-start justify-between gap-2">
                          <span
                            className={cn(
                              'rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase sm:text-[10px]',
                              TYPE_STYLES[n.type] ?? 'bg-slate-100 text-slate-700',
                            )}
                          >
                            {n.type.replace('ORDER_', '').replace(/_/g, ' ')}
                          </span>
                          <span className="shrink-0 text-[9px] text-kedar-navy/45 sm:text-[10px]">
                            {formatWhen(n.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-kedar-navy sm:text-sm">{n.title}</p>
                        <p className="mt-0.5 break-words text-[11px] leading-relaxed text-kedar-navy/65 sm:text-xs">
                          {n.message}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-kedar-navy/10 px-3 py-2 sm:px-4 sm:py-2.5">
              <Link
                href="/orders"
                className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-kedar-gold-dark hover:underline sm:text-xs"
                onClick={() => setOpen(false)}
              >
                <Package className="h-3.5 w-3.5" />
                View My Orders
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
