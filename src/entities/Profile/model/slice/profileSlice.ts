import { createSlice } from '@reduxjs/toolkit';
import { ProfileSchema } from '../types/profileSchema';

const initialState: ProfileSchema = {
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
});

export const {
  actions: profileActions,
  reducer: profileReducer,
} = profileSlice;
