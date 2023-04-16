import { PropsWithChildren, memo } from 'react';
import { getClassNames } from 'shared/utils/classNames';
import { ArticleDetailsBlock } from './ArticleDetailsBlock';
// import style from './ArticleDetailsPage.module.scss';

type ArticleDetailsPageProps = PropsWithChildren<{
  className?: string;
}>;

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;

  return (
    <div className={getClassNames('', {}, [className])}>
      <ArticleDetailsBlock />
    </div>
  );
};

export default memo(ArticleDetailsPage);
