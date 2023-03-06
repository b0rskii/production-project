import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { Profile, ProfileSchema } from '../types/profileSchema';

export const initialState: ProfileSchema = {
  profile: null,
  form: null,
  isReadonly: true,
  isLoading: false,
  error: null,
};

export const NAME = 'profile';

export const profileSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    startEdit: (state) => {
      state.isReadonly = false;
      state.form = state.profile;
    },
    cancelEdit: (state) => {
      state.isReadonly = true;
      state.form = null;
    },
    updateProfileForm: (state, action: PayloadAction<Profile>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
  },
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
        state.error = action.payload || null;
        state.isLoading = false;
      })
      .addCase(updateProfileData.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.profile = action.payload;
        state.isReadonly = true;
        state.form = null;
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.error = action.payload || null;
        state.isLoading = false;
      });
  },
});

export const {
  actions: profileActions,
  reducer: profileReducer,
} = profileSlice;
