import type { RefObject } from 'react';
import { useEffect } from 'react';

const DEFAULT_THRESHOLD: number[] = [0.8];

interface UseIntersectionObserverOptions {
  root?: null | HTMLElement;
  rootMargin?: string;
  threshold?: number[] | number;
  onIntersect: IntersectionObserverCallback;
  isLoading?: boolean;
}

const useIntersectionObserver = (
  ref: RefObject<HTMLElement | null>,
  {
    root = null,
    onIntersect,
    threshold = DEFAULT_THRESHOLD,
    rootMargin = '0px 0px',
    isLoading = false,
  }: UseIntersectionObserverOptions,
): void => {
  useEffect(() => {
    if (isLoading || !ref.current) return;

    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, root, rootMargin, threshold, isLoading, onIntersect]);
};

export default useIntersectionObserver;
