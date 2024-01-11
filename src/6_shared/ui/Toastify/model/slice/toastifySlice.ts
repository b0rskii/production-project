import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ToastifySchema } from '../types/toastifySchema';

export const initialState: ToastifySchema = {
  data: [],
};

export const SLICE_NAME = 'toastify';

export const toastifySlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    notify: (state, action: PayloadAction<string>) => {
      state.data.push({
        text: action.payload,
        type: 'success',
      });
    },
    notifyError: (state, action: PayloadAction<string>) => {
      state.data.push({
        text: action.payload,
        type: 'error',
      });
    },
    removeFirstNotification: (state) => {
      state.data.splice(0, 1);
    },
  },
});

export const {
  actions: toastifyActions,
  reducer: toastifyReducer,
} = toastifySlice;
