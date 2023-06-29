/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  SortArticlesSearchParam,
  TSortingOrder,
  TSortingType,
  sortArticlesSelectors,
} from '4_features/SortArticles';
import { FilterArticlesSearchParam, filterArticlesSelectors } from '4_features/FilterArticles';
import { ArticleType } from '5_entities/Article';

export const UrlSearchParamsSync = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortingType = useSelector(sortArticlesSelectors.getSortingType);
  const sortingOrder = useSelector(sortArticlesSelectors.getSortingOrder);
  const currentSearch = useSelector(filterArticlesSelectors.getCurrentSearch);
  const type = useSelector(filterArticlesSelectors.getType);

  const setSortingTypeParams = useCallback((value: TSortingType) => {
    searchParams.set(SortArticlesSearchParam.SORTING_TYPE, value);
    setSearchParams(searchParams, { replace: true });
  }, []);

  const setSortingOrderParams = useCallback((value: TSortingOrder) => {
    searchParams.set(SortArticlesSearchParam.SORTING_ORDER, value);
    setSearchParams(searchParams, { replace: true });
  }, []);

  const setSearchFilterParams = useCallback((value: string) => {
    if (value.length) {
      searchParams.set(FilterArticlesSearchParam.SEARCH, value);
    } else {
      searchParams.delete(FilterArticlesSearchParam.SEARCH);
    }
    setSearchParams(searchParams, { replace: true });
  }, []);

  const setTypeFilterParams = useCallback((value: ArticleType) => {
    if (value === ArticleType.ALL) {
      searchParams.delete(FilterArticlesSearchParam.TYPE);
      setSearchParams(searchParams, { replace: true });
      return;
    }
    searchParams.set(FilterArticlesSearchParam.TYPE, value);
    setSearchParams(searchParams, { replace: true });
  }, []);

  useEffect(() => {
    setSortingTypeParams(sortingType);
  }, [sortingType]);

  useEffect(() => {
    setSortingOrderParams(sortingOrder);
  }, [sortingOrder]);

  useEffect(() => {
    setSearchFilterParams(currentSearch);
  }, [currentSearch]);

  useEffect(() => {
    setTypeFilterParams(type);
  }, [type]);

  return null;
};
