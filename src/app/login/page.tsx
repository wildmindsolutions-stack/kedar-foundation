'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useEffect, useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const INDIAN_STATES = [
  'Maharashtra', 'Gujarat', 'Rajasthan', 'Karnataka', 'Delhi',
  'Uttar Pradesh', 'Madhya Pradesh', 'Punjab', 'Haryana', 'Other',
];

function AuthForm() {
  const { login, register, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromCart = searchParams.get('from') === 'cart';

  const [mode, setMode] = useState<'login' | 'signup'>(searchParams.get('mode') === 'signup' ? 'signup' : 'login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Gujarat');

  useEffect(() => {
    if (user) {
      router.replace(fromCart ? '/?cart=open' : '/');
    }
  }, [user, router, fromCart]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push(fromCart ? '/?cart=open' : '/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await register({ name, email, password, phone, city, state });
      if (result.profileFromErp) {
        sessionStorage.setItem(
          'kedar-foundation-signup-notice',
          'Your account was linked to our existing customer record. Name and city from our ERP system were kept.',
        );
      }
      router.push(fromCart ? '/?cart=open' : '/');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Registration failed.';
      setError(msg);
      if (msg.toLowerCase().includes('please login')) {
        setMode('login');
      }
    } finally {
      setLoading(false);
    }
  }

  const inputClass = 'w-full rounded-xl border border-kedar-navy/15 bg-kedar-cream/50 px-4 py-3 text-sm outline-none focus:border-kedar-gold';

  return (
    <section className="section-padding min-h-[70vh]">
      <div className="section-container mx-auto max-w-md">
        <div className="card">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-kedar-gold/15">
              {mode === 'login' ? (
                <LogIn className="h-7 w-7 text-kedar-gold-dark" />
              ) : (
                <UserPlus className="h-7 w-7 text-kedar-gold-dark" />
              )}
            </div>
            <h1 className="font-serif text-2xl font-bold text-kedar-navy">
              {mode === 'login' ? 'Login' : 'Create Account'}
            </h1>
            <p className="mt-2 text-sm text-kedar-navy/65">
              {fromCart
                ? 'Sign in or register to place your order.'
                : mode === 'login'
                  ? 'Sign in to your Kedar Foundation customer account.'
                  : 'Register to order products. If our team already added you as a customer, use the same phone number to activate your online account.'}
            </p>
          </div>

          <div className="mb-6 flex rounded-full border border-kedar-navy/10 bg-kedar-cream/50 p-1">
            {(['login', 'signup'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => { setMode(tab); setError(''); }}
                className={cn(
                  'flex-1 rounded-full py-2 text-sm font-medium transition-all',
                  mode === tab
                    ? 'bg-kedar-navy text-white shadow-sm'
                    : 'text-kedar-navy/60 hover:text-kedar-navy',
                )}
              >
                {tab === 'login' ? 'Login' : 'Sign Up'}
              </button>
            ))}
          </div>

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-kedar-navy">Email</label>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium text-kedar-navy">Password</label>
                <input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
              </div>
              {error && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                  {error.toLowerCase().includes('please login') && (
                    <button
                      type="button"
                      className="mt-1 block font-medium text-kedar-gold-dark underline"
                      onClick={() => setMode('login')}
                    >
                      Go to Login
                    </button>
                  )}
                </div>
              )}
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-kedar-navy">Customer name *</label>
                <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="signup-email" className="mb-1 block text-sm font-medium text-kedar-navy">Email *</label>
                <input id="signup-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="signup-password" className="mb-1 block text-sm font-medium text-kedar-navy">Password *</label>
                <input id="signup-password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="Min. 6 characters" />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium text-kedar-navy">Phone *</label>
                <input id="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="10-digit mobile number" />
                <p className="mt-1 text-xs text-kedar-navy/50">
                  Must match the number in our records if you were registered by our sales team.
                  Name and city from signup are only used for new customers — existing ERP records are kept.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="city" className="mb-1 block text-sm font-medium text-kedar-navy">City</label>
                  <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="state" className="mb-1 block text-sm font-medium text-kedar-navy">State</label>
                  <select id="state" value={state} onChange={(e) => setState(e.target.value)} className={inputClass}>
                    {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              {error && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                  {error.toLowerCase().includes('please login') && (
                    <button
                      type="button"
                      className="mt-1 block font-medium text-kedar-gold-dark underline"
                      onClick={() => setMode('login')}
                    >
                      Go to Login
                    </button>
                  )}
                </div>
              )}
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Creating account…' : 'Create Account & Continue'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="section-padding text-center text-kedar-navy/60">Loading…</div>}>
      <AuthForm />
    </Suspense>
  );
}
