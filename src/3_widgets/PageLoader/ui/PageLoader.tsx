import { getClassNames } from '6_shared/utils/classNames/getClassNames';
import { Loader } from '6_shared/ui/Loader';
import style from './PageLoader.module.scss';

type PageLoaderProps = {
  className?: string;
};

export const PageLoader = (props: PageLoaderProps) => {
  const { className } = props;

  return (
    <div className={getClassNames(style.pageLoader, {}, [className])}>
      <Loader />
    </div>
  );
};
