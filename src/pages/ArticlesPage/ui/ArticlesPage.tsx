import { PropsWithChildren, memo } from 'react';
import { getClassNames } from 'shared/utils/classNames';
import { Header } from './Header';
import { ArticlesBlock } from './ArticlesBlock';

type ArticlesPageProps = PropsWithChildren<{
  className?: string;
}>;

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;

  return (
    <div className={getClassNames('', {}, [className])}>
      <Header />
      <ArticlesBlock />
    </div>
  );
};

export default memo(ArticlesPage);
