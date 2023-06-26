import { SortingType, SortingOrder } from '../const';

export type TSortingType = keyof typeof SortingType;
export type TSortingOrder = keyof typeof SortingOrder;

export type SortArticlesSchema = {
  sortingType: TSortingType;
  sortingOrder: TSortingOrder;
};
