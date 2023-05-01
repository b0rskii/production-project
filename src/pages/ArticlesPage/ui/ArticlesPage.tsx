import { PropsWithChildren, memo } from 'react';
import { ArticlesList, mockArticle } from 'entities/Article';
import { getClassNames } from 'shared/utils/classNames';

const articles = new Array(16)
  .fill(0)
  .map((_, index) => ({ ...mockArticle, id: String(index + 1) }));

type ArticlesPageProps = PropsWithChildren<{
  className?: string;
}>;

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;

  return (
    <div className={getClassNames('', {}, [className])}>
      <ArticlesList
        articles={articles}
        isLoading
        error={null}
      />
    </div>
  );
};

export default memo(ArticlesPage);
