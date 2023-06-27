import { PropsWithChildren, memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  ArticlesSorting,
  SORT_ARTICLES_SLICE,
  sortArticlesReducer,
  sortArticlesActions,
  sortArticlesSelectors,
  TSortingType,
  TSortingOrder,
} from '4_features/SortArticles';
import {
  ArticlesSearch,
  FILTER_ARTICLES_SLICE,
  filterArticlesReducer,
  filterArticlesActions,
  filterArticlesSelectors,
} from '4_features/FilterArticles';
import { articlesActions, articlesSelectors, fetchArticles } from '5_entities/Article';
import { getClassNames } from '6_shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from '6_shared/utils/redux';
import { useDebounce } from '6_shared/utils/debounce';
import { ListView, ListViewSwitcher } from '6_shared/ui/ListViewSwitcher';
import { usePageSearchParams } from '../../model/usePageSearchParams';
import style from './Header.module.scss';

const DEBOUNCE_DELAY = 500;

let isInit = true;

type HeaderProps = PropsWithChildren<{
  className?: string;
}>;

export const Header = memo((props: HeaderProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const articlesTotal = useSelector(articlesSelectors.getArticles.selectTotal);
  const articleView = useSelector(articlesSelectors.getView);

  useAsyncReducer(SORT_ARTICLES_SLICE, sortArticlesReducer, false);
  const sortingType = useSelector(sortArticlesSelectors.getSortingType);
  const sortingOrder = useSelector(sortArticlesSelectors.getSortingOrder);

  useAsyncReducer(FILTER_ARTICLES_SLICE, filterArticlesReducer, false);
  const search = useSelector(filterArticlesSelectors.getSearch);

  const { setSearchFilterParams } = usePageSearchParams(sortingType, sortingOrder, search);

  useEffect(() => {
    isInit = false;
  }, []);

  const onViewControlClick = useCallback((view: ListView) => {
    dispatch(articlesActions.setView(view));
  }, [dispatch]);

  const onSortingTypeChange = useCallback((value: TSortingType) => {
    dispatch(sortArticlesActions.setSortingType(value));
    dispatch(articlesActions.resetArticles());
    dispatch(fetchArticles());
  }, [dispatch]);

  const onSortingOrderChange = useCallback((value: TSortingOrder) => {
    dispatch(sortArticlesActions.setSortingOrder(value));
    dispatch(articlesActions.resetArticles());
    dispatch(fetchArticles());
  }, [dispatch]);

  const debouncedSearch = useDebounce((value: string) => {
    dispatch(articlesActions.resetArticles());
    dispatch(fetchArticles());
    setSearchFilterParams(value);
  }, DEBOUNCE_DELAY);

  const onSearchChange = useCallback((value: string) => {
    dispatch(filterArticlesActions.setSearch(value));
    debouncedSearch(value);
  }, [dispatch, debouncedSearch]);

  if (isInit && !articlesTotal) {
    return null;
  }

  return (
    <section className={getClassNames(style.header, {}, [className])}>
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
    </section>
  );
});
