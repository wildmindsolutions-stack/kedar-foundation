import Link from 'next/link';
import {
  ArrowRight, Award, Globe, Heart, Leaf, Shield, Sprout, Users, Wheat,
} from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { HeroBanner } from '@/components/HeroBanner';
import { CtaBanner } from '@/components/InitiativeCard';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { ProjectsCarousel } from '@/components/ProjectsCarousel';
import {
  GUIDING_PRINCIPLE, HOMEPAGE_STATS, INITIATIVES, MISSION,
  PROJECTS, QUALITY_BADGES, SITE, VISION,
} from '@/lib/content';

const HIGHLIGHTS = [
  { icon: Sprout, title: 'Sustainable Agriculture', text: 'Organic farming, value addition, and farmer empowerment.' },
  { icon: Users, title: 'Community Welfare', text: 'Youth, women, seniors, and rural skill development.' },
  { icon: Heart, title: 'Social Impact', text: 'Innovation, education, healthcare, and entrepreneurship support.' },
  { icon: Leaf, title: 'Environmental Care', text: 'Waste management, biodiversity, and natural living.' },
];

export default function HomePage() {
  const featuredInitiatives = INITIATIVES.slice(0, 6);

  return (
    <>
      <HeroBanner />

      {/* Stats strip */}
      <section className="border-b border-kedar-gold/15 bg-white py-8">
        <div className="section-container grid grid-cols-2 gap-6 lg:grid-cols-4">
          {HOMEPAGE_STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-serif text-2xl font-bold text-kedar-gold-dark sm:text-3xl">{value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-kedar-navy/60">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="section-padding">
        <div className="section-container">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Empowering Communities, Enriching Lives"
            description={GUIDING_PRINCIPLE}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-kedar-gold/15">
                  <Icon className="h-6 w-6 text-kedar-gold-dark" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-kedar-navy">{title}</h3>
                <p className="mt-2 text-sm text-kedar-navy/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects carousel */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="Our Work"
            title="Projects & Completed Initiatives"
            description="A glimpse of the impact we create through agriculture, community development, and social welfare programs across Gujarat and beyond."
          />
          <ProjectsCarousel projects={PROJECTS} />
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding">
        <div className="section-container">
          <SectionHeading
            eyebrow="Who We Are"
            title="Vision & Mission"
            description="Building a self-reliant, innovative, and socially empowered India."
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card border-l-4 border-l-kedar-gold">
              <h3 className="font-serif text-xl font-semibold text-kedar-navy">Our Vision</h3>
              <p className="mt-4 text-sm leading-relaxed text-kedar-navy/75">{VISION}</p>
            </div>
            <div className="card border-l-4 border-l-kedar-navy">
              <h3 className="font-serif text-xl font-semibold text-kedar-navy">Our Mission</h3>
              <p className="mt-4 text-sm leading-relaxed text-kedar-navy/75">{MISSION}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products — multiple from ERP */}
      <section className="section-padding bg-kedar-cream">
        <div className="section-container">
          <SectionHeading
            eyebrow="Our Products"
            title="Agricultural & Food Products"
            description="Browse grains, pulses, flour, snacks, and spices — sourced and processed with the same quality standards trusted by Kedar Enterprise."
          />
          <FeaturedProducts limit={6} />
        </div>
      </section>

      {/* Quality badges */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid gap-4 sm:grid-cols-3">
            {QUALITY_BADGES.map((badge) => (
              <div key={badge.label} className="card flex items-start gap-4">
                <Award className="h-8 w-8 shrink-0 text-kedar-gold" />
                <div>
                  <h4 className="font-semibold text-kedar-navy">{badge.label}</h4>
                  <p className="mt-1 text-xs text-kedar-navy/65">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives preview */}
      <section className="section-padding bg-kedar-navy text-white">
        <div className="section-container">
          <SectionHeading
            eyebrow="What We Do"
            title="Strategic Initiatives"
            description="Practical programs that improve quality of life while promoting environmental sustainability and national development."
            light
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredInitiatives.map((initiative) => (
              <div
                key={initiative.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-kedar-gold/30 hover:bg-white/10"
              >
                <h3 className="font-serif text-lg font-semibold text-kedar-gold">{initiative.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{initiative.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/initiatives" className="btn-primary">
              View All Initiatives
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quality strip */}
      <section className="border-y border-kedar-gold/20 bg-kedar-cream py-10">
        <div className="section-container grid gap-6 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-kedar-gold" />
            <div>
              <p className="font-semibold text-kedar-navy">Food-Safety Approved</p>
              <p className="text-xs text-kedar-navy/60">Trusted processing standards</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="h-8 w-8 text-kedar-gold" />
            <div>
              <p className="font-semibold text-kedar-navy">Export Documentation</p>
              <p className="text-xs text-kedar-navy/60">Ready for global markets</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Wheat className="h-8 w-8 text-kedar-gold" />
            <div>
              <p className="font-semibold text-kedar-navy">Premium Quality</p>
              <p className="text-xs text-kedar-navy/60">{SITE.location}</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
