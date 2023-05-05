import { MutableRefObject, useEffect } from 'react';

export type UseInfiniteScrollOptions = {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>;
};

export const useInfiniteScroll = (options: UseInfiniteScrollOptions) => {
  const { callback, triggerRef, wrapperRef } = options;

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let target: HTMLElement;

    if (callback) {
      const root = wrapperRef.current;
      target = triggerRef.current;

      const options = {
        root,
        rootMargin: '0px',
        threshold: 1.0,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.observe(target);
    }

    return () => {
      if (observer) {
        observer.unobserve(target);
      }
    };
  }, [wrapperRef, triggerRef, callback]);
};
