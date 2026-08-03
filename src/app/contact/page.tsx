'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Shield, Globe } from 'lucide-react';
import { PageHero } from '@/components/InitiativeCard';
import { SectionHeading } from '@/components/SectionHeading';
import { SITE } from '@/lib/content';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Let's Start a Conversation"
        subtitle="Whether you want to collaborate, volunteer, partner, or simply learn more — our door is always open, and we'd love to hear from you."
      />

      <section id="contact-details-form" className="section-padding bg-grain">
        <div className="section-container grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Reach Out" title="We're Here to Help" />
            <div className="space-y-6">
              <div className="card card-interactive flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-kedar-gold" />
                <div>
                  <p className="font-semibold text-kedar-navy">Location</p>
                  <p className="text-sm text-kedar-navy/70">{SITE.location}</p>
                </div>
              </div>
              <div className="card card-interactive flex items-start gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-kedar-gold" />
                <div>
                  <p className="font-semibold text-kedar-navy">Email</p>
                  <p className="text-sm text-kedar-navy/70">{SITE.email}</p>
                </div>
              </div>
              <div className="card card-interactive flex items-start gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-kedar-gold" />
                <div>
                  <p className="font-semibold text-kedar-navy">Phone</p>
                  <p className="text-sm text-kedar-navy/70">{SITE.phone}</p>
                </div>
              </div>
              <div className="card card-interactive flex items-start gap-4">
                <Shield className="mt-1 h-5 w-5 shrink-0 text-kedar-gold" />
                <div>
                  <p className="font-semibold text-kedar-navy">Food-Safety Approved</p>
                  <p className="text-sm text-kedar-navy/70">Committed to quality and hygienic standards.</p>
                </div>
              </div>
              <div className="card card-interactive flex items-start gap-4">
                <Globe className="mt-1 h-5 w-5 shrink-0 text-kedar-gold" />
                <div>
                  <p className="font-semibold text-kedar-navy">Export Documentation</p>
                  <p className="text-sm text-kedar-navy/70">Prepared for domestic and international markets.</p>
                </div>
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-kedar-navy/10 shadow-lifted bg-kedar-navy/5">
                <Image
                  src="/images/brand/team-collaboration.png"
                  alt="Kedar Foundation team and volunteers collaborating around a table"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  quality={90}
                />
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
              <div id="contact-success-message" role="alert" className="mt-8 rounded-xl bg-kedar-gold/10 p-6 text-center border border-kedar-gold/20">
                <p className="font-semibold text-kedar-navy text-lg">Thank you for reaching out!</p>
                <p className="mt-2 text-sm text-kedar-navy/70">
                  We have received your message and will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="contact-form" className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-kedar-navy">
                    Full Name <span className="text-kedar-gold-dark">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    aria-required="true"
                    className="w-full rounded-lg border border-kedar-navy/15 bg-kedar-cream px-4 py-2.5 text-sm outline-none focus:border-kedar-gold focus:ring-2 focus:ring-kedar-gold/20"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-kedar-navy">
                    Email Address <span className="text-kedar-gold-dark">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    aria-required="true"
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
                    Message <span className="text-kedar-gold-dark">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    aria-required="true"
                    className="w-full resize-none rounded-lg border border-kedar-navy/15 bg-kedar-cream px-4 py-2.5 text-sm outline-none focus:border-kedar-gold focus:ring-2 focus:ring-kedar-gold/20"
                  />
                </div>
                <button type="submit" id="contact-btn-submit" className="btn-primary w-full sm:w-auto">
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
