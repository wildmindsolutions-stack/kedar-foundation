import Image from 'next/image';
import { Award, CheckCircle, MapPin, Shield, Wheat } from 'lucide-react';
import { PageHero } from '@/components/InitiativeCard';
import { SectionHeading } from '@/components/SectionHeading';
import { PRODUCTS, QUALITY_BADGES, SITE } from '@/lib/content';

export const metadata = {
  title: 'Premium Wheat Products',
  description: 'Kedar Foundation Premium Wheat — 25kg, 50kg, and 100kg packs. Trusted quality in every grain.',
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title="Premium Wheat"
        subtitle="Global quality, heritage values — combining sustainable farming practices with time-honored values of trust and integrity."
      />

      <section className="section-padding">
        <div className="section-container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-2xl shadow-card lg:aspect-[4/5]">
              <Image
                src="/images/product-sacks.png"
                alt="Kedar Foundation Premium Wheat — burlap and woven sacks"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div>
              <SectionHeading align="left" title="Our Story" />
              <p className="text-base leading-relaxed text-kedar-navy/80">
                Inspired by the sacred mountains of Kedar, Kedar Foundation is dedicated to providing
                pure, high-quality wheat rooted in tradition and excellence. Every grain reflects our
                commitment to farmers, families, and communities across India.
              </p>
              <div className="mt-8 flex items-center gap-4 rounded-2xl border-2 border-kedar-gold bg-kedar-gold/10 p-6">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-kedar-gold bg-white">
                  <Award className="h-10 w-10 text-kedar-gold" />
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-kedar-navy">100% Pure Wheat</p>
                  <p className="text-sm text-kedar-navy/70">{SITE.tagline}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeading
            title="Product Range"
            description="Available in three pack sizes to serve families, retailers, and institutions."
          />
          <div className="grid gap-8 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <article key={product.id} className="card overflow-hidden !p-0">
                <div className="bg-hero-gradient px-6 py-8 text-center text-white">
                  <Wheat className="mx-auto mb-3 h-10 w-10 text-kedar-gold" />
                  <h3 className="font-serif text-2xl font-bold">{product.name}</h3>
                  <p className="mt-1 text-sm text-kedar-gold">{product.subtitle}</p>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-kedar-navy/75">{product.description}</p>
                  <ul className="mt-4 space-y-2">
                    {['Premium quality grain', 'Hygienic processing', 'Trusted Kedar branding'].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-kedar-navy/70">
                        <CheckCircle className="h-4 w-4 text-kedar-gold" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <SectionHeading title="Quality & Certifications" />
          <div className="grid gap-6 sm:grid-cols-3">
            {QUALITY_BADGES.map((badge) => (
              <div key={badge.label} className="card text-center">
                <Shield className="mx-auto mb-4 h-10 w-10 text-kedar-gold" />
                <h3 className="font-serif text-lg font-semibold text-kedar-navy">{badge.label}</h3>
                <p className="mt-2 text-sm text-kedar-navy/70">{badge.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-kedar-navy/70">
            <MapPin className="h-4 w-4 text-kedar-gold" />
            {SITE.location}
          </div>
        </div>
      </section>

      <section className="section-padding bg-kedar-navy">
        <div className="section-container text-center">
          <Image
            src="/images/brochure.png"
            alt="Kedar Foundation brochure"
            width={900}
            height={400}
            className="mx-auto rounded-2xl shadow-2xl"
          />
          <p className="mt-6 font-serif text-xl text-kedar-gold">{SITE.tagline}</p>
        </div>
      </section>
    </>
  );
}
