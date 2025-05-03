import { useCallback, useRef } from 'react';
import { useUnmountEffect } from '../react/lifeCycle';

// eslint-disable-next-line no-unused-vars
export const useDebounce = (
  callback: (...args: any[]) => void,
  delay: number,
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  useUnmountEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  });

  return debouncedCallback;
};
