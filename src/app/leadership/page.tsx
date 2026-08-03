import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import { PageHero } from '@/components/InitiativeCard';
import { LotusDivider } from '@/components/BrandMotifs';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { TrusteeProfileCard, TrusteeQuickNav } from '@/components/TrusteeProfileCard';
import { FOUNDERS_SHARED_VISION, TRUSTEES } from '@/lib/content';

export const metadata = {
  title: 'Our Leadership & Board of Trustees',
  description:
    'Meet the founders and board of trustees of Kedar Foundation—leaders in plant biotechnology, Gandhian education, organic farming, and animal husbandry.',
  keywords: [
    'Kedar Foundation trustees',
    'board of directors',
    'Dr. Anil Shrivastav',
    'Shri Bharat Patel',
    'social development leaders',
  ],
};

const EXPERTISE_AREAS = [
  'Biotechnology & Research',
  'Education & Gandhian Values',
  'Entrepreneurship',
  'Organic Agriculture',
  'Community Welfare',
  'Spiritual Leadership',
];

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Governance & Leadership"
        title="Founders & Board of Trustees"
        subtitle="Distinguished leaders united by a shared commitment to building a compassionate, self-reliant, and environmentally conscious India."
      />

      {/* Overview */}
      <section id="leadership-overview" className="section-padding bg-grain">
        <div className="section-container">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              title="Leadership with Purpose"
              description={FOUNDERS_SHARED_VISION}
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-kedar-navy/10 bg-white p-6 text-center shadow-card">
              <p className="font-serif text-4xl font-bold text-kedar-gold-dark">{TRUSTEES.length}</p>
              <p className="mt-1 text-sm font-medium text-kedar-navy/70">Founders & Trustees</p>
            </div>
            <div className="rounded-2xl border border-kedar-navy/10 bg-white p-6 text-center shadow-card sm:col-span-2">
              <div className="mb-3 flex items-center justify-center gap-2 text-kedar-gold-dark">
                <Users className="h-5 w-5" />
                <p className="text-sm font-semibold uppercase tracking-[0.14em]">Diverse Expertise</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {EXPERTISE_AREAS.map((area) => (
                  <span
                    key={area}
                    className="rounded-full bg-kedar-cream px-3 py-1 text-xs font-medium text-kedar-navy/80"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-kedar-navy/50">
              Jump to profile
            </p>
            <TrusteeQuickNav trustees={TRUSTEES} />
          </div>
        </div>
      </section>

      {/* Trustee profiles */}
      <section id="leadership-board" className="section-padding bg-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="Our Trustees"
            title="The People Behind the Purpose"
            description="Every trustee brings a lifetime of experience, conviction, and heart — together forming the foundation on which Kedar stands."
          />

          <div className="space-y-10 lg:space-y-14">
            {TRUSTEES.map((trustee, index) => (
              <Reveal key={trustee.id}>
                <TrusteeProfileCard trustee={trustee} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Shared vision */}
      <section id="leadership-manifesto" className="relative overflow-hidden bg-navy-radial section-padding text-white">
        <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-kedar-gold/10 blur-3xl" />
        <Reveal className="section-container relative z-10 text-center">
          <LotusDivider className="text-kedar-gold" />
          <p className="eyebrow eyebrow-center mt-6 text-kedar-gold">United in Purpose</p>
          <h2 className="mt-3 heading-section text-white">One Vision, Many Hands</h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-[1.85] text-white/80 sm:text-lg">
            {FOUNDERS_SHARED_VISION}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/about" id="lead-link-about" className="btn-primary">
              Our Story
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/initiatives" id="lead-link-initiatives" className="btn-outline !border-white/40 !text-white hover:!bg-white hover:!text-kedar-navy">
              Explore Initiatives
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
