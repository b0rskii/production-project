import { PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  ARTICLES_LIMIT,
  ARTICLES_SLICE,
  ArticlesList,
  articlesActions,
  articlesReducer,
  articlesSelectors,
  fetchArticles,
} from 'entities/Article';
import { getClassNames } from 'shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from 'shared/utils/redux';
import { LocalStorageKey } from 'shared/const/localStorage';
import { ListView } from 'shared/ui/ListViewSwitcher';
import style from './ArticlesBlock.module.scss';

let isInit = true;

type ArticlesBlockProps = PropsWithChildren<{
  className?: string;
}>;

export const ArticlesBlock = (props: ArticlesBlockProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  useAsyncReducer(ARTICLES_SLICE, articlesReducer, false);

  const articles = useSelector(articlesSelectors.getArticles.selectAll);
  const view = useSelector(articlesSelectors.getView);
  const isLoading = useSelector(articlesSelectors.getIsLoading);
  const error = useSelector(articlesSelectors.getError);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      if (isInit) {
        const localArticlesView = localStorage.getItem(
          LocalStorageKey.ARTICLES_VIEW,
        ) as ListView | null;

        if (localArticlesView) dispatch(articlesActions.setView(localArticlesView));

        dispatch(fetchArticles());

        isInit = false;
      }
    }
  }, [dispatch]);

  return (
    <section className={getClassNames(style.articlesBlock, {}, [className])}>
      <ArticlesList
        articles={articles}
        view={view}
        isLoading={isLoading}
        error={error}
        skeletonsCount={ARTICLES_LIMIT}
      />
    </section>
  );
};
