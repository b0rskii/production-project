import { EffectCallback, useEffect, useRef } from 'react';

export const useBeforeMount = (callback: () => void) => {
  const mounted = useRef(false);
  if (!mounted.current) callback();
  mounted.current = true;
};

export const useMountEffect = (callback: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
};

export const useUnmountEffect = (callback: () => void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => callback, []);
};
