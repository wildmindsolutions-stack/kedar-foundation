'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarouselSwipe } from '@/hooks/useCarouselSwipe';
import { cn } from '@/lib/utils';

export interface ProjectSlide {
  id: string;
  title: string;
  description: string;
  location?: string;
  year?: string;
  image?: string;
  images?: string[];
}

interface ProjectsCarouselProps {
  projects: ProjectSlide[];
}

const PHOTO_INTERVAL_MS = 4000;

function getPhotos(project: ProjectSlide | undefined): string[] {
  if (!project) return [];
  if (project.images?.length) return project.images;
  if (project.image) return [project.image];
  return [];
}

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const current = projects[index];
  const photos = getPhotos(current);

  const goToProject = useCallback((projectIndex: number) => {
    setIndex(((projectIndex % projects.length) + projects.length) % projects.length);
    setPhotoIndex(0);
  }, [projects.length]);

  const nextProject = useCallback(() => {
    goToProject(index + 1);
  }, [goToProject, index]);

  const prevProject = useCallback(() => {
    goToProject(index - 1);
  }, [goToProject, index]);

  const nextPhoto = useCallback(() => {
    setPhotoIndex((i) => (i + 1) % photos.length);
  }, [photos.length]);

  const prevPhoto = useCallback(() => {
    setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const advance = useCallback(() => {
    if (photos.length > 1 && photoIndex < photos.length - 1) {
      setPhotoIndex((i) => i + 1);
      return;
    }
    setIndex((i) => (i + 1) % projects.length);
    setPhotoIndex(0);
  }, [photoIndex, photos.length, projects.length]);

  useEffect(() => {
    if (paused) return;
    const canAdvance = photos.length > 1 || projects.length > 1;
    if (!canAdvance) return;
    const timer = setInterval(advance, PHOTO_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, advance, photos.length, projects.length]);

  const photoSwipe = useCarouselSwipe(prevPhoto, nextPhoto, setPaused);

  if (projects.length === 0) return null;

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-kedar-gold/20 bg-kedar-navy shadow-card sm:rounded-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex flex-col lg:grid lg:grid-cols-2">
        <div
          className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-kedar-navy-dark touch-pan-y sm:aspect-[5/4] lg:aspect-auto lg:min-h-[360px]"
          {...(photos.length > 1 ? photoSwipe : {})}
        >
          {photos.length > 0 ? (
            <>
              {photos.map((src, i) => (
                <div
                  key={src}
                  className={cn(
                    'absolute inset-0 flex items-center justify-center bg-kedar-navy-dark p-3 transition-opacity duration-700 sm:p-5',
                    i === photoIndex ? 'opacity-100' : 'opacity-0',
                  )}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={src}
                      alt={`${current.title} photo ${i + 1}`}
                      fill
                      className="object-contain object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={i === 0 && index === 0}
                    />
                  </div>
                </div>
              ))}

              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevPhoto}
                    className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-kedar-navy/80 p-1.5 text-white transition-colors hover:border-kedar-gold hover:text-kedar-gold sm:left-3 sm:p-2"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextPhoto}
                    className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-kedar-navy/80 p-1.5 text-white transition-colors hover:border-kedar-gold hover:text-kedar-gold sm:right-3 sm:p-2"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>

                  <div className="absolute bottom-3 left-0 right-0 z-10 flex flex-col items-center gap-2">
                    <span className="rounded-full bg-kedar-navy/80 px-3 py-1 text-xs font-medium text-white">
                      {photoIndex + 1} / {photos.length}
                    </span>
                    {photos.length <= 12 && (
                      <div className="flex max-w-full flex-wrap justify-center gap-1.5 px-4">
                        {photos.map((src, i) => (
                          <button
                            key={src}
                            type="button"
                            onClick={() => setPhotoIndex(i)}
                            className={cn(
                              'h-1.5 rounded-full transition-all',
                              i === photoIndex ? 'w-5 bg-kedar-gold' : 'w-1.5 bg-white/50 hover:bg-white/80',
                            )}
                            aria-label={`Show photo ${i + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
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
              onClick={prevProject}
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
                  onClick={() => goToProject(i)}
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
              onClick={nextProject}
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
