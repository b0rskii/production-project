import {
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import { useModal } from '@/6_shared/utils/modal';
import { getClassNames } from '@/6_shared/utils/classNames/getClassNames';
import { Key } from '@/6_shared/const/keys';
import { Portal } from '@/6_shared/ui/Portal';
import { Overlay } from '@/6_shared/ui/Overlay';
import style from './Modal.module.scss';

const ANIMATION_MS = 100;

type ModalProps = {
  className?: string;
  // eslint-disable-next-line no-unused-vars
  children: (closeModal: () => void) => ReactNode;
  onClose?: () => void;
};

export const Modal = (props: ModalProps) => {
  const { className, children, onClose } = props;

  const {
    isOpening,
    isClosing,
    closingTimeoutRef,
    closeHandler,
  } = useModal({ animationMs: ANIMATION_MS, onClose });

  const escKeydownHandler = useCallback((evt: KeyboardEvent) => {
    if (evt.key === Key.ESCAPE) {
      closeHandler();
    }
  }, [closeHandler]);

  useEffect(() => {
    const closingTimeout = closingTimeoutRef.current;

    document.addEventListener('keydown', escKeydownHandler);

    return () => {
      clearTimeout(closingTimeout);
      document.removeEventListener('keydown', escKeydownHandler);
    };
  }, [escKeydownHandler, closingTimeoutRef]);

  const modes = {
    [style.opened]: !isOpening,
    [style.closing]: isClosing,
  };

  return (
    <Portal>
      <div className={getClassNames(style.modal, modes, [className])}>
        <Overlay onClick={closeHandler} />
        <div className={style.content}>
          {children(closeHandler)}
        </div>
      </div>
    </Portal>
  );
};
