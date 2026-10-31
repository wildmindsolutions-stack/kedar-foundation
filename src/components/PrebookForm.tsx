'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Banknote, Loader2, Minus, Plus, ShoppingBag, Truck } from 'lucide-react';
import { ProductImage } from '@/components/ProductImage';
import { PrebookReceipt } from '@/components/PrebookReceipt';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/lib/products';
import {
  INDIAN_STATES,
  checkPincode,
  retryPrebookProducts,
  submitPrebooking,
  type PrebookCustomer,
  type PrebookProduct,
  type PrebookReceipt as Receipt,
} from '@/lib/prebook';
import { cn } from '@/lib/utils';

const INPUT =
  'w-full rounded-lg border border-kedar-navy/15 bg-kedar-cream px-4 py-2.5 text-sm outline-none transition focus:border-kedar-gold focus:ring-2 focus:ring-kedar-gold/20';
const LABEL = 'mb-1 block text-sm font-medium text-kedar-navy';

const EMPTY_CUSTOMER: PrebookCustomer = {
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: 'Gujarat',
  pincode: '',
  notes: '',
  website: '',
};

const DRAFT_KEY = 'kedar-prebook-draft';

type Errors = Partial<Record<keyof PrebookCustomer | 'items', string>>;

function validate(c: PrebookCustomer, itemCount: number): Errors {
  const e: Errors = {};
  const phone = c.phone.replace(/\D/g, '').slice(-10);
  if (itemCount === 0) e.items = 'Please add at least one product.';
  if (c.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^[6-9]\d{9}$/.test(phone)) e.phone = 'Enter a valid 10-digit mobile number.';
  if (c.email.trim() && !/^\S+@\S+\.\S+$/.test(c.email.trim())) e.email = 'Enter a valid email address.';
  if (c.address.trim().length < 5) e.address = 'Please enter your full delivery address.';
  if (c.city.trim().length < 2) e.city = 'Please enter your city.';
  if (c.state.trim().length < 2) e.state = 'Please enter your state.';
  if (!/^[1-9]\d{5}$/.test(c.pincode.trim())) e.pincode = 'Enter a valid 6-digit pincode.';
  return e;
}

function QtyStepper({
  qty,
  onChange,
  name,
  disabled,
}: {
  qty: number;
  onChange: (qty: number) => void;
  name: string;
  disabled?: boolean;
}) {
  if (qty === 0) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(1)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-kedar-gold px-4 py-2 text-sm font-semibold text-kedar-gold-dark transition hover:bg-kedar-gold hover:text-kedar-navy disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Plus className="h-4 w-4" /> Add
      </button>
    );
  }
  return (
    <div className="flex w-full items-center justify-between rounded-full bg-kedar-navy p-1 text-white">
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        className="rounded-full p-2 transition hover:bg-white/10"
        aria-label={`Decrease ${name}`}
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        max={999}
        value={qty}
        onChange={(e) => onChange(Math.max(0, Math.min(999, Math.floor(Number(e.target.value) || 0))))}
        className="w-14 bg-transparent text-center text-sm font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        aria-label={`${name} quantity`}
      />
      <button
        type="button"
        onClick={() => onChange(Math.min(999, qty + 1))}
        className="rounded-full p-2 transition hover:bg-white/10"
        aria-label={`Increase ${name}`}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

const CATEGORY_FILTERS = [
  { value: 'ALL', label: 'All Products' },
  { value: 'Flour', label: 'Flour & Atta' },
  { value: 'Grains', label: 'Wheat Grain' },
  { value: 'Pulses', label: 'Chana Dal' },
];

export function PrebookForm({
  products: initialProducts,
  live: initialLive,
}: {
  products: PrebookProduct[];
  live: boolean;
}) {
  const router = useRouter();
  const { user, token, isLoading: authLoading } = useAuth();
  const [pincodeCheck, setPincodeCheck] = useState<{ serviceable: boolean; area: string | null } | null>(null);
  const [products, setProducts] = useState(initialProducts);
  const [live, setLive] = useState(initialLive);
  const [connecting, setConnecting] = useState(!initialLive);
  const [qty, setQty] = useState<Record<string, number>>({});
  const [customer, setCustomer] = useState<PrebookCustomer>(EMPTY_CUSTOMER);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  // The server render gives up quickly, so a slow-waking API must not leave the page stuck offline.
  useEffect(() => {
    if (initialLive) return;
    const controller = new AbortController();
    retryPrebookProducts(controller.signal).then((fresh) => {
      if (controller.signal.aborted) return;
      if (fresh) {
        setProducts(fresh);
        setLive(true);
      }
      setConnecting(false);
    });
    return () => controller.abort();
  }, [initialLive]);

  // Bring back what the customer picked before being sent to log in
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(DRAFT_KEY);
      if (!saved) return;
      const draft = JSON.parse(saved);
      setQty(draft.qty ?? {});
      setCustomer((c) => ({ ...c, ...draft.customer }));
    } catch {
      // an unreadable draft just means starting fresh
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    setCustomer((c) => ({
      ...c,
      name: c.name || user.name,
      phone: c.phone || user.phone || '',
      email: c.email || user.email || '',
      city: c.city || user.city || '',
    }));
  }, [user]);

  useEffect(() => {
    setPincodeCheck(null);
    const pincode = customer.pincode.trim();
    if (!/^[1-9]\d{5}$/.test(pincode)) return;
    const controller = new AbortController();
    checkPincode(pincode, controller.signal)
      .then(setPincodeCheck)
      .catch(() => {
        // the server still checks the pincode on submit
      });
    return () => controller.abort();
  }, [customer.pincode]);

  const selected = useMemo(
    () => products.filter((p) => (qty[p.id] ?? 0) > 0).map((p) => ({ product: p, qty: qty[p.id] })),
    [products, qty],
  );
  const total = selected.reduce((sum, s) => sum + s.product.price * s.qty, 0);
  const totalUnits = selected.reduce((sum, s) => sum + s.qty, 0);

  const filteredProducts = useMemo(() => {
    if (categoryFilter === 'ALL') return products;
    return products.filter((p) => p.category.toLowerCase() === categoryFilter.toLowerCase());
  }, [products, categoryFilter]);

  const setField = (key: keyof PrebookCustomer) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setCustomer((c) => ({ ...c, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const updateQty = (id: string, value: number) => {
    setQty((q) => ({ ...q, [id]: value }));
    if (errors.items) setErrors((prev) => ({ ...prev, items: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!token) {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ qty, customer }));
      router.push('/login?from=prebook');
      return;
    }
    const found = validate(customer, selected.length);
    if (pincodeCheck?.serviceable === false) {
      found.pincode = 'Sorry, we do not deliver to this pincode yet.';
    }
    setErrors(found);
    if (Object.keys(found).length) {
      const first = found.items ? 'prebook-products' : `prebook-${Object.keys(found)[0]}`;
      document.getElementById(first)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitPrebooking(
        customer,
        selected.map((s) => ({ productId: s.product.id, qty: s.qty })),
        token,
      );
      sessionStorage.removeItem(DRAFT_KEY);
      setReceipt(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Could not place your pre-booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (receipt) {
    return (
      <PrebookReceipt
        receipt={receipt}
        onNew={() => {
          setReceipt(null);
          setQty({});
          setCustomer(EMPTY_CUSTOMER);
        }}
      />
    );
  }

  const fieldError = (key: keyof PrebookCustomer) =>
    errors[key] ? <p className="mt-1 text-xs text-red-600">{errors[key]}</p> : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-8 pb-24 lg:grid-cols-[1fr_380px] lg:pb-0">
      <div className="space-y-10">
        {/* Price list */}
        <section id="prebook-products" aria-labelledby="prebook-price-list">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="eyebrow">Step 1</p>
              <h2 id="prebook-price-list" className="font-serif text-2xl font-semibold text-kedar-navy">
                Choose your products
              </h2>
            </div>
            <p className="text-sm font-medium text-emerald-800">
              Prices are per pack · 5% GST included directly
            </p>
          </div>

          {/* Category filter pills */}
          <div className="mb-6 flex flex-wrap gap-2">
            {CATEGORY_FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setCategoryFilter(f.value)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-xs font-semibold transition',
                  categoryFilter === f.value
                    ? 'bg-kedar-navy text-kedar-gold shadow-sm'
                    : 'border border-kedar-navy/15 bg-white text-kedar-navy/70 hover:border-kedar-gold hover:text-kedar-navy',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {connecting && (
            <div className="mb-5 flex items-start gap-2 rounded-xl border border-kedar-navy/10 bg-white p-4 text-sm text-kedar-navy/75">
              <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin" />
              Connecting to our booking system. This can take up to a minute…
            </div>
          )}
          {!live && !connecting && (
            <div className="mb-5 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              Online pre-booking is temporarily unavailable. Please call us at the number below to book.
            </div>
          )}
          {errors.items && (
            <p className="mb-4 flex items-center gap-2 text-sm font-medium text-red-600">
              <AlertCircle className="h-4 w-4" /> {errors.items}
            </p>
          )}

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((p) => {
              const q = qty[p.id] ?? 0;
              const displayName = p.name.replace(/\s*\([^)]*\)\s*$/, '');
              return (
                <article
                  key={p.id}
                  className={cn(
                    'flex flex-col overflow-hidden rounded-2xl border bg-white shadow-card transition-all duration-300',
                    q > 0 ? 'border-kedar-gold ring-2 ring-kedar-gold/30' : 'border-kedar-navy/10 hover:shadow-lifted',
                  )}
                >
                  <div className="relative aspect-[4/3]">
                    <ProductImage
                      product={{ slug: p.id, name: displayName || p.name, imageUrl: p.imageUrl, category: p.category }}
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    {p.packSize && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-kedar-navy shadow">
                        {p.packSize}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-lg font-semibold text-kedar-navy">{p.name}</h3>
                    {p.description && (
                      <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-kedar-navy/65">{p.description}</p>
                    )}
                    <div className="mt-auto pt-4">
                      <div className="mb-3">
                        <p className="text-kedar-navy">
                          {live ? (
                            <>
                              <span className="text-xl font-bold">{formatPrice(p.price)}</span>
                              <span className="text-sm text-kedar-navy/55"> / {p.packSize || p.unitName}</span>
                            </>
                          ) : (
                            <span className="text-sm text-kedar-navy/55">{p.packSize || p.unitName} · price shown when connected</span>
                          )}
                        </p>
                        <p className="mt-0.5 text-[11px] font-medium text-emerald-700">5% tax included directly</p>
                      </div>
                      <QtyStepper qty={q} name={p.name} disabled={!live} onChange={(v) => updateQty(p.id, v)} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Customer details */}
        <section aria-labelledby="prebook-details" className="card">
          <p className="eyebrow">Step 2</p>
          <h2 id="prebook-details" className="mb-5 font-serif text-2xl font-semibold text-kedar-navy">
            Delivery details
          </h2>

          {/* Honeypot: hidden from people, tempting for bots */}
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="prebook-website">Website</label>
            <input id="prebook-website" tabIndex={-1} autoComplete="off" value={customer.website} onChange={setField('website')} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="prebook-name" className={LABEL}>
                Full name <span className="text-kedar-gold-dark">*</span>
              </label>
              <input id="prebook-name" autoComplete="name" className={INPUT} value={customer.name} onChange={setField('name')} />
              {fieldError('name')}
            </div>
            <div>
              <label htmlFor="prebook-phone" className={LABEL}>
                Mobile number <span className="text-kedar-gold-dark">*</span>
              </label>
              <input
                id="prebook-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="10-digit mobile"
                className={INPUT}
                value={customer.phone}
                onChange={setField('phone')}
              />
              {fieldError('phone')}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="prebook-email" className={LABEL}>
                Email <span className="text-kedar-navy/40">(optional)</span>
              </label>
              <input
                id="prebook-email"
                type="email"
                autoComplete="email"
                placeholder="For invoice and updates"
                className={INPUT}
                value={customer.email}
                onChange={setField('email')}
              />
              {fieldError('email')}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="prebook-address" className={LABEL}>
                Delivery address <span className="text-kedar-gold-dark">*</span>
              </label>
              <textarea
                id="prebook-address"
                rows={2}
                autoComplete="street-address"
                placeholder="House / Flat no., Society / Building, Landmark"
                className={INPUT}
                value={customer.address}
                onChange={setField('address')}
              />
              {fieldError('address')}
            </div>
            <div>
              <label htmlFor="prebook-city" className={LABEL}>
                City <span className="text-kedar-gold-dark">*</span>
              </label>
              <input id="prebook-city" autoComplete="address-level2" className={INPUT} value={customer.city} onChange={setField('city')} />
              {fieldError('city')}
            </div>
            <div>
              <label htmlFor="prebook-state" className={LABEL}>
                State <span className="text-kedar-gold-dark">*</span>
              </label>
              <select id="prebook-state" autoComplete="address-level1" className={INPUT} value={customer.state} onChange={setField('state')}>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {fieldError('state')}
            </div>
            <div>
              <label htmlFor="prebook-pincode" className={LABEL}>
                Pincode <span className="text-kedar-gold-dark">*</span>
              </label>
              <input
                id="prebook-pincode"
                type="text"
                inputMode="numeric"
                maxLength={6}
                autoComplete="postal-code"
                placeholder="6-digit pincode"
                className={INPUT}
                value={customer.pincode}
                onChange={setField('pincode')}
              />
              {fieldError('pincode')}
                {!errors.pincode && pincodeCheck?.serviceable === false && (
                  <p className="mt-1 text-xs text-red-600">Sorry, we do not deliver to this pincode yet.</p>
                )}
                {pincodeCheck?.area && (
                  <p className="mt-1 text-xs text-emerald-700">We deliver here · {pincodeCheck.area}</p>
                )}
            </div>
            <div>
              <label htmlFor="prebook-notes" className={LABEL}>
                Delivery note <span className="text-kedar-navy/40">(optional)</span>
              </label>
              <input
                id="prebook-notes"
                placeholder="e.g. Call before delivery"
                className={INPUT}
                value={customer.notes}
                onChange={setField('notes')}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Cart sidebar */}
      <aside aria-label="Pre-booking summary">
        <div className="sticky top-28 card">
          <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-kedar-navy">
            <ShoppingBag className="h-5 w-5 text-kedar-gold-dark" /> Your pre-booking
          </h2>

          {selected.length === 0 ? (
            <p className="mt-4 rounded-xl bg-kedar-cream p-4 text-sm text-kedar-navy/60">
              No products added yet. Tap <strong>Add</strong> on any product to begin.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-kedar-navy/10">
              {selected.map(({ product, qty: q }) => (
                <li key={product.id} className="flex justify-between gap-3 py-2.5 text-sm">
                  <span className="text-kedar-navy">
                    {product.name}
                    <span className="block text-xs text-kedar-navy/55">
                      {q} × {formatPrice(product.price)}
                      {product.packSize ? ` · ${product.packSize}` : ''}
                    </span>
                  </span>
                  <span className="shrink-0 font-semibold text-kedar-navy">{formatPrice(product.price * q)}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex items-baseline justify-between border-t border-kedar-navy/10 pt-4">
            <div>
              <span className="text-sm font-medium text-kedar-navy/70">Total amount</span>
              <span className="block text-[11px] text-emerald-700">5% tax included directly</span>
            </div>
            <span className="font-serif text-2xl font-bold text-kedar-navy">{formatPrice(total)}</span>
          </div>

          <div className="mt-4 space-y-2 rounded-xl bg-kedar-cream p-4 text-sm text-kedar-navy/75">
            <p className="flex items-center gap-2">
              <Banknote className="h-4 w-4 shrink-0 text-kedar-gold-dark" /> Pay cash at the time of delivery
            </p>
            <p className="flex items-center gap-2">
              <Truck className="h-4 w-4 shrink-0 text-kedar-gold-dark" /> Free local delivery · Call to confirm
            </p>
          </div>

          {submitError && (
            <p className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {submitError}
            </p>
          )}

          <button type="submit" disabled={submitting || !live} className="btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Placing pre-booking…
              </>
            ) : (
              !authLoading && !token ? 'Log in to Pre-book' : 'Confirm Pre-booking'
            )}
          </button>
          <p className="mt-3 text-center text-xs text-kedar-navy/50">
            Cash on delivery. Official GST invoice can be generated upon delivery or request from dashboard.
          </p>
        </div>
      </aside>

      {/* Mobile bottom bar */}
      {selected.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-kedar-navy/10 bg-white/95 px-4 py-3 shadow-lifted backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
            <div>
              <p className="text-xs text-kedar-navy/60">{totalUnits} pack{totalUnits === 1 ? '' : 's'} · 5% tax incl.</p>
              <p className="font-serif text-lg font-bold text-kedar-navy">{formatPrice(total)}</p>
            </div>
            <button
              type="button"
              onClick={() => document.getElementById('prebook-details')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="btn-primary px-5 py-2.5"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
