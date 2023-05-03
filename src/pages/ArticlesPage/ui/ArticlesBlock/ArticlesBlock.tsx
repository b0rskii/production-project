import { PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  ARTICLES_SLICE,
  ArticlesList,
  articlesReducer,
  articlesSelectors,
  fetchArticles,
} from 'entities/Article';
import { getClassNames } from 'shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from 'shared/utils/redux';
import style from './ArticlesBlock.module.scss';

type ArticlesBlockProps = PropsWithChildren<{
  className?: string;
}>;

export const ArticlesBlock = (props: ArticlesBlockProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  useAsyncReducer(ARTICLES_SLICE, articlesReducer);

  const articles = useSelector(articlesSelectors.getArticles.selectAll);
  const view = useSelector(articlesSelectors.getView);
  const isLoading = useSelector(articlesSelectors.getIsLoading);
  const error = useSelector(articlesSelectors.getError);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticles());
    }
  }, [dispatch]);

  return (
    <div className={getClassNames(style.articlesBlock, {}, [className])}>
      <ArticlesList
        articles={articles}
        view={view}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};
