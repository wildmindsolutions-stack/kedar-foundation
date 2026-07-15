import Image from 'next/image';
import type { ElementType, ReactNode } from 'react';
import { Briefcase, Heart, Lightbulb, Quote, Sparkles, Target, Users } from 'lucide-react';
import { LotusMotif } from '@/components/BrandMotifs';
import type { TrusteeProfile } from '@/lib/content';
import { cn } from '@/lib/utils';

interface TrusteeProfileCardProps {
  trustee: TrusteeProfile;
  index: number;
}

function ProfileSection({
  icon: Icon,
  title,
  children,
}: {
  icon: ElementType;
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0 text-kedar-gold-dark" />
        <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-kedar-navy/55">
          {title}
        </h4>
      </div>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-kedar-navy/80">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-kedar-gold" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ValueTags({ values }: { values: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value) => (
        <span
          key={value}
          className="rounded-full border border-kedar-gold/30 bg-kedar-cream px-3 py-1 text-xs font-medium text-kedar-navy"
        >
          {value}
        </span>
      ))}
    </div>
  );
}

export function TrusteeProfileCard({ trustee, index }: TrusteeProfileCardProps) {
  const isEven = index % 2 === 0;

  return (
    <article
      id={trustee.id}
      className="scroll-mt-28 overflow-hidden rounded-2xl border border-kedar-navy/10 bg-white shadow-card transition-shadow hover:shadow-lg"
    >
      <div
        className={cn(
          'grid lg:grid-cols-[minmax(240px,300px)_minmax(0,1fr)]',
          !isEven && 'lg:grid-cols-[minmax(0,1fr)_minmax(240px,300px)] lg:[&>*:first-child]:order-2',
        )}
      >
        {/* Portrait */}
        <div className="relative min-h-[260px] overflow-hidden bg-gradient-to-br from-kedar-navy via-kedar-navy-light to-kedar-navy-dark lg:min-h-full">
          <LotusMotif
            className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-auto -translate-x-1/2 -translate-y-1/2 text-kedar-gold opacity-[0.14] sm:h-52"
            aria-hidden
          />
          {trustee.image ? (
            <Image
              src={trustee.image}
              alt={trustee.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 300px"
            />
          ) : (
            <div className="relative z-10 flex h-full min-h-[260px] flex-col items-center justify-center p-8 text-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-kedar-gold/50 bg-kedar-gold/10 font-serif text-4xl font-bold text-kedar-gold shadow-gold">
                {trustee.initials}
              </div>
              <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                Portrait forthcoming
              </p>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-kedar-navy/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-kedar-navy/10" />
        </div>

        {/* Content */}
        <div className="relative overflow-hidden">
          <LotusMotif
            className={cn(
              'pointer-events-none absolute h-56 w-auto text-kedar-gold opacity-[0.07] sm:h-64 sm:opacity-[0.08]',
              isEven
                ? '-bottom-10 -right-10 sm:-bottom-12 sm:-right-12'
                : '-bottom-10 -left-10 sm:-bottom-12 sm:-left-12',
            )}
            aria-hidden
          />
          <div className="relative z-10 flex flex-col p-6 sm:p-8 lg:p-10">
          <div className="mb-6 border-b border-kedar-navy/8 pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-kedar-gold-dark">
              {trustee.designation}
            </p>
            <h3 className="mt-2 font-serif text-2xl font-bold text-kedar-navy sm:text-3xl">
              {trustee.name}
            </h3>
          </div>

          <div className="grid flex-1 gap-6 sm:grid-cols-2">
            <ProfileSection icon={Briefcase} title="Professional Background">
              <BulletList items={trustee.professionalBackground} />
            </ProfileSection>

            {trustee.areasOfExpertise && (
              <ProfileSection icon={Lightbulb} title="Areas of Expertise">
                <BulletList items={trustee.areasOfExpertise} />
              </ProfileSection>
            )}

            {trustee.additionalRole && (
              <ProfileSection icon={Sparkles} title="Additional Role">
                <p className="text-sm leading-relaxed text-kedar-navy/80">{trustee.additionalRole}</p>
              </ProfileSection>
            )}

            {trustee.communityVision && (
              <ProfileSection icon={Target} title="Community Vision">
                <p className="text-sm leading-relaxed text-kedar-navy/80">{trustee.communityVision}</p>
              </ProfileSection>
            )}

            {trustee.socialContributions && (
              <ProfileSection icon={Users} title="Social Contributions">
                <BulletList items={trustee.socialContributions} />
              </ProfileSection>
            )}

            {trustee.vision && (
              <ProfileSection icon={Target} title="Vision">
                <p className="text-sm leading-relaxed text-kedar-navy/80">{trustee.vision}</p>
              </ProfileSection>
            )}
          </div>

          {(trustee.personalPhilosophy || trustee.familyNote) && (
            <div className="mt-6 space-y-3">
              {trustee.personalPhilosophy && (
                <blockquote className="rounded-xl border-l-4 border-kedar-gold bg-kedar-cream/80 px-5 py-4">
                  <div className="mb-2 flex items-center gap-2 text-kedar-gold-dark">
                    <Quote className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.14em]">Philosophy</span>
                  </div>
                  <p className="font-serif text-lg italic text-kedar-navy">
                    &ldquo;{trustee.personalPhilosophy}&rdquo;
                  </p>
                </blockquote>
              )}
              {trustee.familyNote && (
                <p className="rounded-xl border border-kedar-navy/8 bg-white px-4 py-3 text-sm text-kedar-navy/70">
                  <span className="font-semibold text-kedar-navy">Family Note: </span>
                  {trustee.familyNote}
                </p>
              )}
            </div>
          )}

          <div className="mt-6 border-t border-kedar-navy/8 pt-6">
            <ProfileSection icon={Heart} title="Core Values">
              <ValueTags values={trustee.coreValues} />
            </ProfileSection>
          </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function TrusteeQuickNav({ trustees }: { trustees: TrusteeProfile[] }) {
  return (
    <nav
      aria-label="Trustee profiles"
      className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {trustees.map((trustee) => (
        <a
          key={trustee.id}
          href={`#${trustee.id}`}
          className="shrink-0 rounded-full border border-kedar-navy/10 bg-white px-4 py-2 text-sm font-medium text-kedar-navy/80 shadow-sm transition-colors hover:border-kedar-gold/40 hover:text-kedar-gold-dark"
        >
          {trustee.name.replace(/^(Dr\.|Shri)\s+/, '')}
        </a>
      ))}
    </nav>
  );
}
