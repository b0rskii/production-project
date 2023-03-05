import { createSlice } from '@reduxjs/toolkit';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { ProfileSchema } from '../types/profileSchema';

export const initialState: ProfileSchema = {
  profile: null,
  isReadonly: true,
  isLoading: false,
  error: null,
};

export const NAME = 'profile';

export const profileSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const {
  actions: profileActions,
  reducer: profileReducer,
} = profileSlice;
