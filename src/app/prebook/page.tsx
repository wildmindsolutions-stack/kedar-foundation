import { Phone } from 'lucide-react';
import { MountainLightBackdrop } from '@/components/BrandMotifs';
import { PageHero } from '@/components/InitiativeCard';
import { PrebookForm } from '@/components/PrebookForm';
import { SITE } from '@/lib/content';
import { fetchPrebookProducts } from '@/lib/prebook';

export const metadata = {
  title: 'Pre-book Wheat & Atta — Pay on Delivery | Kedar Foundation',
  description:
    'Pre-book Daudkhani Bhalia, 496 Tukdi, MP Sharbati and Lok One wheat, Wheat Atta and Multigrain Atta from Kedar Foundation. No online payment — pay cash on delivery.',
};

export default async function PrebookPage() {
  const { products, live } = await fetchPrebookProducts();

  return (
    <>
      <PageHero
        eyebrow="Pre-booking"
        title="Pre-book Your Wheat & Atta"
        subtitle="Reserve this season's finest wheat and freshly milled atta in a few taps. No online payment — simply pay cash when your order is delivered."
      />

      <section className="relative overflow-hidden section-padding bg-grain">
        <MountainLightBackdrop />
        <div className="section-container relative z-10">
          <PrebookForm products={products} live={live} />

          <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-kedar-navy/60 print:hidden">
            <Phone className="h-4 w-4 text-kedar-gold-dark" />
            Prefer to book by phone? Call us at{' '}
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="font-semibold text-kedar-navy hover:text-kedar-gold-dark">
              {SITE.phone}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
