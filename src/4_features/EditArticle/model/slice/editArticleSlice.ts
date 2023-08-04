import { createSlice } from '@reduxjs/toolkit';
import { EditArticleSchema } from '../types/editArticleSchema';
import { SLICE_NAME } from '../const';

export const initialState: EditArticleSchema = {
  canEdit: false,
};

export const editArticleSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
});

export const {
  actions: editArticleActions,
  reducer: editArticleReducer,
} = editArticleSlice;
