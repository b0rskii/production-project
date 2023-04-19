import { PropsWithChildren, memo } from 'react';
import { getClassNames } from 'shared/utils/classNames';
import { ArticleDetailsBlock } from './ArticleDetailsBlock';

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
