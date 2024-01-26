import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RatingSchema } from '../types/RatingSchema';
import { SLICE_NAME } from '../const';

export const initialState: RatingSchema = {
    
};

export const ratingSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    template: (state, action: PayloadAction<string>) => {

    },
  },
});

export const {
  actions: ratingActions,
  reducer: ratingReducer,
} = ratingSlice;
