import { PageHero } from '@/components/InitiativeCard';
import { LotusDivider, MountainAboutFeature } from '@/components/BrandMotifs';
import { SectionHeading } from '@/components/SectionHeading';
import {
  BENEFICIARIES, CORE_OBJECTIVES, FUTURE_OPPORTUNITIES, GUIDING_PRINCIPLE, MISSION, VISION,
} from '@/lib/content';

export const metadata = {
  title: 'About Us',
  description: 'Learn about Kedar Foundation\'s vision, mission, objectives, and guiding principles.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        mountain={false}
        eyebrow="About Kedar Foundation"
        title="Our Story"
        subtitle="Inspired by the sacred mountains of Kedar, dedicated to providing pure, high-quality solutions rooted in tradition and excellence."
      />

      <section className="section-padding">
        <div className="mx-auto w-full max-w-[90rem] px-3 sm:px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(220px,26%)_minmax(0,1fr)] lg:items-end lg:gap-10 xl:gap-14">
            <MountainAboutFeature className="order-2 lg:order-1 lg:pb-2" />

            <div className="order-1 space-y-12 lg:order-2">
              <div>
                <SectionHeading align="left" title="Vision" />
                <p className="text-base leading-[1.85] text-kedar-navy/80 sm:text-[1.05rem]">
                  {VISION}
                </p>
              </div>

              <div>
                <SectionHeading align="left" title="Mission" />
                <p className="text-base leading-[1.85] text-kedar-navy/80 sm:text-[1.05rem]">
                  {MISSION}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-kedar-navy/10 pt-14 lg:mt-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12 xl:gap-16">
              <div className="min-w-0 flex-1">
                <h2 className="font-serif text-3xl font-bold text-kedar-navy sm:text-4xl">
                  Guiding Principle
                </h2>
                <div className="gold-divider my-4 mx-0" />
                <p className="text-base leading-[1.85] text-kedar-navy/80 sm:text-[1.05rem]">
                  {GUIDING_PRINCIPLE}
                </p>
              </div>
              <LotusDivider className="shrink-0 self-center lg:mt-3 lg:self-start" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeading
            title="Core Objectives"
            description="The foundation aims to create lasting impact across society through focused, practical initiatives."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_OBJECTIVES.map((objective) => (
              <div key={objective} className="card flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-kedar-gold/20 text-xs font-bold text-kedar-gold-dark">
                  ✓
                </span>
                <p className="text-sm font-medium text-kedar-navy">{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <SectionHeading
            title="Who We Serve"
            description="Kedar Foundation intends to serve diverse communities across India."
          />
          <div className="flex flex-wrap justify-center gap-3">
            {BENEFICIARIES.map((group) => (
              <span
                key={group}
                className="rounded-full border border-kedar-gold/30 bg-white px-5 py-2.5 text-sm font-medium text-kedar-navy shadow-sm"
              >
                {group}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-kedar-navy text-white">
        <div className="section-container">
          <SectionHeading
            light
            lotus
            title="Public Awareness Campaigns"
            description="Inspiring citizens to actively participate in nation-building and community development."
          />
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <p className="rounded-2xl border border-kedar-gold/30 bg-white/5 px-6 py-5 font-serif text-xl text-kedar-gold">
              आइये देश के लिए कुछ करें।
            </p>
            <p className="rounded-2xl border border-kedar-gold/30 bg-white/5 px-6 py-5 font-serif text-xl text-kedar-gold">
              २ कदम देश के माटे ।
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeading
            title="Future Opportunities"
            description="Digital solutions and platforms planned for the foundation's growing impact."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {FUTURE_OPPORTUNITIES.map((item) => (
              <div key={item} className="rounded-xl border border-kedar-navy/10 bg-kedar-cream px-4 py-3 text-sm text-kedar-navy/80">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
