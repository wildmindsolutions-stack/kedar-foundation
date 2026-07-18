import { Check } from 'lucide-react';
import { PageHero } from '@/components/InitiativeCard';
import { LotusDivider, MountainAboutFeature } from '@/components/BrandMotifs';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
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
        subtitle="Inspired by the sacred mountains of Kedar — rooted in tradition, driven by purpose, and devoted to uplifting every life we touch."
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
                <p className="eyebrow mb-3">Our Belief</p>
                <h2 className="heading-section text-kedar-navy">
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
            eyebrow="What Drives Us"
            title="The Goals That Guide Every Step"
            description="Focused, practical commitments that turn our vision into real, measurable change across society."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_OBJECTIVES.map((objective, i) => (
              <Reveal key={objective} delay={(i % 3) * 80} className="card card-interactive flex items-start gap-3.5">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-kedar-gold/15 text-kedar-gold-dark">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <p className="text-sm font-medium leading-relaxed text-kedar-navy">{objective}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <SectionHeading
            eyebrow="Who We Serve"
            title="Every Community, Every Story Matters"
            description="From farmers and students to women, elders, and dreamers — we stand beside diverse communities across India."
          />
          <div className="flex flex-wrap justify-center gap-3">
            {BENEFICIARIES.map((group) => (
              <span
                key={group}
                className="rounded-full border border-kedar-gold/30 bg-white px-5 py-2.5 text-sm font-medium text-kedar-navy shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-kedar-gold hover:shadow-gold"
              >
                {group}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-radial section-padding text-white">
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-kedar-gold/10 blur-3xl" />
        <div className="section-container relative z-10">
          <SectionHeading
            light
            lotus
            eyebrow="Our Rallying Call"
            title="A Movement Powered by People"
            description="Inspiring every citizen to take that one small step toward nation-building and a stronger community."
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
            eyebrow="The Road Ahead"
            title="Building for an Even Bigger Tomorrow"
            description="Digital platforms and new programs on the horizon — designed to widen our reach and deepen our impact."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FUTURE_OPPORTUNITIES.map((item, i) => (
              <Reveal
                key={item}
                delay={(i % 4) * 70}
                className="rounded-xl border border-kedar-navy/10 bg-kedar-cream px-4 py-3.5 text-sm font-medium text-kedar-navy/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-kedar-gold/40 hover:bg-white hover:text-kedar-navy hover:shadow-card"
              >
                {item}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
