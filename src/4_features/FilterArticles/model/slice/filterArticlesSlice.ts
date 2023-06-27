import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createSearchParams } from 'react-router-dom';
import { FilterArticlesSchema } from '../types/filterArticlesSchema';
import { SearchParam } from '../const';

let searchFilterParams: string | null = null;

if (window) {
  const searchParams = createSearchParams(window.location.search);
  searchFilterParams = searchParams.get(SearchParam.SEARCH);
}

export const initialState: FilterArticlesSchema = {
  search: searchFilterParams ?? '',
};

export const SLICE_NAME = 'filterArticles';

export const filterArticlesSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const {
  actions: filterArticlesActions,
  reducer: filterArticlesReducer,
} = filterArticlesSlice;
