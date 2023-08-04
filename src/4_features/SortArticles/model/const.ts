export const SLICE_NAME = 'sortArticles';

export const SortingType = {
  VIEWS: 'views',
  DATE: 'createdAt',
  TITLE: 'title',
} as const;

export const SortingOrder = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const SearchParam = {
  SORTING_TYPE: 'sorting',
  SORTING_ORDER: 'order',
} as const;
