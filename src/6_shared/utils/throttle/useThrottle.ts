import { useCallback, useRef } from 'react';
import { useUnmountEffect } from '../react/lifeCycle';

// eslint-disable-next-line no-unused-vars
export const useThrottle = (
  callback: (...args: any[]) => void,
  delay: number,
) => {
  const throttleRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const throttledCallback = useCallback(
    (...args: any[]) => {
      if (!throttleRef.current) {
        callback(...args);

        throttleRef.current = true;

        timeoutRef.current = setTimeout(() => {
          throttleRef.current = false;
        }, delay);
      }
    },
    [callback, delay],
  );

  useUnmountEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  });

  return throttledCallback;
};
