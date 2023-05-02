import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ArticlesSchema } from '../types/articlesSchema';
import { Article } from '../types/articleSchema';
import { fetchArticles } from '../services/fetchArticles/fetchArticles';

export const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article: Article) => article.id,
});

export const initialState = articlesAdapter.getInitialState<ArticlesSchema>({
  ids: [],
  entities: {},
  isLoading: false,
  error: null,
  view: 'tiles',
});

export const SLICE_NAME = 'articles';

export const articlesSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.error = null;
        articlesAdapter.removeAll(state);
        state.isLoading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        articlesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.error = action.payload || null;
        state.isLoading = false;
      });
  },
});

export const {
  actions: articlesActions,
  reducer: articlesReducer,
} = articlesSlice;
