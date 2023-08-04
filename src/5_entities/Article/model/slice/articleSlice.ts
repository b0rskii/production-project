import { createSlice } from '@reduxjs/toolkit';
import { ArticleSchema } from '../types/articleSchema';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { ARTICLE_SLICE_NAME } from '../const';

export const initialState: ArticleSchema = {
  data: null,
  isLoading: false,
  error: null,
};

export const articleSlice = createSlice({
  name: ARTICLE_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticleById.pending, (state) => {
        state.error = null;
        state.data = null;
        state.isLoading = true;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.error = action.payload || null;
        state.isLoading = false;
      });
  },
});

export const {
  actions: articleActions,
  reducer: articleReducer,
} = articleSlice;
