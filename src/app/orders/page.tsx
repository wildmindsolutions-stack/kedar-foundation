'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, Loader2, Package } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { apiFetch, downloadInvoicePdf } from '@/lib/api';
import { formatPrice } from '@/lib/products';

interface InvoiceLineItem {
  id: string;
  qty: number;
  rate: number;
  hsnCode: string;
  gstRate: number;
  taxable: number;
  cgst: number;
  sgst: number;
  igst: number;
  lineTotal: number;
  product: { name: string };
}

interface OrderItem {
  id: string;
  qty: number;
  rate: number;
  product: { name: string; unit: { symbol: string } };
}

interface Delivery {
  id: string;
  challanNo: string;
  status: string;
}

interface Invoice {
  id: string;
  invoiceNo: string;
  subtotal: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  gstAmount: number;
  total: number;
  deliveries: Delivery[];
  items: InvoiceLineItem[];
}

interface Order {
  id: string;
  status: string;
  orderDate: string;
  items: OrderItem[];
  invoice: Invoice | null;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  DRAFT: { label: 'Pending Confirmation', color: 'bg-amber-100 text-amber-800' },
  CONFIRMED: { label: 'Confirmed', color: 'bg-emerald-100 text-emerald-800' },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-100 text-red-800' },
};

function deliveryStatus(order: Order): { label: string; color: string } | null {
  const delivery = order.invoice?.deliveries?.[0];
  if (!delivery) {
    if (order.status === 'CONFIRMED') {
      return { label: 'Preparing for Dispatch', color: 'bg-blue-100 text-blue-800' };
    }
    return null;
  }
  if (delivery.status === 'DELIVERED') {
    return { label: 'Delivered', color: 'bg-green-100 text-green-800' };
  }
  if (delivery.status === 'DISPATCHED') {
    return { label: 'Dispatched', color: 'bg-cyan-100 text-cyan-800' };
  }
  return { label: 'Dispatch Pending', color: 'bg-slate-100 text-slate-700' };
}

function orderSubtotal(order: Order) {
  if (order.invoice) return order.invoice.subtotal;
  return order.items.reduce((sum, i) => sum + i.qty * i.rate, 0);
}

function orderGrandTotal(order: Order) {
  if (order.invoice) return order.invoice.total;
  return orderSubtotal(order);
}

export default function OrdersPage() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!user || !token) {
      router.replace('/login?from=orders');
      return;
    }
    apiFetch<Order[]>('/store/orders', { token })
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [user, token, isLoading, router]);

  async function handleDownloadPdf(invoice: Invoice) {
    if (!token) return;
    setDownloadingId(invoice.id);
    try {
      await downloadInvoicePdf(
        invoice.id,
        token,
        `${invoice.invoiceNo.replace(/\//g, '-')}.pdf`,
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Could not download invoice');
    } finally {
      setDownloadingId(null);
    }
  }

  if (isLoading || loading) {
    return (
      <section className="section-padding">
        <div className="section-container text-center text-kedar-navy/60">Loading orders…</div>
      </section>
    );
  }

  return (
    <section className="section-padding min-h-[60vh]">
      <div className="section-container max-w-3xl">
        <Link href="/" className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-kedar-gold-dark hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="font-serif text-3xl font-bold text-kedar-navy">My Orders</h1>
        <p className="mt-2 text-sm text-kedar-navy/65">Track confirmation, dispatch, delivery, and invoice details.</p>

        {orders.length === 0 ? (
          <div className="card mt-8 text-center">
            <Package className="mx-auto mb-3 h-10 w-10 text-kedar-navy/25" />
            <p className="text-kedar-navy/70">No orders yet.</p>
            <Link href="/products" className="btn-primary mt-4 inline-flex">Browse Products</Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {orders.map((order) => {
              const status = STATUS_LABELS[order.status] ?? STATUS_LABELS.DRAFT;
              const delivery = deliveryStatus(order);
              const subtotal = orderSubtotal(order);
              const grandTotal = orderGrandTotal(order);
              const inv = order.invoice;
              const lineItems = inv?.items?.length
                ? inv.items.map((ii) => ({
                    key: ii.id,
                    label: `${ii.product.name} × ${ii.qty}`,
                    taxable: ii.taxable,
                    lineTotal: ii.lineTotal,
                    gstRate: ii.gstRate,
                  }))
                : order.items.map((i) => ({
                    key: i.id,
                    label: `${i.product.name} × ${i.qty} ${i.product.unit.symbol}`,
                    taxable: i.qty * i.rate,
                    lineTotal: i.qty * i.rate,
                    gstRate: null as number | null,
                  }));

              return (
                <li key={order.id} className="card">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-kedar-navy/50">
                        {new Date(order.orderDate).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </p>
                      <p className="mt-1 font-medium text-kedar-navy">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        {' · '}
                        {formatPrice(grandTotal)}
                        {inv && (
                          <span className="text-sm font-normal text-kedar-navy/55"> (incl. GST)</span>
                        )}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={cnBadge(status.color)}>{status.label}</span>
                      {delivery && <span className={cnBadge(delivery.color)}>{delivery.label}</span>}
                    </div>
                  </div>

                  {inv && (
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs text-kedar-navy/55">Invoice: {inv.invoiceNo}</p>
                      <button
                        type="button"
                        onClick={() => handleDownloadPdf(inv)}
                        disabled={downloadingId === inv.id}
                        className="inline-flex items-center gap-1.5 rounded-full border border-kedar-gold/40 bg-kedar-gold/10 px-3 py-1.5 text-xs font-semibold text-kedar-navy transition-colors hover:bg-kedar-gold/20 disabled:opacity-60"
                      >
                        {downloadingId === inv.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Download className="h-3.5 w-3.5" />
                        )}
                        Invoice PDF
                      </button>
                    </div>
                  )}

                  <ul className="mt-3 space-y-1.5 border-t border-kedar-navy/10 pt-3">
                    {lineItems.map((line) => (
                      <li key={line.key} className="text-sm text-kedar-navy/75">
                        <div className="flex justify-between gap-2">
                          <span>{line.label}</span>
                          <span className="shrink-0">{formatPrice(line.lineTotal)}</span>
                        </div>
                        {inv && line.gstRate != null && line.gstRate > 0 && (
                          <p className="text-[11px] text-kedar-navy/45">
                            Taxable {formatPrice(line.taxable)}
                            {line.lineTotal > line.taxable && (
                              <> · GST {line.gstRate}% ({formatPrice(line.lineTotal - line.taxable)})</>
                            )}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>

                  {inv ? (
                    <div className="mt-3 space-y-1 border-t border-kedar-navy/10 pt-3 text-sm">
                      <div className="flex justify-between text-kedar-navy/70">
                        <span>Subtotal (taxable)</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      {inv.cgstAmount > 0 && (
                        <div className="flex justify-between text-kedar-navy/70">
                          <span>CGST</span>
                          <span>{formatPrice(inv.cgstAmount)}</span>
                        </div>
                      )}
                      {inv.sgstAmount > 0 && (
                        <div className="flex justify-between text-kedar-navy/70">
                          <span>SGST</span>
                          <span>{formatPrice(inv.sgstAmount)}</span>
                        </div>
                      )}
                      {inv.igstAmount > 0 && (
                        <div className="flex justify-between text-kedar-navy/70">
                          <span>IGST</span>
                          <span>{formatPrice(inv.igstAmount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold text-kedar-navy">
                        <span>Grand Total</span>
                        <span>{formatPrice(grandTotal)}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-3 border-t border-kedar-navy/10 pt-3 text-xs text-kedar-navy/50">
                      Subtotal {formatPrice(subtotal)} (excl. GST) — final tax will be calculated when your order is confirmed.
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

function cnBadge(color: string) {
  return `rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${color}`;
}
