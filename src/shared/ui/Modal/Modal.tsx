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

const CLOSING_ANIMATION_DURATION = 100;

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

  const [isClosing, setIsClosing] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const modes = {
    [style.opened]: isOpen,
    [style.closing]: isClosing,
  };

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);

      timeoutRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, CLOSING_ANIMATION_DURATION);
    }
  }, [onClose]);

  const escKeydownHandler = useCallback((evt: KeyboardEvent) => {
    if (evt.key === Key.ESCAPE) {
      closeHandler();
    }
  }, [closeHandler]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', escKeydownHandler);
    }

    return () => {
      clearTimeout(timeoutRef.current);
      document.removeEventListener('keydown', escKeydownHandler);
    };
  }, [isOpen, escKeydownHandler]);

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
