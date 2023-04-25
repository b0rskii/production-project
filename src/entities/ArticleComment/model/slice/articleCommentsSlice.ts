import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ArticleComment, ArticleCommentsSchema } from '../types/articleCommentsSchema';
import { fetchArticleComments } from '../services/fetchArticleComments/fetchArticleComments';

export const articleCommentsAdapter = createEntityAdapter<ArticleComment>({
  selectId: (comment: ArticleComment) => comment.id,
});

export const NAME = 'articleComments';

export const articleCommentsSlice = createSlice({
  name: NAME,
  initialState: articleCommentsAdapter.getInitialState<ArticleCommentsSchema>({
    ids: [],
    entities: {},
    isLoading: false,
    error: null,
  }),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticleComments.pending, (state) => {
        state.error = null;
        articleCommentsAdapter.removeAll(state);
        state.isLoading = true;
      })
      .addCase(fetchArticleComments.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        articleCommentsAdapter.setAll(state, action.payload);
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
