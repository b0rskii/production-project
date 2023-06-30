import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RecommendedArticlesSchema } from '../types/recommendedArticlesSchema';
import { Article } from '../types/articleSchema';
import {
  fetchRecommendedArticles,
} from '../services/fetchRecommendedArticles/fetchRecommendedArticles';

export const ARTICLES_LIMIT = 4;

export const recommendedArticlesAdapter = createEntityAdapter<Article>({
  selectId: (article: Article) => article.id,
});

export const initialState = recommendedArticlesAdapter.getInitialState<RecommendedArticlesSchema>({
  ids: [],
  entities: {},
  isLoading: false,
  error: null,
  limit: ARTICLES_LIMIT,
});

export const SLICE_NAME = 'recommendedArticles';

export const recommendedArticlesSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(fetchRecommendedArticles.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchRecommendedArticles.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        recommendedArticlesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchRecommendedArticles.rejected, (state, action) => {
        state.error = action.payload || null;
        state.isLoading = false;
      });
  },
});

export const {
  actions: recommendedArticlesActions,
  reducer: recommendedArticlesReducer,
} = recommendedArticlesSlice;
