import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ArticleComment, ArticleCommentsSchema } from '../types/articleCommentsSchema';
import { fetchArticleComments } from '../services/fetchArticleComments/fetchArticleComments';
import { SLICE_NAME } from '../const';

export const articleCommentsAdapter = createEntityAdapter<ArticleComment>({
  selectId: (comment: ArticleComment) => comment.id,
});

export const articleCommentsSlice = createSlice({
  name: SLICE_NAME,
  initialState: articleCommentsAdapter.getInitialState<ArticleCommentsSchema>({
    ids: [],
    entities: {},
    isLoading: false,
    error: null,
  }),
  reducers: {
    addComment: (state, action: PayloadAction<ArticleComment>) => {
      articleCommentsAdapter.setOne(state, action.payload);
    },
  },
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
