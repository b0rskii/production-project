import {
  MouseEvent,
  RefObject,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';
import { getLimitedValue } from '@/6_shared/utils/numbers';

const DRAGGABLE_DATA_ATTR = 'data-draggable-modal';
const DEFAULT_OFFSET = 16;

// eslint-disable-next-line no-unused-vars
type СalcInitialCoords = (params: {
  anchorEl: HTMLElement;
  targetEl: HTMLElement;
  offset: number;
}) => { top: number; left: number };

const calcInitialCoords: СalcInitialCoords = (params) => {
  const { anchorEl, targetEl, offset } = params;

  const { bottom, left } = anchorEl.getBoundingClientRect();

  let resultTop = bottom + offset;
  let resultLeft = left - targetEl.clientWidth - offset;

  if (resultTop + targetEl.clientHeight > window.innerHeight) {
    resultTop = bottom - anchorEl.clientHeight - targetEl.clientHeight - offset;
  }

  if (resultLeft < 0) {
    resultLeft = left + anchorEl.clientWidth + offset;
  }

  return {
    top: resultTop,
    left: resultLeft,
  };
};

export type UseDraggableModalParams = {
  anchorElRef?: RefObject<HTMLElement>;
  offset?: number;
};

export const useDraggableModal = (params: UseDraggableModalParams) => {
  const { anchorElRef, offset = DEFAULT_OFFSET } = params;

  const draggableElRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startElTopRef = useRef(0);
  const startElLeftRef = useRef(0);

  const handleMouseMove = useCallback((evt: globalThis.MouseEvent) => {
    const draggableEl = draggableElRef.current;
    if (!draggableEl) return;

    const dragX = evt.clientX - startXRef.current;
    const dragY = evt.clientY - startYRef.current;

    const top = startElTopRef.current + dragY;
    const left = startElLeftRef.current + dragX;

    const maxTop = window.innerHeight - draggableEl.clientHeight;
    const maxLeft = window.innerWidth - draggableEl.clientWidth;

    draggableEl.style.top = `${getLimitedValue(0, top, maxTop)}px`;
    draggableEl.style.left = `${getLimitedValue(0, left, maxLeft)}px`;
  }, []);

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);

    const draggableEl = draggableElRef.current;
    if (!draggableEl) return;

    draggableEl.style.cursor = 'grab';
  };

  const handleMouseDown = (evt: MouseEvent<HTMLDivElement>) => {
    const draggableEl = draggableElRef.current;
    if (!draggableEl) return;

    evt.preventDefault();
    document.addEventListener('mouseup', handleMouseUp, { once: true });
    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    draggableEl.style.cursor = 'grabbing';

    const dragEls = document.querySelectorAll<HTMLDivElement>(
      `[${DRAGGABLE_DATA_ATTR}]`,
    );

    if (dragEls.length > 1) {
      let maxZIndex = 0;

      dragEls.forEach((el) => {
        const { zIndex } = el.style;
        maxZIndex = Math.max(maxZIndex, Number(zIndex));
      });

      draggableEl.style.zIndex = `${maxZIndex + 1}`;
    }

    startXRef.current = evt.clientX;
    startYRef.current = evt.clientY;

    const { top, left } = draggableEl.getBoundingClientRect();
    startElTopRef.current = top;
    startElLeftRef.current = left;
  };

  useLayoutEffect(() => {
    const draggableEl = draggableElRef.current;
    if (!draggableEl) return;

    draggableEl.style.position = 'fixed';
    draggableEl.style.cursor = 'grab';

    const anchorEl = anchorElRef?.current;

    if (anchorEl) {
      const { top, left } = calcInitialCoords({
        anchorEl,
        targetEl: draggableEl,
        offset,
      });

      draggableEl.style.top = `${top}px`;
      draggableEl.style.left = `${left}px`;

      return;
    }

    draggableEl.style.top = `${window.innerHeight / 2 - draggableEl.clientHeight / 2}px`;
    draggableEl.style.left = `${window.innerWidth / 2 - draggableEl.clientWidth / 2}px`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ref: draggableElRef,
    [DRAGGABLE_DATA_ATTR]: true,
    onMouseDown: handleMouseDown,
  };
};
