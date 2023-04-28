import { PropsWithChildren, memo } from 'react';
import { getClassNames } from 'shared/utils/classNames';
import { ArticlesView, Article as ArticleType } from '../../model/types/articleSchema';
import { Article } from '../Article';
import style from './ArticlesList.module.scss';

type ArticlesListProps = PropsWithChildren<{
  className?: string;
  articles: ArticleType[];
  isLoading: boolean;
  error: string | null;
  view?: ArticlesView;
}>;

export const ArticlesList = memo((props: ArticlesListProps) => {
  const { className, articles, isLoading, error, view = 'tiles' } = props;

  return (
    <div className={getClassNames(style[view], {}, [className])}>
      {articles.length
        ? articles.map((article) => (
          <Article data={article} view={view} key={article.id} />
        ))
        : null}
    </div>
  );
});
