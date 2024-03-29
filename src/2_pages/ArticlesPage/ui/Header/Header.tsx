import { PropsWithChildren, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  ArticlesSorting,
  SORT_ARTICLES_SLICE,
  sortArticlesReducer,
  sortArticlesActions,
  sortArticlesSelectors,
  TSortingType,
  TSortingOrder,
} from '@/4_features/SortArticles';
import {
  ArticlesSearch,
  FILTER_ARTICLES_SLICE,
  filterArticlesReducer,
  filterArticlesActions,
  filterArticlesSelectors,
  ArticlesFilterTabs,
} from '@/4_features/FilterArticles';
import { articlesActions, articlesSelectors, fetchArticles } from '@/5_entities/Article';
import { getClassNames } from '@/6_shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from '@/6_shared/utils/redux';
import { useDebounce } from '@/6_shared/utils/debounce';
import { ListView, ListViewSwitcher } from '@/6_shared/ui/ListViewSwitcher';
import style from './Header.module.scss';

const DEBOUNCE_DELAY = 500;

type HeaderProps = PropsWithChildren<{
  className?: string;
}>;

export const Header = memo((props: HeaderProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const articleView = useSelector(articlesSelectors.getView);

  useAsyncReducer(SORT_ARTICLES_SLICE, sortArticlesReducer, false);
  const sortingType = useSelector(sortArticlesSelectors.getSortingType);
  const sortingOrder = useSelector(sortArticlesSelectors.getSortingOrder);

  useAsyncReducer(FILTER_ARTICLES_SLICE, filterArticlesReducer, false);
  const search = useSelector(filterArticlesSelectors.getSearch);

  const getArticles = useCallback(() => {
    dispatch(articlesActions.resetArticles());
    dispatch(fetchArticles());
  }, [dispatch]);

  const onViewControlClick = useCallback((view: ListView) => {
    dispatch(articlesActions.setView(view));
  }, [dispatch]);

  const onSortingTypeChange = useCallback((value: TSortingType) => {
    dispatch(sortArticlesActions.setSortingType(value));
    getArticles();
  }, [dispatch, getArticles]);

  const onSortingOrderChange = useCallback((value: TSortingOrder) => {
    dispatch(sortArticlesActions.setSortingOrder(value));
    getArticles();
  }, [dispatch, getArticles]);

  const debouncedSearch = useDebounce((value: string) => {
    dispatch(filterArticlesActions.setCurrentSearch(value));
    getArticles();
  }, DEBOUNCE_DELAY);

  const onSearchChange = useCallback((value: string) => {
    dispatch(filterArticlesActions.setSearch(value));
    debouncedSearch(value);
  }, [dispatch, debouncedSearch]);

  return (
    <section className={getClassNames('', {}, [className])}>
      <div className={style.row}>
        <ArticlesSorting
          type={sortingType}
          order={sortingOrder}
          onTypeChange={onSortingTypeChange}
          onOrderChange={onSortingOrderChange}
        />
        <ArticlesSearch
          className={style.search}
          search={search}
          onChange={onSearchChange}
        />
        <ListViewSwitcher
          activeControl={articleView}
          onControlClick={onViewControlClick}
        />
      </div>
      <div className={style.row}>
        <ArticlesFilterTabs />
      </div>
    </section>
  );
});
