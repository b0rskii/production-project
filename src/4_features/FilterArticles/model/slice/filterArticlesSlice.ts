import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createSearchParams } from 'react-router-dom';
import { ArticleType } from '5_entities/Article';
import { FilterArticlesSchema } from '../types/filterArticlesSchema';
import { SearchParam } from '../const';

let searchFilterParams: string | null = null;
let typeFilterParams: ArticleType | null = null;

if (window) {
  const searchParams = createSearchParams(window.location.search);
  searchFilterParams = searchParams.get(SearchParam.SEARCH);
  typeFilterParams = searchParams.get(SearchParam.TYPE) as ArticleType | null;
}

export const initialState: FilterArticlesSchema = {
  search: searchFilterParams ?? '',
  type: typeFilterParams ?? ArticleType.ALL,
};

export const SLICE_NAME = 'filterArticles';

export const filterArticlesSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload;
    },
  },
});

export const {
  actions: filterArticlesActions,
  reducer: filterArticlesReducer,
} = filterArticlesSlice;
