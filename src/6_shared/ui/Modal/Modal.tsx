import {
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getClassNames } from '6_shared/utils/classNames/getClassNames';
import { Key } from '6_shared/const/keys';
import { Portal } from '6_shared/ui/Portal';
import { Overlay } from '6_shared/ui/Overlay';
import style from './Modal.module.scss';

const ANIMATION_DURATION = 100;

type ModalProps = {
  className?: string;
  isOpen?: boolean;
  children: ReactNode;
  onClose?: () => void;
};

export const Modal = (props: ModalProps) => {
  const {
    className,
    children,
    isOpen,
    onClose,
  } = props;

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
      }, ANIMATION_DURATION);
    }
  }, [onClose]);

  const escKeydownHandler = useCallback((evt: KeyboardEvent) => {
    if (evt.key === Key.ESCAPE) {
      closeHandler();
    }
  }, [closeHandler]);

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

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', escKeydownHandler);
    }

    return () => {
      clearTimeout(closingTimeoutRef.current);
      document.removeEventListener('keydown', escKeydownHandler);
    };
  }, [isOpen, escKeydownHandler]);

  const modes = {
    [style.opened]: !isOpening,
    [style.closing]: isClosing,
  };

  return (
    <Portal>
      <div className={getClassNames(style.modal, modes, [className])}>
        <Overlay onClick={closeHandler} />
        <div className={style.content}>
          {children}
        </div>
      </div>
    </Portal>
  );
};
