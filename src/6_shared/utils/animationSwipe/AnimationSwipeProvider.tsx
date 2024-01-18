import { ReactNode, createContext, useContext, useMemo, useRef, useState } from 'react';

type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

type AnimationSwipeContextContextType = {
  Spring?: SpringType;
  Gesture?: GestureType;
  isLoaded?: boolean;
};

const AnimationSwipeContext = createContext<AnimationSwipeContextContextType>({});

export const AnimationSwipeProvider = ({ children }: { children: ReactNode }) => {
  const spring = useRef<SpringType>();
  const gesture = useRef<GestureType>();
  const [isLoaded, setIsLoaded] = useState(false);

  const value = useMemo<AnimationSwipeContextContextType>(() => ({
    Spring: spring.current,
    Gesture: gesture.current,
    isLoaded,
  }), [isLoaded]);

  if (!isLoaded) {
    Promise.all([import('@react-spring/web'), import('@use-gesture/react')])
      .then(([springRes, gestureRes]) => {
        spring.current = springRes;
        gesture.current = gestureRes;
        setIsLoaded(true);
      });
  }

  return (
    <AnimationSwipeContext.Provider value={value}>
      {children}
    </AnimationSwipeContext.Provider>
  );
};

export const useAnimationSwipeContext = () => (
  useContext(AnimationSwipeContext) as Required<AnimationSwipeContextContextType>
);
