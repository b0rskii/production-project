import { MouseEvent, useCallback, useRef } from 'react';

const DRAGGABLE_DATA_ATTR = 'data-draggable';

export const useDraggable = () => {
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

    draggableEl.style.top = `${top}px`;
    draggableEl.style.left = `${left}px`;
  }, []);

  const handleMouseDown = (evt: MouseEvent<HTMLDivElement>) => {
    const draggableEl = draggableElRef.current;
    if (!draggableEl) return;

    evt.preventDefault();
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

    startElTopRef.current = draggableEl.getBoundingClientRect().top;
    startElLeftRef.current = draggableEl.getBoundingClientRect().left;
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);

    const draggableEl = draggableElRef.current;
    if (!draggableEl) return;

    draggableEl.style.cursor = 'grab';
  };

  return {
    ref: draggableElRef,
    style: { cursor: 'grab' },
    [DRAGGABLE_DATA_ATTR]: true,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
  };
};
