import Image from 'next/image';
import { Award, MapPin, Shield } from 'lucide-react';
import { MountainLightBackdrop } from '@/components/BrandMotifs';
import { FilterableProductsGrid } from '@/components/FilterableProductsGrid';
import { PageHero } from '@/components/InitiativeCard';
import { SectionHeading } from '@/components/SectionHeading';
import { fetchStoreProducts } from '@/lib/products';
import { QUALITY_BADGES, SITE } from '@/lib/content';

export const metadata = {
  title: 'Products',
  description: 'Browse Kedar Foundation agricultural products — grains, pulses, flour, snacks, and spices.',
};

export default async function ProductsPage() {
  const products = await fetchStoreProducts();

  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title="Agricultural & Food Products"
        subtitle="Quality grains, pulses, flour, snacks, and spices — sourced from trusted farmers and processed with care."
      />

      <section className="relative overflow-hidden section-padding">
        <MountainLightBackdrop />
        <div className="section-container relative z-10">
          <FilterableProductsGrid products={products} />
        </div>
      </section>

      <section className="section-padding bg-white">
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
              <SectionHeading align="left" title="Our Commitment" />
              <p className="text-base leading-relaxed text-kedar-navy/80">
                Every product reflects Kedar Foundation&apos;s dedication to farmers, families, and communities.
                From premium wheat to everyday pulses and spices, we maintain hygienic processing and
                consistent quality you can trust.
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
    </>
  );
}
