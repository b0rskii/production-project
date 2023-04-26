import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddCommentSchema } from '../types/addCommentSchema';

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
});

export const {
  actions: addCommentActions,
  reducer: addCommentReducer,
} = addCommentSlice;
