import { cn } from '@/lib/utils';
import { LotusDivider } from '@/components/BrandMotifs';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
  lotus?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
  lotus = false,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-12', align === 'center' && 'text-center')}>
      {eyebrow && (
        <p
          className={cn(
            'mb-2 text-xs font-semibold uppercase tracking-[0.2em]',
            light ? 'text-kedar-gold' : 'text-kedar-gold-dark',
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'font-serif text-3xl font-bold sm:text-4xl',
          light ? 'text-white' : 'text-kedar-navy',
        )}
      >
        {title}
      </h2>
      {lotus ? (
        <LotusDivider className={cn('my-4', light && 'text-kedar-gold')} />
      ) : (
        <div className={cn('gold-divider my-4', align === 'left' && 'mx-0')} />
      )}
      {description && (
        <p
          className={cn(
            'mx-auto max-w-2xl text-base leading-relaxed',
            light ? 'text-white/80' : 'text-kedar-navy/70',
            align === 'left' && 'mx-0',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
