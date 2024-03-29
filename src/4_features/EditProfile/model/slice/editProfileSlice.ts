import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '@/5_entities/Profile';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { EditProfileSchema } from '../types/editProfileSchema';
import { SLICE_NAME, ValidateProfileError } from '../const';

export const initialState: EditProfileSchema = {
  profileForm: null,
  isReadonly: true,
  isLoading: false,
  error: null,
  validateErrors: null,
};

export const editProfileSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    startEdit: (state, action: PayloadAction<Profile | null>) => {
      state.isReadonly = false;
      state.profileForm = action.payload;
    },
    cancelEdit: (state) => {
      state.isReadonly = true;
      state.validateErrors = null;
    },
    updateProfileForm: (state, action: PayloadAction<Profile>) => {
      state.profileForm = {
        ...state.profileForm,
        ...action.payload,
      };
    },
    setValidateError: (state, action: PayloadAction<ValidateProfileError[]>) => {
      state.validateErrors = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateProfileData.pending, (state) => {
        state.error = null;
        state.validateErrors = null;
        state.isLoading = true;
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.profileForm = action.payload;
        state.isReadonly = true;
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        const { payload } = action;
        state.validateErrors = payload?.validateError ?? null;
        state.error = payload?.serverError ?? null;
        state.isLoading = false;
      });
  },
});

export const {
  actions: editProfileActions,
  reducer: editProfileReducer,
} = editProfileSlice;
