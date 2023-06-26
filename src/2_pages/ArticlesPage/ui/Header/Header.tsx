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
} from '4_features/SortArticles';
import { articlesActions, articlesSelectors } from '5_entities/Article';
import { getClassNames } from '6_shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from '6_shared/utils/redux';
import { ListView, ListViewSwitcher } from '6_shared/ui/ListViewSwitcher';
import style from './Header.module.scss';

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

  const onViewControlClick = useCallback((view: ListView) => {
    dispatch(articlesActions.setView(view));
  }, [dispatch]);

  const onSortingTypeChange = useCallback((value: TSortingType) => {
    dispatch(sortArticlesActions.setSortingType(value));
  }, [dispatch]);

  const onSortingOrderChange = useCallback((value: TSortingOrder) => {
    dispatch(sortArticlesActions.setSortingOrder(value));
  }, [dispatch]);

  if (!articlesTotal) {
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
      <ListViewSwitcher
        activeControl={articleView}
        onControlClick={onViewControlClick}
      />
    </section>
  );
});
