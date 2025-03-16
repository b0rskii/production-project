import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { useModal } from '@/6_shared/utils/modal';
import { getClassNames } from '@/6_shared/utils/classNames/getClassNames';
import { Key } from '@/6_shared/const/keys';
import { Portal } from '@/6_shared/ui/Portal';
import style from './FloatingModal.module.scss';
import {
  useDraggableModal,
  UseDraggableModalParams,
} from './useDraggableModal';

const ANIMATION_MS = 100;

export type FloatingModalProps = {
  className?: string;
  // eslint-disable-next-line no-unused-vars
  children: ReactNode | ((closeModal: () => void) => ReactNode);
  onClose?: () => void;
} & Omit<UseDraggableModalParams, 'modalRef'>;

export const FloatingModal = (props: FloatingModalProps) => {
  const { className, children, onClose, ...draggableParams } = props;

  const modalRef = useRef<HTMLDivElement>(null);

  const { isOpening, isClosing, closingTimeoutRef, closeHandler } = useModal({
    animationMs: ANIMATION_MS,
    onClose,
  });

  const draggable = useDraggableModal({
    modalRef,
    ...draggableParams,
  });

  const escKeydownHandler = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === Key.ESCAPE) {
        closeHandler();
      }
    },
    [closeHandler],
  );

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
      <div
        className={getClassNames(style.root, modes, [className])}
        ref={modalRef}
        {...draggable}
      >
        <div
          className={style.content}
          onMouseDown={(evt) => evt.stopPropagation()}
        >
          {typeof children === 'function' ? children(closeHandler) : children}
        </div>
      </div>
    </Portal>
  );
};
