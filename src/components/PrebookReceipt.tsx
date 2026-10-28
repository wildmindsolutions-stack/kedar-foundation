'use client';

import Image from 'next/image';
import { CheckCircle2, Printer, RotateCcw } from 'lucide-react';
import { SITE } from '@/lib/content';
import { formatPrice } from '@/lib/products';
import type { PrebookReceipt as Receipt } from '@/lib/prebook';

const inr = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(n);

export function PrebookReceipt({ receipt, onNew }: { receipt: Receipt; onNew: () => void }) {
  const date = new Date(receipt.createdAt).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 text-center print:hidden">
        <CheckCircle2 className="mx-auto mb-3 h-14 w-14 text-emerald-600" />
        <h2 className="font-serif text-3xl font-semibold text-kedar-navy">Pre-booking confirmed!</h2>
        <p className="mt-2 text-kedar-navy/70">
          Thank you, {receipt.name.split(' ')[0]}. Our team will call you on {receipt.phone} to arrange delivery.
          Please keep this receipt for reference.
        </p>
      </div>

      <div className="print-receipt overflow-hidden rounded-2xl border border-kedar-navy/10 bg-white shadow-card">
        <div className="flex items-center justify-between gap-4 bg-kedar-navy px-6 py-5 text-white print:bg-white print:text-kedar-navy">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="" width={44} height={44} className="h-11 w-11 object-contain" />
            <div>
              <p className="font-serif text-lg font-semibold">{SITE.name}</p>
              <p className="text-xs text-white/70 print:text-kedar-navy/60">{SITE.tagline}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-widest text-kedar-gold">Pre-booking Receipt</p>
            <p className="font-mono text-sm font-semibold">{receipt.bookingNo}</p>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-kedar-navy/50">Deliver to</p>
              <p className="mt-1 font-semibold text-kedar-navy">{receipt.name}</p>
              <p className="text-kedar-navy/75">{receipt.address}</p>
              <p className="text-kedar-navy/75">
                {receipt.city}, {receipt.state} – {receipt.pincode}
              </p>
              <p className="text-kedar-navy/75">+91 {receipt.phone}</p>
              {receipt.email && <p className="text-kedar-navy/75">{receipt.email}</p>}
            </div>
            <div className="sm:text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-kedar-navy/50">Booked on</p>
              <p className="mt-1 text-kedar-navy">{date}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-kedar-navy/50">Payment</p>
              <p className="mt-1 text-kedar-navy">Cash on Delivery</p>
              <span className="mt-1 inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                {receipt.paymentReceived ? 'Paid' : 'Pay at delivery'}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-kedar-navy/15 text-left text-xs uppercase tracking-wider text-kedar-navy/50">
                  <th className="py-2 pr-2 font-semibold">Product</th>
                  <th className="px-2 py-2 text-right font-semibold">Qty</th>
                  <th className="px-2 py-2 text-right font-semibold">Rate</th>
                  <th className="py-2 pl-2 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-kedar-navy/10">
                {receipt.items.map((item) => (
                  <tr key={item.productName}>
                    <td className="py-2.5 pr-2 text-kedar-navy">
                      {item.productName}
                      {item.packSize && <span className="block text-xs text-kedar-navy/55">{item.packSize}</span>}
                    </td>
                    <td className="px-2 py-2.5 text-right text-kedar-navy">{item.qty}</td>
                    <td className="px-2 py-2.5 text-right text-kedar-navy/75">{formatPrice(item.rate)}</td>
                    <td className="py-2.5 pl-2 text-right font-medium text-kedar-navy">{inr(item.lineTotal)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-kedar-navy/15">
                  <td colSpan={3} className="pt-3 text-right font-semibold text-kedar-navy">
                    Amount payable at delivery (5% tax included)
                  </td>
                  <td className="pt-3 text-right font-serif text-xl font-bold text-kedar-navy">{inr(receipt.total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {receipt.notes && (
            <p className="rounded-lg bg-kedar-cream p-3 text-sm text-kedar-navy/75">
              <span className="font-semibold text-kedar-navy">Notes: </span>
              {receipt.notes}
            </p>
          )}

          <div className="border-t border-dashed border-kedar-navy/20 pt-4 text-xs leading-relaxed text-kedar-navy/60">
            <p>
              This is a pre-booking confirmation receipt. Prices directly include 5% GST. An official tax invoice /
              receipt can be generated upon delivery or requested from our dashboard team.
            </p>
            <p className="mt-2">
              Questions? Call {SITE.phone} or email {SITE.email} with your booking number{' '}
              <span className="font-mono font-semibold text-kedar-navy">{receipt.bookingNo}</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row print:hidden">
        <button type="button" onClick={() => window.print()} className="btn-primary">
          <Printer className="mr-2 h-4 w-4" /> Print / Save as PDF
        </button>
        <button type="button" onClick={onNew} className="btn-outline">
          <RotateCcw className="mr-2 h-4 w-4" /> New pre-booking
        </button>
      </div>
    </div>
  );
}
