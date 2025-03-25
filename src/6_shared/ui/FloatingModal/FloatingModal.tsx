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
import { useResizable, UseResizableParams } from './useResizable';

const ANIMATION_MS = 100;

export type FloatingModalProps = {
  className?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  // eslint-disable-next-line no-unused-vars
  children: ReactNode | ((closeModal: () => void) => ReactNode);
  onClose?: () => void;
} & Omit<UseDraggableModalParams, 'modalRef'> &
  Omit<UseResizableParams, 'targetRef' | 'resizeControlRef'>;

export const FloatingModal = (props: FloatingModalProps) => {
  const {
    className,
    children,
    onClose,
    width = '',
    height = '',
    minWidth = '',
    minHeight = '',
    ...draggableParams
  } = props;

  const { isOpening, isClosing, closingTimeoutRef, closeHandler } = useModal({
    animationMs: ANIMATION_MS,
    onClose,
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const resizeControlRef = useRef<HTMLDivElement>(null);

  const draggable = useDraggableModal({
    modalRef,
    ...draggableParams,
  });

  const resizeControl = useResizable({
    targetRef: modalRef,
    resizeControlRef,
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
        style={{ width, height, minWidth, minHeight }}
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
        <div
          className={style.resizeControl}
          ref={resizeControlRef}
          {...resizeControl}
        />
      </div>
    </Portal>
  );
};
