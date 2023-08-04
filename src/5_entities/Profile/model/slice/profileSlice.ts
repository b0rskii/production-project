import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { Profile, ProfileSchema } from '../types/profileSchema';
import { SLICE_NAME } from '../const';

export const initialState: ProfileSchema = {
  profile: null,
  isLoading: false,
  error: null,
};

export const profileSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.error = null;
        state.profile = null;
        state.isLoading = true;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.error = action.payload || null;
        state.isLoading = false;
      });
  },
});

export const {
  actions: profileActions,
  reducer: profileReducer,
} = profileSlice;
