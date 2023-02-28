import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocalStorageKey } from 'shared/const/localStorage';
import { User, UserSchema } from '../types/userSchema';

const authData = JSON.parse(localStorage.getItem(LocalStorageKey.USER));

const initialState: UserSchema = {
  authData,
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
      state.authData = undefined;
      localStorage.removeItem(LocalStorageKey.USER);
    },
  },
});

export const {
  actions: userActions,
  reducer: userReducer,
} = userSlice;
