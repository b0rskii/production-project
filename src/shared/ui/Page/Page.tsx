import { MutableRefObject, PropsWithChildren, useRef } from 'react';
import { getClassNames } from 'shared/utils/classNames';
import { useInfiniteScroll } from 'shared/utils/infiniteScroll';
import style from './Page.module.scss';

type PageProps = PropsWithChildren<{
  className?: string;
  onScrollToPageBottom?: () => void;
}>;

export const Page = (props: PageProps) => {
  const { className, children, onScrollToPageBottom } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    wrapperRef,
    triggerRef,
    callback: onScrollToPageBottom,
  });

  return (
    <main className={getClassNames(style.pageWrapper, {}, [className])} ref={wrapperRef}>
      {children}
      <div ref={triggerRef} />
    </main>
  );
};
