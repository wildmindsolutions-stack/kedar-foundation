'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.replace('/');
  }, [user, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section-padding min-h-[70vh]">
      <div className="section-container mx-auto max-w-md">
        <div className="card">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-kedar-gold/15">
              <LogIn className="h-7 w-7 text-kedar-gold-dark" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-kedar-navy">Login</h1>
            <p className="mt-2 text-sm text-kedar-navy/65">
              Sign in with your Kedar Enterprise account. This uses the same login as the ERP system
              for staff and registered partners.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-kedar-navy">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-kedar-navy/15 bg-kedar-cream/50 px-4 py-3 text-sm outline-none focus:border-kedar-gold"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-kedar-navy">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-kedar-navy/15 bg-kedar-cream/50 px-4 py-3 text-sm outline-none focus:border-kedar-gold"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-kedar-navy/50">
            Demo: <span className="font-medium text-kedar-navy/70">admin@kedarenterprise.com</span>
            {' '}/ password <span className="font-medium text-kedar-navy/70">admin123</span>
          </p>
          <p className="mt-3 text-center text-xs text-kedar-navy/50">
            Need an account?{' '}
            <Link href="/contact" className="font-medium text-kedar-gold-dark hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
