import {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getClassNames } from 'shared/utils/classNames/getClassNames';
import { Key } from 'shared/const';
import { Portal } from 'shared/ui/Portal';
import style from './Modal.module.scss';

const ANIMATION_DURATION = 100;

type ModalProps = {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
};

export const Modal: FC<ModalProps> = (props) => {
  const {
    className,
    children,
    isOpen,
    onClose,
  } = props;

  const [isOpening, setIsOpening] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const openingTmeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const closingTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

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
        <div
          className={style.overlay}
          onClick={closeHandler}
        >
          <div
            className={style.content}
            onClick={(evt) => evt.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
