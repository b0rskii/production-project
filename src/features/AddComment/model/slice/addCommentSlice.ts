import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddCommentSchema } from '../types/addCommentSchema';
import { sendArticleComment } from '../services/sendArticleComment/sendArticleComment';

export const initialState: AddCommentSchema = {
  text: '',
  isLoading: false,
  error: null,
};

export const SLICE_NAME = 'addComment';

export const addCommentSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendArticleComment.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(sendArticleComment.fulfilled, (state) => {
        state.error = null;
        state.isLoading = false;
        state.text = '';
      })
      .addCase(sendArticleComment.rejected, (state, action) => {
        state.error = action.payload || null;
        state.isLoading = false;
      });
  },
});

export const {
  actions: addCommentActions,
  reducer: addCommentReducer,
} = addCommentSlice;
