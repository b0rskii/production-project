import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilterArticlesSchema } from '../types/filterArticlesSchema';

export const initialState: FilterArticlesSchema = {
  search: '',
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
