import { useCallback, useEffect, useRef } from 'react';

// eslint-disable-next-line no-unused-vars
export const useThrottle = (callback: (...args: any[]) => void, delay: number) => {
  const throttleRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const throttledCallback = useCallback((...args) => {
    if (!throttleRef.current) {
      callback(...args);

      throttleRef.current = true;

      timeoutRef.current = setTimeout(() => {
        throttleRef.current = false;
      }, delay);
    }
  }, [callback, delay]);

  useEffect(() => () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return throttledCallback;
};
