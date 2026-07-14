import { useRef } from 'react';

const SWIPE_THRESHOLD = 48;

export function useCarouselSwipe(
  onPrev: () => void,
  onNext: () => void,
  onPauseChange?: (paused: boolean) => void,
) {
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  return {
    onTouchStart(e: React.TouchEvent) {
      touchStartX.current = e.touches[0].clientX;
      touchDeltaX.current = 0;
      onPauseChange?.(true);
    },
    onTouchMove(e: React.TouchEvent) {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    },
    onTouchEnd() {
      if (touchDeltaX.current < -SWIPE_THRESHOLD) onNext();
      else if (touchDeltaX.current > SWIPE_THRESHOLD) onPrev();
      touchDeltaX.current = 0;
      onPauseChange?.(false);
    },
  };
}
