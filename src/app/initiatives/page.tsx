import { PageHero } from '@/components/InitiativeCard';
import { FeaturedWorkCarousel } from '@/components/FeaturedWorkCarousel';
import { InitiativesGrid } from '@/components/InitiativesGrid';
import { SectionHeading } from '@/components/SectionHeading';
import {
  BIRD_SEVA_IMAGES,
  BIRD_SEVA_TAGLINE,
  CHILD_WELFARE_IMAGES,
  CHILD_WELFARE_TAGLINE,
  FACTORY_IMAGES,
  FACTORY_TAGLINE,
  FARMING_IMAGES,
  FARMING_TAGLINE,
  INITIATIVES,
} from '@/lib/content';

export const metadata = {
  title: 'Our Strategic Initiatives & Social Impact Projects',
  description:
    'Explore Kedar Foundation\'s 20 core initiatives across child welfare, farmer irrigation, bird conservation, rural skill development, and women empowerment.',
  keywords: [
    'social welfare initiatives',
    'rural development projects',
    'child welfare support',
    'bird conservation',
    'farmer water management',
  ],
};

export default function InitiativesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Where Compassion Meets Action"
        subtitle="Every initiative is a promise kept — practical programs that improve lives, protect our environment, and help build a stronger, self-reliant nation."
      />

      {/* Featured: Child Welfare */}
      <section id="featured-child-welfare" className="section-padding bg-white bg-grain">
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
      <section id="featured-farming-irrigation" className="section-padding">
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
      <section id="featured-bird-seva" className="section-padding bg-white bg-grain">
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

      {/* Featured: Food Processing & Factory Operations */}
      <section id="featured-factory-operations" className="section-padding">
        <div className="section-container">
          <SectionHeading
            eyebrow="Featured Initiative"
            title="Food Processing & Factory Operations"
            description={FACTORY_TAGLINE}
          />
          <FeaturedWorkCarousel
            images={FACTORY_IMAGES}
            altPrefix="Kedar Enterprise food processing and factory operations"
          />
        </div>
      </section>

      <section id="explore-programs-grid" className="section-padding bg-white bg-grain">
        <div className="section-container">
          <SectionHeading
            eyebrow="Explore Our Programs"
            title="Many Programs, One Shared Mission"
            description="From child welfare and youth innovation to organic farming, women empowerment, and environmental care — tap any program to see how we're making a difference."
          />
          <InitiativesGrid initiatives={INITIATIVES} />
        </div>
      </section>
    </>
  );
}
