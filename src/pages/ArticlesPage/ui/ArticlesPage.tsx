import { PropsWithChildren, memo } from 'react';
import { ArticlesList, mockArticles } from 'entities/Article';
import { getClassNames } from 'shared/utils/classNames';

const articles = mockArticles(16);

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
