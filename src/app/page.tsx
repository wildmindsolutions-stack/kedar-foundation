import Link from 'next/link';
import {
  ArrowRight, Award, Globe, Heart, Leaf, Shield, Sprout, Users, Wheat,
} from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { LotusMotif, MountainLightBackdrop } from '@/components/BrandMotifs';
import { Reveal } from '@/components/Reveal';
import { HeroBanner } from '@/components/HeroBanner';
import { CtaBanner } from '@/components/InitiativeCard';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { ProjectsCarousel } from '@/components/ProjectsCarousel';
import {
  GUIDING_PRINCIPLE, HOMEPAGE_STATS, INITIATIVES, MISSION,
  PROJECTS, QUALITY_BADGES, SITE, VISION,
} from '@/lib/content';

const HIGHLIGHTS = [
  { icon: Sprout, title: 'Sustainable Agriculture', text: 'Helping farmers grow better, earn more, and farm in harmony with nature.' },
  { icon: Users, title: 'Community Welfare', text: 'Standing with youth, women, and elders through skills, care, and opportunity.' },
  { icon: Heart, title: 'Social Impact', text: 'Turning ideas into action across education, health, and entrepreneurship.' },
  { icon: Leaf, title: 'Environmental Care', text: 'Protecting biodiversity and championing a cleaner, greener way of living.' },
];

export default function HomePage() {
  const featuredInitiatives = INITIATIVES.slice(0, 6);

  return (
    <>
      <HeroBanner />

      {/* Stats strip */}
      <section className="border-b border-kedar-gold/15 bg-white py-10">
        <div className="section-container grid grid-cols-2 gap-y-8 sm:gap-x-6 lg:grid-cols-4 lg:divide-x lg:divide-kedar-navy/10">
          {HOMEPAGE_STATS.map(({ value, label }) => (
            <div key={label} className="text-center lg:px-4">
              <p className="font-serif text-3xl font-bold text-kedar-gold-dark sm:text-4xl">{value}</p>
              <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-kedar-navy/60 sm:text-xs">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="relative overflow-hidden section-padding">
        <MountainLightBackdrop />
        <div className="section-container relative z-10">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Empowering Communities, Enriching Lives"
            description="Real change begins with people. Everything we do is designed to uplift individuals, strengthen communities, and build a more self-reliant nation — one meaningful step at a time."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map(({ icon: Icon, title, text }, i) => (
              <Reveal
                key={title}
                delay={i * 90}
                className="group card card-interactive relative overflow-hidden text-center"
              >
                <span className="absolute inset-x-0 top-0 h-1 scale-x-0 bg-gold-gradient transition-transform duration-300 group-hover:scale-x-100" />
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-kedar-gold/20 to-kedar-gold/5 ring-1 ring-kedar-gold/20 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-7 w-7 text-kedar-gold-dark" />
                </div>
                <h3 className="heading-sub text-kedar-navy">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-kedar-navy/70">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects carousel */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="Our Work in Action"
            title="Stories of Real, Lasting Impact"
            description="From fields and classrooms to communities and homes — here is a glimpse of the change we are creating together across Gujarat and beyond."
          />
          <Reveal>
            <ProjectsCarousel projects={PROJECTS} />
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative overflow-hidden section-padding">
        <LotusMotif className="pointer-events-none absolute -right-8 top-8 h-32 w-auto text-kedar-gold opacity-[0.07] sm:h-40" />
        <LotusMotif className="pointer-events-none absolute -left-8 bottom-8 h-24 w-auto scale-x-[-1] text-kedar-gold opacity-[0.07] sm:h-32" />
        <div className="section-container relative z-10">
          <SectionHeading
            eyebrow="Who We Are"
            title="Driven by Vision, Guided by Purpose"
            description="Building a self-reliant, innovative, and socially empowered India — together."
            lotus
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal className="group card card-interactive border-l-4 border-l-kedar-gold">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-kedar-gold/15 text-kedar-gold-dark">
                  <Sprout className="h-5 w-5" />
                </span>
                <h3 className="heading-sub text-kedar-navy">Our Vision</h3>
              </div>
              <p className="leading-relaxed text-kedar-navy/75">{VISION}</p>
            </Reveal>
            <Reveal delay={120} className="group card card-interactive border-l-4 border-l-kedar-navy">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-kedar-navy/10 text-kedar-navy">
                  <Heart className="h-5 w-5" />
                </span>
                <h3 className="heading-sub text-kedar-navy">Our Mission</h3>
              </div>
              <p className="leading-relaxed text-kedar-navy/75">{MISSION}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Products — multiple from ERP */}
      <section className="relative overflow-hidden section-padding bg-kedar-cream">
        <MountainLightBackdrop />
        <div className="section-container relative z-10">
          <SectionHeading
            eyebrow="Our Products"
            title="Purity You Can Taste, Quality You Can Trust"
            description="Grains, pulses, flour, snacks, and spices — thoughtfully sourced from farmers and processed to the exacting standards trusted by Kedar Enterprise."
          />
          <FeaturedProducts limit={6} />
        </div>
      </section>

      {/* Quality badges */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid gap-5 sm:grid-cols-3">
            {QUALITY_BADGES.map((badge, i) => (
              <Reveal key={badge.label} delay={i * 90} className="card card-interactive flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-kedar-gold/20 to-kedar-gold/5 ring-1 ring-kedar-gold/20">
                  <Award className="h-6 w-6 text-kedar-gold-dark" />
                </span>
                <div>
                  <h4 className="font-serif text-base font-semibold text-kedar-navy">{badge.label}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-kedar-navy/65">{badge.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives preview */}
      <section className="relative overflow-hidden bg-navy-radial section-padding text-white">
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-kedar-gold/10 blur-3xl" />
        <div className="section-container relative z-10">
          <SectionHeading
            eyebrow="What We Do"
            title="Programs That Change Everyday Lives"
            description="Practical, people-first initiatives that improve livelihoods, protect our environment, and strengthen the nation from the ground up."
            light
            lotus
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredInitiatives.map((initiative, i) => (
              <Reveal
                key={initiative.title}
                delay={i * 80}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-kedar-gold/40 hover:bg-white/10"
              >
                <h3 className="font-serif text-lg font-semibold text-kedar-gold">{initiative.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{initiative.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-kedar-gold/0 transition-colors duration-300 group-hover:text-kedar-gold">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/initiatives" className="btn-primary">
              Explore All Initiatives
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quality strip */}
      <section className="border-y border-kedar-gold/20 bg-kedar-cream-dark/60 py-10">
        <div className="section-container grid gap-6 sm:grid-cols-3">
          {[
            { icon: Shield, title: 'Food-Safety Approved', text: 'Hygienic, trusted processing standards' },
            { icon: Globe, title: 'Export Documentation', text: 'Ready for domestic & global markets' },
            { icon: Wheat, title: 'Premium Quality', text: SITE.location },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-card">
                <Icon className="h-6 w-6 text-kedar-gold-dark" />
              </span>
              <div>
                <p className="font-serif font-semibold text-kedar-navy">{title}</p>
                <p className="text-xs text-kedar-navy/60">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
