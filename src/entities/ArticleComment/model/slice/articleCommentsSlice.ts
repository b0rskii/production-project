import { createSlice } from '@reduxjs/toolkit';
import { ArticleCommentsSchema } from '../types/articleCommentsSchema';

export const initialState: ArticleCommentsSchema = {
  comments: [],
  isLoading: false,
  error: null,
};

export const articleCommentsSlice = createSlice({
  name: 'articleComments',
  initialState,
  reducers: {},
});

export const {
  actions: articleCommentsActions,
  reducer: articleCommentsReducer,
} = articleCommentsSlice;
