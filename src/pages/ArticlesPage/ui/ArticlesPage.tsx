import { PropsWithChildren, memo } from 'react';
import { getClassNames } from 'shared/utils/classNames';
// import style from './ArticlesPage.module.scss';

type ArticlesPageProps = PropsWithChildren<{
  className?: string;
}>;

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;

  return (
    // eslint-disable-next-line i18next/no-literal-string
    <div className={getClassNames('', {}, [className])}>
      Articles Page
    </div>
  );
};

export default memo(ArticlesPage);
