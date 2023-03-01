import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginByUserName } from '../services/loginByUserName/loginByUserName';
import { LoginSchema } from '../types/loginSchema';

export const initialState: LoginSchema = {
  username: '',
  password: '',
  isLoading: false,
  error: null,
};

export const NAME = 'login';

export const loginSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginByUserName.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(loginByUserName.fulfilled, (state) => {
        state.error = null;
        state.isLoading = false;
      })
      .addCase(loginByUserName.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const {
  actions: loginActions,
  reducer: loginReducer,
} = loginSlice;
