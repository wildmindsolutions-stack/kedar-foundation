import { Suspense } from 'react';
import { PageHero } from '@/components/InitiativeCard';
import { PrebookTracker } from '@/components/PrebookTracker';

export const metadata = {
  title: 'Track Your Pre-booking | Kedar Foundation',
  description: 'Check the delivery status of your Kedar Foundation pre-booking.',
};

export default function PrebookTrackPage() {
  return (
    <>
      <PageHero
        eyebrow="Pre-booking"
        title="Track Your Order"
        subtitle="Enter your booking number and mobile number to see where your order is."
      />
      <section className="section-padding bg-grain">
        <div className="section-container">
          <Suspense fallback={null}>
            <PrebookTracker />
          </Suspense>
        </div>
      </section>
    </>
  );
}
