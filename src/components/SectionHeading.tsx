import { cn } from '@/lib/utils';
import { LotusDivider } from '@/components/BrandMotifs';
import { Reveal } from '@/components/Reveal';

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
    <Reveal className={cn('mb-12', align === 'center' && 'mx-auto max-w-3xl text-center')}>
      {eyebrow && (
        <p
          className={cn(
            'eyebrow mb-3',
            align === 'center' && 'eyebrow-center',
            light && 'text-kedar-gold',
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'heading-section',
          light ? 'text-white' : 'text-kedar-navy',
        )}
      >
        {title}
      </h2>
      {lotus ? (
        <LotusDivider className={cn('my-5', align === 'left' && 'justify-start', light && 'text-kedar-gold')} />
      ) : (
        <div className={cn('gold-divider my-5', align === 'left' && 'mx-0')} />
      )}
      {description && (
        <p
          className={cn(
            'lead',
            light ? 'text-white/80' : 'text-kedar-navy/75',
            align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
