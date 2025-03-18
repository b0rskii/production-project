import {
  MouseEvent,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { getLimitedValue } from '@/6_shared/utils/numbers';
import { getAdjustedInitialCoords } from '@/6_shared/utils/elementsPositioning';
import { PositionX, PositionY } from '@/6_shared/types/common';

const DRAGGABLE_DATA_ATTR = 'data-draggable-modal';
const DEFAULT_OFFSET = 16;

export type UseDraggableModalParams = {
  modalRef: RefObject<HTMLElement>;
  anchorRef?: RefObject<HTMLElement>;
  positionX?: PositionX;
  positionY?: PositionY;
  offset?: number;
};

export const useDraggableModal = (params: UseDraggableModalParams) => {
  const {
    modalRef,
    anchorRef,
    positionX,
    positionY,
    offset = DEFAULT_OFFSET,
  } = params;

  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startModalTopRef = useRef(0);
  const startModalLeftRef = useRef(0);
  const modalWidthRef = useRef(0);
  const modalHeightRef = useRef(0);

  const handleMouseMove = useCallback(
    (evt: globalThis.MouseEvent) => {
      const modal = modalRef.current;
      if (!modal) return;

      const dragX = evt.clientX - startXRef.current;
      const dragY = evt.clientY - startYRef.current;

      const top = startModalTopRef.current + dragY;
      const left = startModalLeftRef.current + dragX;

      const maxTop = window.innerHeight - modalHeightRef.current - 2;
      const maxLeft = window.innerWidth - modalWidthRef.current - 2;

      modal.style.top = `${getLimitedValue(0, top, maxTop)}px`;
      modal.style.left = `${getLimitedValue(0, left, maxLeft)}px`;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);

    const modal = modalRef.current;
    if (!modal) return;

    modal.style.cursor = 'grab';
  };

  const handleMouseDown = (evt: MouseEvent<HTMLDivElement>) => {
    const modal = modalRef.current;
    if (!modal) return;

    evt.preventDefault();
    evt.stopPropagation();
    document.addEventListener('mouseup', handleMouseUp, { once: true });
    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    modal.style.cursor = 'grabbing';

    const dragModals = document.querySelectorAll<HTMLDivElement>(
      `[${DRAGGABLE_DATA_ATTR}]`,
    );

    if (dragModals.length > 1) {
      let maxZIndex = 0;

      dragModals.forEach((modal) => {
        const { zIndex } = modal.style;
        maxZIndex = Math.max(maxZIndex, Number(zIndex));
      });

      if (Number(modal.style.zIndex) < maxZIndex) {
        modal.style.zIndex = `${maxZIndex + 1}`;
      }
    }

    startXRef.current = evt.clientX;
    startYRef.current = evt.clientY;

    const { top, left } = modal.getBoundingClientRect();
    startModalTopRef.current = top;
    startModalLeftRef.current = left;

    modalWidthRef.current = modal.clientWidth;
    modalHeightRef.current = modal.clientHeight;
  };

  useLayoutEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    modal.style.position = 'fixed';
    modal.style.cursor = 'grab';

    const anchorEl = anchorRef?.current;

    if (anchorEl) {
      const { top, left } = getAdjustedInitialCoords({
        anchorEl,
        targetEl: modal,
        positionX,
        positionY,
        offset,
      });
      modal.style.top = `${top}px`;
      modal.style.left = `${left}px`;
      return;
    }

    modal.style.top = `${window.innerHeight / 2 - modal.clientHeight / 2}px`;
    modal.style.left = `${window.innerWidth / 2 - modal.clientWidth / 2}px`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const modal = modalRef.current;
      if (!modal) return;

      const { top, left } = modal.getBoundingClientRect();

      const maxTop = window.innerHeight - modal.clientHeight - 2;
      const maxLeft = window.innerWidth - modal.clientWidth - 2;

      modal.style.top = `${getLimitedValue(0, top, maxTop)}px`;
      modal.style.left = `${getLimitedValue(0, left, maxLeft)}px`;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    [DRAGGABLE_DATA_ATTR]: '',
    onMouseDown: handleMouseDown,
  };
};
