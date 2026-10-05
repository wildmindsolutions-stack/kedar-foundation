import Image from 'next/image';
import type { ElementType, ReactNode } from 'react';
import { Briefcase, Heart, Lightbulb, Sparkles, Target, Users } from 'lucide-react';
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
          'grid items-stretch lg:grid-cols-[280px_minmax(0,1fr)]',
          !isEven && 'lg:grid-cols-[minmax(0,1fr)_280px] lg:[&>*:first-child]:order-2',
        )}
      >
        {/* Portrait — same frame for every trustee */}
        <div className="relative h-80 w-full overflow-hidden bg-[#f6f1e7] sm:h-96 lg:h-full lg:min-h-[420px]">
          {trustee.image ? (
            <Image
              src={trustee.image}
              alt={trustee.name}
              fill
              className="object-cover object-center"
              sizes="280px"
            />
          ) : (
            <div className="relative z-10 flex h-full min-h-[320px] flex-col items-center justify-center p-8 text-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-kedar-gold/50 bg-kedar-gold/10 font-serif text-4xl font-bold text-kedar-gold shadow-gold">
                {trustee.initials}
              </div>
              <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-kedar-navy/40">
                Portrait forthcoming
              </p>
            </div>
          )}
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
