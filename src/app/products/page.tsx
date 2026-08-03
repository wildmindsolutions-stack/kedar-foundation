import Image from 'next/image';
import { Award, MapPin, Shield } from 'lucide-react';
import { MountainLightBackdrop } from '@/components/BrandMotifs';
import { FilterableProductsGrid } from '@/components/FilterableProductsGrid';
import { PageHero } from '@/components/InitiativeCard';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { fetchStoreProducts } from '@/lib/products';
import { QUALITY_BADGES, SITE } from '@/lib/content';

export const metadata = {
  title: 'Organic Agricultural Grains, Spices & Flours | Kedar Enterprise',
  description:
    'Browse premium wheat (25kg, 50kg, 100kg packs), bajra, chickpeas, spices, and pulses sourced directly from local farmers and cleanly processed by Kedar Enterprise.',
  keywords: [
    'premium wheat packs',
    'milled wheat flour',
    'organic spices Gujarat',
    'local pulses',
    'Kedar Enterprise products',
  ],
};

export default async function ProductsPage() {
  const products = await fetchStoreProducts();

  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title="Goodness, Grown with Care"
        subtitle="Wholesome grains, pulses, flour, snacks, and spices — sourced from farmers we trust and processed with the care your family deserves."
      />

      <section id="products-catalog" className="relative overflow-hidden section-padding bg-grain">
        <MountainLightBackdrop />
        <div className="section-container relative z-10">
          <FilterableProductsGrid products={products} />
        </div>
      </section>

      <section id="products-promise" className="section-padding bg-white bg-grain">
        <div className="section-container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
              <Image
                src="/images/product-sacks.png"
                alt="Kedar Foundation product sacks"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <SectionHeading align="left" eyebrow="Our Promise" title="Quality That Honours Every Hand It Passes Through" />
              <p className="lead">
                Every product carries our dedication to the farmers who grow it and the families who
                enjoy it. From premium wheat to everyday pulses and spices, we hold to hygienic
                processing and consistent quality — because trust is earned in every grain.
              </p>
              <div className="mt-8 flex items-center gap-4 rounded-2xl border-2 border-kedar-gold bg-kedar-gold/10 p-6">
                <Award className="h-12 w-12 shrink-0 text-kedar-gold" />
                <div>
                  <p className="font-serif text-xl font-bold text-kedar-navy">{SITE.tagline}</p>
                  <p className="text-sm text-kedar-navy/70">{products.length} products available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products-certifications" className="section-padding">
        <div className="section-container">
          <SectionHeading eyebrow="Certified & Trusted" title="Quality You Can Always Count On" />
          <div className="grid gap-6 sm:grid-cols-3">
            {QUALITY_BADGES.map((badge, i) => (
              <Reveal key={badge.label} delay={i * 90} className="card card-interactive text-center">
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-kedar-gold/20 to-kedar-gold/5 ring-1 ring-kedar-gold/20">
                  <Shield className="h-7 w-7 text-kedar-gold-dark" />
                </span>
                <h3 className="heading-sub text-kedar-navy">{badge.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-kedar-navy/70">{badge.description}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-kedar-navy/70">
            <MapPin className="h-4 w-4 text-kedar-gold" />
            {SITE.location}
          </div>
        </div>
      </section>
    </>
  );
}
