import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/userSchema';
import { SLICE_NAME } from '../const';

const initialState: UserSchema = {
  authData: null,
  isInited: false,
};

export const userSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    initAuthData: (state) => {
      state.isInited = true;
    },
    setAuthData: (state, action: PayloadAction<User | null>) => {
      state.authData = action.payload;
    },
    logout: (state) => {
      state.authData = null;
    },
  },
});

export const {
  actions: userActions,
  reducer: userReducer,
} = userSlice;
