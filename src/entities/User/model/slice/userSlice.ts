import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/userSchema';

const initialState: UserSchema = {
  authData: null,
};

export const NAME = 'user';

export const userSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
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
