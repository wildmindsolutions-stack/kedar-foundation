import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, Award, Globe, Heart, Leaf, Shield, Sprout, Users, Wheat,
} from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { CtaBanner } from '@/components/InitiativeCard';
import {
  INITIATIVES, MISSION, PRODUCTS, QUALITY_BADGES, SITE, VISION,
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
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/brochure.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-kedar-navy/80 via-kedar-navy/90 to-kedar-navy" />

        <div className="section-container relative py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Image
              src="/images/logo.png"
              alt={SITE.name}
              width={120}
              height={120}
              className="mx-auto mb-8 h-24 w-24 rounded-full border-4 border-kedar-gold/40 shadow-gold sm:h-28 sm:w-28"
              priority
            />
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-kedar-gold">
              केदार · Kedar Foundation
            </p>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Empowering Communities,
              <span className="block text-kedar-gold">Enriching Lives</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Inspired by the sacred mountains of Kedar, we are dedicated to pure quality, social welfare,
              sustainable agriculture, and nation-building through innovation and community participation.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/about" className="btn-primary">
                Our Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/products" className="btn-outline">
                Premium Wheat
              </Link>
            </div>
          </div>
        </div>

        <div className="relative border-t border-kedar-gold/20 bg-kedar-navy-dark/80 py-4">
          <div className="section-container flex flex-wrap items-center justify-center gap-6 text-center text-sm text-white/70">
            <span className="flex items-center gap-2">
              <Wheat className="h-4 w-4 text-kedar-gold" />
              {SITE.tagline}
            </span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            <span>{SITE.taglineGujarati}</span>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section-padding">
        <div className="section-container">
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

      {/* Vision & Mission */}
      <section className="section-padding bg-white">
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

      {/* Premium Wheat */}
      <section className="section-padding">
        <div className="section-container">
          <SectionHeading
            eyebrow="Our Products"
            title="Premium Wheat"
            description="Global quality, heritage values — combining sustainable farming practices with time-honored values of trust and integrity."
          />

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
              <Image
                src="/images/product-sacks.png"
                alt="Kedar Foundation Premium Wheat sacks"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
              {PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 rounded-xl border border-kedar-gold/20 bg-white p-5 shadow-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-kedar-gold/15 font-serif text-lg font-bold text-kedar-gold-dark">
                    {product.id.replace('kg', '')}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-kedar-navy">{product.name}</h3>
                    <p className="text-sm font-medium text-kedar-gold-dark">{product.subtitle}</p>
                    <p className="mt-1 text-sm text-kedar-navy/70">{product.description}</p>
                  </div>
                </div>
              ))}
              <Link href="/products" className="btn-primary inline-flex">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
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
              <p className="font-semibold text-kedar-navy">100% Pure Wheat</p>
              <p className="text-xs text-kedar-navy/60">{SITE.location}</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
