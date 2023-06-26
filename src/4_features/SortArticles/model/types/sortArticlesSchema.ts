import { SortingType, SortingOrder } from '../const';

export type TSortingType = (
  typeof SortingType.DATE | typeof SortingType.TITLE | typeof SortingType.VIEWS
);
export type TSortingOrder = typeof SortingOrder.ASC | typeof SortingOrder.DESC;

export type SortArticlesSchema = {
  sortingType: TSortingType;
  sortingOrder: TSortingOrder;
};
