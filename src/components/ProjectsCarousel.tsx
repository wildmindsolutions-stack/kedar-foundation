'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProjectSlide {
  id: string;
  title: string;
  description: string;
  location?: string;
  year?: string;
  image?: string;
}

interface ProjectsCarouselProps {
  projects: ProjectSlide[];
}

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % projects.length);
  }, [projects.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + projects.length) % projects.length);
  }, [projects.length]);

  useEffect(() => {
    if (paused || projects.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next, projects.length]);

  if (projects.length === 0) return null;

  const current = projects[index];

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-kedar-gold/20 bg-kedar-navy shadow-card sm:rounded-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex flex-col lg:grid lg:grid-cols-2">
        <div className="relative aspect-[2/1] w-full shrink-0 sm:aspect-[16/10] lg:aspect-auto lg:min-h-[280px]">
          {current.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={current.image}
              alt={current.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[120px] items-center justify-center bg-gradient-to-br from-kedar-navy-light via-kedar-navy to-kedar-navy-dark p-4 text-center sm:min-h-[180px] sm:p-6">
              <div className="max-w-full">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-kedar-gold/70 sm:text-xs">
                  Project showcase
                </p>
                <p className="mt-2 break-words font-serif text-base font-bold text-white sm:mt-3 sm:text-xl lg:text-2xl">
                  {current.title}
                </p>
                <p className="mt-1 text-[10px] text-white/50 sm:text-sm">Image coming soon</p>
              </div>
            </div>
          )}
        </div>

        <div className="min-w-0 overflow-hidden p-4 text-white sm:p-6 lg:flex lg:flex-col lg:justify-center lg:p-8">
          {current.year && (
            <p className="text-[10px] font-semibold uppercase tracking-widest text-kedar-gold sm:text-xs">
              {current.year}
            </p>
          )}
          <h3 className="mt-1 break-words font-serif text-lg font-bold sm:mt-2 sm:text-2xl lg:text-3xl">
            {current.title}
          </h3>
          {current.location && (
            <p className="mt-0.5 break-words text-xs text-kedar-gold/80 sm:mt-1 sm:text-sm">{current.location}</p>
          )}
          <p className="mt-2 break-words text-xs leading-relaxed text-white/80 sm:mt-4 sm:text-sm">
            {current.description}
          </p>

          <div className="mt-4 flex items-center justify-center gap-3 sm:mt-6 sm:gap-4 lg:justify-start">
            <button
              type="button"
              onClick={prev}
              className="rounded-full border border-white/20 p-1.5 transition-colors hover:border-kedar-gold hover:text-kedar-gold sm:p-2"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <div className="flex gap-1.5 sm:gap-2">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    'h-1.5 rounded-full transition-all sm:h-2',
                    i === index ? 'w-6 bg-kedar-gold sm:w-8' : 'w-1.5 bg-white/30 hover:bg-white/50 sm:w-2',
                  )}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="rounded-full border border-white/20 p-1.5 transition-colors hover:border-kedar-gold hover:text-kedar-gold sm:p-2"
              aria-label="Next project"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
