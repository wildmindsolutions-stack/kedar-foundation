'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, Check, Loader2 } from 'lucide-react';
import { trackPrebooking, type PrebookTracking } from '@/lib/prebook';
import { formatPrice } from '@/lib/products';
import { cn } from '@/lib/utils';

const INPUT =
  'w-full rounded-lg border border-kedar-navy/15 bg-kedar-cream px-4 py-2.5 text-sm outline-none transition focus:border-kedar-gold focus:ring-2 focus:ring-kedar-gold/20';

function formatWhen(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function buildSteps(t: PrebookTracking) {
  return [
    { label: 'Pre-booking received', at: t.createdAt },
    { label: 'Confirmed by our team', at: t.confirmedAt },
    {
      label: t.executiveName ? `Assigned to ${t.executiveName}` : 'Delivery executive assigned',
      at: t.assignedAt,
    },
    { label: 'Out for delivery', at: t.outForDeliveryAt },
    { label: 'Delivered', at: t.deliveredAt },
  ];
}

export function PrebookTracker() {
  const params = useSearchParams();
  const [bookingNo, setBookingNo] = useState(params.get('bookingNo') ?? '');
  const [phone, setPhone] = useState(params.get('phone') ?? '');
  const [tracking, setTracking] = useState<PrebookTracking | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const lookup = useCallback(async (no: string, mobile: string) => {
    setLoading(true);
    setError('');
    try {
      setTracking(await trackPrebooking(no.trim(), mobile.trim()));
    } catch {
      setTracking(null);
      setError('We could not find that booking. Please check the booking number and mobile number.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const no = params.get('bookingNo');
    const mobile = params.get('phone');
    if (no && mobile) lookup(no, mobile);
  }, [params, lookup]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <form
        className="card grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          lookup(bookingNo, phone);
        }}
      >
        <div>
          <label htmlFor="track-booking" className="mb-1 block text-sm font-medium text-kedar-navy">
            Booking number
          </label>
          <input
            id="track-booking"
            required
            placeholder="PB/2026-27/0001"
            className={INPUT}
            value={bookingNo}
            onChange={(e) => setBookingNo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="track-phone" className="mb-1 block text-sm font-medium text-kedar-navy">
            Mobile number
          </label>
          <input
            id="track-phone"
            required
            type="tel"
            inputMode="numeric"
            className={INPUT}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary sm:col-span-2 disabled:opacity-60">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Track order'}
        </button>
      </form>

      {error && (
        <p className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
        </p>
      )}

      {tracking && (
        <div className="card">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-sm font-semibold text-kedar-navy">{tracking.bookingNo}</p>
              <p className="text-sm text-kedar-navy/60">
                {tracking.items.length} item{tracking.items.length === 1 ? '' : 's'} · {formatPrice(tracking.total)} · Cash
                on delivery
              </p>
            </div>
          </div>

          {tracking.status === 'CANCELLED' ? (
            <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">
              This pre-booking was cancelled. Please contact us if you need help.
            </p>
          ) : (
            <>
            {tracking.lastFailReason && !tracking.deliveredAt && (
              <p className="mt-5 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
                We could not complete delivery on our last attempt. Our team will contact you to reschedule.
              </p>
            )}
            <ol className="mt-5">
              {buildSteps(tracking).map((step, index, steps) => {
                const done = Boolean(step.at);
                return (
                  <li key={step.label} className="relative flex gap-3 pb-5 last:pb-0">
                    {index < steps.length - 1 && (
                      <span
                        className={cn(
                          'absolute left-[11px] top-6 h-[calc(100%-1.5rem)] w-0.5',
                          done && steps[index + 1].at ? 'bg-kedar-gold' : 'bg-kedar-navy/10',
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                        done ? 'bg-kedar-gold text-kedar-navy' : 'bg-kedar-navy/10',
                      )}
                    >
                      {done && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <div>
                      <p className={cn('text-sm font-medium', done ? 'text-kedar-navy' : 'text-kedar-navy/45')}>
                        {step.label}
                      </p>
                      {step.at && <p className="text-xs text-kedar-navy/55">{formatWhen(step.at)}</p>}
                    </div>
                  </li>
                );
              })}
            </ol>
            </>
          )}
        </div>
      )}
    </div>
  );
}
