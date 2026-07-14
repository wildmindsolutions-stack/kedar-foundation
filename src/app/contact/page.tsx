'use client';

import { FormEvent, useState } from 'react';
import { Mail, MapPin, Phone, Send, Shield, Globe, Loader2 } from 'lucide-react';
import { PageHero } from '@/components/InitiativeCard';
import { SectionHeading } from '@/components/SectionHeading';
import { SITE } from '@/lib/content';
import { apiFetch } from '@/lib/api';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await apiFetch<{ message: string }>('/store/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: String(data.get('name') || ''),
          email: String(data.get('email') || ''),
          subject: String(data.get('subject') || 'General Inquiry'),
          message: String(data.get('message') || ''),
        }),
      });
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send your message. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        subtitle="Whether you want to collaborate, volunteer, partner, or inquire about our premium wheat products — we welcome you."
      />

      <section className="section-padding">
        <div className="section-container grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" title="Reach Out" />
            <div className="space-y-6">
              <div className="card flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-kedar-gold" />
                <div>
                  <p className="font-semibold text-kedar-navy">Location</p>
                  <p className="text-sm text-kedar-navy/70">{SITE.location}</p>
                </div>
              </div>
              <div className="card flex items-start gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-kedar-gold" />
                <div>
                  <p className="font-semibold text-kedar-navy">Email</p>
                  <p className="text-sm text-kedar-navy/70">{SITE.email}</p>
                </div>
              </div>
              <div className="card flex items-start gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-kedar-gold" />
                <div>
                  <p className="font-semibold text-kedar-navy">Phone</p>
                  <p className="text-sm text-kedar-navy/70">{SITE.phone}</p>
                </div>
              </div>
              <div className="card flex items-start gap-4">
                <Shield className="mt-1 h-5 w-5 shrink-0 text-kedar-gold" />
                <div>
                  <p className="font-semibold text-kedar-navy">Food-Safety Approved</p>
                  <p className="text-sm text-kedar-navy/70">Committed to quality and hygienic standards.</p>
                </div>
              </div>
              <div className="card flex items-start gap-4">
                <Globe className="mt-1 h-5 w-5 shrink-0 text-kedar-gold" />
                <div>
                  <p className="font-semibold text-kedar-navy">Export Documentation</p>
                  <p className="text-sm text-kedar-navy/70">Prepared for domestic and international markets.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-serif text-xl font-semibold text-kedar-navy">Send a Message</h3>
            <p className="mt-2 text-sm text-kedar-navy/70">
              If you have talent, innovative ideas, or a passion to create positive social impact,
              Kedar Foundation welcomes you to collaborate with us.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-xl bg-kedar-gold/10 p-6 text-center">
                <p className="font-semibold text-kedar-navy">Thank you for reaching out!</p>
                <p className="mt-2 text-sm text-kedar-navy/70">
                  We have received your message and will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-kedar-navy">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-lg border border-kedar-navy/15 bg-kedar-cream px-4 py-2.5 text-sm outline-none focus:border-kedar-gold focus:ring-2 focus:ring-kedar-gold/20"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-kedar-navy">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-kedar-navy/15 bg-kedar-cream px-4 py-2.5 text-sm outline-none focus:border-kedar-gold focus:ring-2 focus:ring-kedar-gold/20"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="mb-1 block text-sm font-medium text-kedar-navy">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full rounded-lg border border-kedar-navy/15 bg-kedar-cream px-4 py-2.5 text-sm outline-none focus:border-kedar-gold focus:ring-2 focus:ring-kedar-gold/20"
                  >
                    <option>General Inquiry</option>
                    <option>Product Inquiry — Premium Wheat</option>
                    <option>Collaboration / Partnership</option>
                    <option>Volunteer / Join Initiative</option>
                    <option>Donation / CSR</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="mb-1 block text-sm font-medium text-kedar-navy">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full resize-none rounded-lg border border-kedar-navy/15 bg-kedar-cream px-4 py-2.5 text-sm outline-none focus:border-kedar-gold focus:ring-2 focus:ring-kedar-gold/20"
                  />
                </div>
                {error && (
                  <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>
                )}
                <button type="submit" disabled={loading} className="btn-primary flex w-full items-center justify-center gap-2 sm:w-auto">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
