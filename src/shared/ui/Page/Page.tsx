import { PropsWithChildren } from 'react';
import { getClassNames } from 'shared/utils/classNames';
import style from './Page.module.scss';

type PageProps = PropsWithChildren<{
  className?: string;
}>;

export const Page = (props: PageProps) => {
  const { className, children } = props;

  return (
    <main className={getClassNames(style.pageWrapper, {}, [className])}>
      {children}
    </main>
  );
};
