import { PageHero, InitiativeCard } from '@/components/InitiativeCard';
import { FeaturedWorkCarousel } from '@/components/FeaturedWorkCarousel';
import { SectionHeading } from '@/components/SectionHeading';
import {
  BIRD_SEVA_IMAGES,
  BIRD_SEVA_TAGLINE,
  CHILD_WELFARE_IMAGES,
  CHILD_WELFARE_TAGLINE,
  FARMING_IMAGES,
  FARMING_TAGLINE,
  INITIATIVES,
} from '@/lib/content';

export const metadata = {
  title: 'Initiatives',
  description:
    "Explore Kedar Foundation's strategic initiatives for social welfare, agriculture, education, and community development.",
};

export default function InitiativesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Strategic Initiatives"
        subtitle="Practical solutions that improve quality of life while promoting environmental sustainability and national development."
      />

      {/* Featured: Child Welfare */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="Featured Initiative"
            title="Child Welfare Support"
            description={CHILD_WELFARE_TAGLINE}
          />
          <FeaturedWorkCarousel
            images={CHILD_WELFARE_IMAGES}
            altPrefix="Child welfare support"
          />
        </div>
      </section>

      {/* Featured: Farmer Irrigation & Water Management */}
      <section className="section-padding">
        <div className="section-container">
          <SectionHeading
            eyebrow="Featured Initiative"
            title="Farmer Irrigation & Water Management"
            description={FARMING_TAGLINE}
          />
          <FeaturedWorkCarousel
            images={FARMING_IMAGES}
            altPrefix="Farmer irrigation and water management"
          />
        </div>
      </section>

      {/* Featured: Bird Seva */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="Featured Initiative"
            title="Bird Seva"
            description={BIRD_SEVA_TAGLINE}
          />
          <FeaturedWorkCarousel
            images={BIRD_SEVA_IMAGES}
            altPrefix="Bird seva"
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <SectionHeading
            title="Our Programs"
            description="From child welfare and student innovation to organic farming, women empowerment, and environmental conservation — each initiative is designed to create meaningful community impact."
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
