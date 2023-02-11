import { FC } from 'react';
import { getClassNames } from 'shared/utils/classNames/getClassNames';
import { Loader } from 'shared/ui/Loader';
import style from './PageLoader.module.scss';

type PageLoaderProps = {
  className?: string;
};

export const PageLoader: FC<PageLoaderProps> = (props) => {
  const { className } = props;

  return (
    <div className={getClassNames(style.pageLoader, {}, [className])}>
      <Loader />
    </div>
  );
};
