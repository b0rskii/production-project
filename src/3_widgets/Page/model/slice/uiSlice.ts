import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UISchema } from '../types/uiSchema';

export const initialState: UISchema = {
  scrollData: {},
};

export const SLICE_NAME = 'ui';

export const uiSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setScrollData: (state, action: PayloadAction<{ path: string, scrollPosition: number }>) => {
      const { path, scrollPosition } = action.payload;
      state.scrollData[path] = scrollPosition;
    },
  },
});

export const {
  actions: uiActions,
  reducer: uiReducer,
} = uiSlice;
