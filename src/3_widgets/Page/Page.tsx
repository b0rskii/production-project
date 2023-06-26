import { MutableRefObject, PropsWithChildren, useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getClassNames } from '6_shared/utils/classNames';
import { useInfiniteScroll } from '6_shared/utils/infiniteScroll';
import { useAppDispatch } from '6_shared/utils/redux';
import { uiActions } from './model/slice/uiSlice';
import style from './Page.module.scss';
import { uiSelectors } from './model/selectors';

type PageProps = PropsWithChildren<{
  className?: string;
  onScrollToPageBottom?: () => void;
}>;

export const Page = (props: PageProps) => {
  const { className, children, onScrollToPageBottom } = props;
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const scrollPositionRef = useRef(0);

  const scrollPosition = useSelector(uiSelectors.getPageScrollData(pathname));

  useInfiniteScroll({
    wrapperRef,
    triggerRef,
    callback: onScrollToPageBottom,
  });

  useLayoutEffect(() => {
    if (scrollPosition > 0) {
      wrapperRef.current.scrollTo({ top: scrollPosition });
    }

    return () => {
      dispatch(uiActions.setScrollData({
        path: pathname,
        scrollPosition: scrollPositionRef.current,
      }));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollHandler = () => {
    scrollPositionRef.current = wrapperRef.current.scrollTop;
  };

  return (
    <main
      className={getClassNames(style.pageWrapper, {}, [className])}
      ref={wrapperRef}
      onScroll={scrollHandler}
    >
      {children}
      <div ref={triggerRef} />
    </main>
  );
};
