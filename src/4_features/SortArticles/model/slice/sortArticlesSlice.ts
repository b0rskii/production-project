import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SortArticlesSchema, TSortingOrder, TSortingType } from '../types/sortArticlesSchema';
import { SortingType, SortingOrder } from '../const';

export const initialState: SortArticlesSchema = {
  sortingType: SortingType.TITLE,
  sortingOrder: SortingOrder.ASC,
};

export const SLICE_NAME = 'sortArticles';

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
