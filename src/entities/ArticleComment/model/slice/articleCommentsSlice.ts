import { createSlice } from '@reduxjs/toolkit';
import { ArticleCommentsSchema } from '../types/articleCommentsSchema';
import { fetchArticleComments } from '../services/fetchArticleComments/fetchArticleComments';

export const initialState: ArticleCommentsSchema = {
  data: [],
  isLoading: false,
  error: null,
};

export const NAME = 'articleComments';

export const articleCommentsSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticleComments.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchArticleComments.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchArticleComments.rejected, (state, action) => {
        state.error = action.payload || null;
        state.isLoading = false;
      });
  },
});

export const {
  actions: articleCommentsActions,
  reducer: articleCommentsReducer,
} = articleCommentsSlice;
