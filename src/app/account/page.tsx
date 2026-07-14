'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const INDIAN_STATES = [
  'Maharashtra', 'Gujarat', 'Rajasthan', 'Karnataka', 'Delhi',
  'Uttar Pradesh', 'Madhya Pradesh', 'Punjab', 'Haryana', 'Other',
];

export default function AccountPage() {
  const { user, token, isLoading, logout, updateProfile } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Gujarat');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isLoading) return;
    if (!user || !token) {
      router.replace('/login?from=account');
      return;
    }
    setName(user.name);
    setCity(user.city || '');
    setState(user.state || 'Gujarat');
  }, [user, token, isLoading, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      await updateProfile({ name, city, state });
      setSuccess('Profile updated successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update profile.');
    } finally {
      setSaving(false);
    }
  }

  if (isLoading || !user) {
    return (
      <section className="section-padding">
        <div className="section-container text-center text-kedar-navy/60">Loading…</div>
      </section>
    );
  }

  const inputClass = 'w-full rounded-xl border border-kedar-navy/15 bg-kedar-cream/50 px-4 py-3 text-sm outline-none focus:border-kedar-gold';

  return (
    <section className="section-padding min-h-[60vh]">
      <div className="section-container mx-auto max-w-md">
        <Link href="/" className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-kedar-gold-dark hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="card">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-kedar-gold/15">
              <User className="h-6 w-6 text-kedar-gold-dark" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-kedar-navy">My Account</h1>
              <p className="text-sm text-kedar-navy/65">{user.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-kedar-navy">Name</label>
              <input id="name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-kedar-navy">Phone</label>
              <input id="phone" value={user.phone || ''} readOnly disabled className={`${inputClass} cursor-not-allowed opacity-70`} />
              <p className="mt-1 text-xs text-kedar-navy/50">Contact support to change your phone number.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="city" className="mb-1 block text-sm font-medium text-kedar-navy">City</label>
                <input id="city" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="state" className="mb-1 block text-sm font-medium text-kedar-navy">State</label>
                <select id="state" value={state} onChange={(e) => setState(e.target.value)} className={inputClass}>
                  {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {error && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}
            {success && <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div>}

            <button type="submit" disabled={saving} className="btn-primary flex w-full items-center justify-center gap-2">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-4 border-t border-kedar-navy/10 pt-4 text-sm">
            <Link href="/orders" className="font-medium text-kedar-gold-dark hover:underline">My Orders</Link>
            <button type="button" onClick={logout} className="font-medium text-kedar-navy/60 hover:text-kedar-navy">
              Log out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
