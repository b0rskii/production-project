import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from 'entities/Profile';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { EditProfileSchema } from '../types/editProfileSchema';

export const initialState: EditProfileSchema = {
  profileForm: null,
  isReadonly: true,
  isLoading: false,
  error: null,
};

export const NAME = 'editProfile';

export const editProfileSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    startEdit: (state, action: PayloadAction<Profile | null>) => {
      state.isReadonly = false;
      state.profileForm = action.payload;
    },
    cancelEdit: (state) => {
      state.isReadonly = true;
    },
    updateProfileForm: (state, action: PayloadAction<Profile>) => {
      state.profileForm = {
        ...state.profileForm,
        ...action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateProfileData.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.profileForm = action.payload;
        state.isReadonly = true;
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.error = action.payload || null;
        state.isLoading = false;
      });
  },
});

export const {
  actions: editProfileActions,
  reducer: editProfileReducer,
} = editProfileSlice;
