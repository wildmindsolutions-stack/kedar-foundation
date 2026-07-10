import { PageHero } from '@/components/InitiativeCard';
import { InitiativeCard } from '@/components/InitiativeCard';
import { SectionHeading } from '@/components/SectionHeading';
import { INITIATIVES } from '@/lib/content';

export const metadata = {
  title: 'Initiatives',
  description: 'Explore Kedar Foundation\'s strategic initiatives for social welfare, agriculture, education, and community development.',
};

export default function InitiativesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Strategic Initiatives"
        subtitle="Practical solutions that improve quality of life while promoting environmental sustainability and national development."
      />

      <section className="section-padding">
        <div className="section-container">
          <SectionHeading
            title="Our Programs"
            description="From student innovation to organic farming, women empowerment to environmental conservation — each initiative is designed to create meaningful community impact."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INITIATIVES.map((initiative) => (
              <InitiativeCard key={initiative.title} {...initiative} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
