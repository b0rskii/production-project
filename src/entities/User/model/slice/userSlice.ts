import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/userSchema';

const initialState: UserSchema = {
  authData: null,
  isInited: false,
};

export const NAME = 'user';

export const userSlice = createSlice({
  name: NAME,
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
