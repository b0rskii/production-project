import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createSearchParams } from 'react-router-dom';
import { SortArticlesSchema, TSortingOrder, TSortingType } from '../types/sortArticlesSchema';
import { SortingType, SortingOrder, SearchParam, SLICE_NAME } from '../const';

let sortingTypeParams: TSortingType | null = null;
let sortingOrderParams: TSortingOrder | null = null;

if (window) {
  const searchParams = createSearchParams(window.location.search);
  sortingTypeParams = searchParams.get(SearchParam.SORTING_TYPE) as TSortingType | null;
  sortingOrderParams = searchParams.get(SearchParam.SORTING_ORDER) as TSortingOrder | null;
}

export const initialState: SortArticlesSchema = {
  sortingType: sortingTypeParams ?? SortingType.DATE,
  sortingOrder: sortingOrderParams ?? SortingOrder.ASC,
};

export const sortArticlesSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setSortingType: (state, action: PayloadAction<TSortingType>) => {
      state.sortingType = action.payload;
    },
    setSortingOrder: (state, action: PayloadAction<TSortingOrder>) => {
      state.sortingOrder = action.payload;
    },
  },
});

export const {
  actions: sortArticlesActions,
  reducer: sortArticlesReducer,
} = sortArticlesSlice;
