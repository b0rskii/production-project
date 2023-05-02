import { PropsWithChildren, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  ArticlesList,
  articlesSelectors,
  ARTICLES_SLICE,
  articlesReducer,
  fetchArticles,
} from 'entities/Article';
import { getClassNames } from 'shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from 'shared/utils/redux';

type ArticlesPageProps = PropsWithChildren<{
  className?: string;
}>;

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  useAsyncReducer(ARTICLES_SLICE, articlesReducer);

  const articles = useSelector(articlesSelectors.getArticles.selectAll);
  const view = useSelector(articlesSelectors.getView);
  const isLoading = useSelector(articlesSelectors.getIsLoading);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticles());
    }
  }, [dispatch]);

  return (
    <div className={getClassNames('', {}, [className])}>
      <ArticlesList
        articles={articles}
        view={view}
        isLoading={isLoading}
        error={null}
      />
    </div>
  );
};

export default memo(ArticlesPage);
