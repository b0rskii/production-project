import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NotificationsSchema } from '../types/notificationsSchema';

export const initialState: NotificationsSchema = {
  data: [],
};

export const SLICE_NAME = 'notifications';

export const notificationsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    notify: (state, action: PayloadAction<string>) => {
      state.data.push({ text: action.payload });
    },
    removeFirstNotification: (state) => {
      state.data.splice(0, 1);
    },
  },
});

export const {
  actions: notificationsActions,
  reducer: notificationsReducer,
} = notificationsSlice;
