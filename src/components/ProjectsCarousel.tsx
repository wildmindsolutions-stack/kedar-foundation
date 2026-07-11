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
      className="relative overflow-hidden rounded-2xl border border-kedar-gold/20 bg-kedar-navy shadow-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[320px]">
          {current.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={current.image}
              alt={current.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="flex h-full min-h-[240px] items-center justify-center bg-gradient-to-br from-kedar-navy-light via-kedar-navy to-kedar-navy-dark p-8 text-center"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-kedar-gold/70">
                  Project showcase
                </p>
                <p className="mt-3 font-serif text-2xl font-bold text-white">{current.title}</p>
                <p className="mt-2 text-sm text-white/50">Image coming soon</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center p-8 text-white">
          {current.year && (
            <p className="text-xs font-semibold uppercase tracking-widest text-kedar-gold">{current.year}</p>
          )}
          <h3 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">{current.title}</h3>
          {current.location && (
            <p className="mt-1 text-sm text-kedar-gold/80">{current.location}</p>
          )}
          <p className="mt-4 text-sm leading-relaxed text-white/80">{current.description}</p>

          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="rounded-full border border-white/20 p-2 transition-colors hover:border-kedar-gold hover:text-kedar-gold"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    i === index ? 'w-8 bg-kedar-gold' : 'w-2 bg-white/30 hover:bg-white/50',
                  )}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="rounded-full border border-white/20 p-2 transition-colors hover:border-kedar-gold hover:text-kedar-gold"
              aria-label="Next project"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
