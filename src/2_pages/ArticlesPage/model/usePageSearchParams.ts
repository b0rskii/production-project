/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortArticlesSearchParam, TSortingOrder, TSortingType } from '4_features/SortArticles';
import { FilterArticlesSearchParam } from '4_features/FilterArticles';

export const usePageSearchParams = (
  sortingType: TSortingType,
  sortingOrder: TSortingOrder,
  search: string,
) => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  useEffect(() => {
    setSortingTypeParams(sortingType);
  }, [sortingType]);

  useEffect(() => {
    setSortingOrderParams(sortingOrder);
  }, [sortingOrder]);

  useEffect(() => {
    setSearchFilterParams(search);
  }, []);

  return { setSearchFilterParams };
};
