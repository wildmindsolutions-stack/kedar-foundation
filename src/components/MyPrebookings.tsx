'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { cancelMyPrebooking, fetchMyPrebookings, type PrebookTracking } from '@/lib/prebook';
import { formatPrice } from '@/lib/products';

function stageLabel(b: PrebookTracking) {
  if (b.status === 'CANCELLED') return 'Cancelled';
  if (b.status === 'DELIVERED') return 'Delivered';
  if (b.outForDeliveryAt) return 'Out for delivery';
  if (b.status === 'CONFIRMED') return 'Confirmed';
  return 'Awaiting confirmation';
}

export function MyPrebookings() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState<PrebookTracking[]>([]);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    if (!token) return;
    fetchMyPrebookings(token).then(setBookings).catch(() => setBookings([]));
  }, [token]);

  useEffect(load, [load]);

  const cancel = async (bookingNo: string) => {
    if (!token || !window.confirm(`Cancel pre-booking ${bookingNo}?`)) return;
    setError('');
    try {
      await cancelMyPrebooking(bookingNo, token);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not cancel. Please call us.');
    }
  };

  if (bookings.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="font-serif text-2xl font-bold text-kedar-navy">My Pre-bookings</h2>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <ul className="mt-4 space-y-3">
        {bookings.map((b) => (
          <li key={b.bookingNo} className="card flex flex-wrap items-center justify-between gap-3 !p-4">
            <div>
              <p className="font-mono text-sm font-semibold text-kedar-navy">{b.bookingNo}</p>
              <p className="text-sm text-kedar-navy/60">
                {stageLabel(b)} · {formatPrice(b.total)} · Cash on delivery
              </p>
            </div>
            <div className="flex items-center gap-4">
              {(b.status === 'PENDING' || (b.status === 'CONFIRMED' && !b.assignedAt)) && (
                <button
                  type="button"
                  onClick={() => cancel(b.bookingNo)}
                  className="text-sm font-medium text-red-600 hover:underline"
                >
                  Cancel
                </button>
              )}
              <Link
                href={`/prebook/track?bookingNo=${encodeURIComponent(b.bookingNo)}&phone=${b.phone}`}
                className="text-sm font-semibold text-kedar-gold-dark hover:underline"
              >
                Track
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
