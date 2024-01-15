import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  animationMs: number;
  onClose?: () => void;
};

export const useModal = ({ animationMs, onClose }: Props) => {
  const [isOpening, setIsOpening] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const openingTmeoutRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  const closingTimeoutRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);

      closingTimeoutRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, animationMs);
    }
  }, [onClose, animationMs]);

  useEffect(() => {
    if (isOpening) {
      openingTmeoutRef.current = setTimeout(() => {
        setIsOpening(false);
      });
    }

    return () => {
      clearTimeout(openingTmeoutRef.current);
    };
  }, [isOpening]);

  return {
    isOpening,
    isClosing,
    closingTimeoutRef,
    closeHandler,
  };
};
