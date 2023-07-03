import { createSlice } from '@reduxjs/toolkit';
import { EditArticleSchema } from '../types/editArticleSchema';

export const initialState: EditArticleSchema = {
  canEdit: false,
};

export const SLICE_NAME = 'editArticle';

export const editArticleSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
});

export const {
  actions: editArticleActions,
  reducer: editArticleReducer,
} = editArticleSlice;
