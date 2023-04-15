import { PropsWithChildren, memo } from 'react';
import { ArticleDetails } from 'entities/Article';
import { getClassNames } from 'shared/utils/classNames';
// import style from './ArticleDetailsPage.module.scss';

type ArticleDetailsPageProps = PropsWithChildren<{
  className?: string;
}>;

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;

  return (
    <div className={getClassNames('', {}, [className])}>
      <ArticleDetails />
    </div>
  );
};

export default memo(ArticleDetailsPage);
