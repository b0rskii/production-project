import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setFeatureFlags } from '@/6_shared/utils/featureFlags';
import { Theme } from '@/6_shared/utils/theme';
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
      const user = action.payload;
      state.authData = user;
      setFeatureFlags(user?.features);
    },
    logout: (state) => {
      state.authData = null;
    },
    toggleTheme: (state) => {
      if (state.authData && state.authData.jsonSettings) {
        const currentTheme = state.authData.jsonSettings.theme;

        state.authData.jsonSettings.theme =
          currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
      }
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
