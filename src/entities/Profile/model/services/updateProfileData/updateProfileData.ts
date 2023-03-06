import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from 'app/providers/StoreProvider';
import { NAME } from '../../slice/profileSlice';
import { Profile } from '../../types/profileSchema';

export const updateProfileData = createAsyncThunk<Profile, undefined, ThunkAPI<string>>(
  `${NAME}/updateProfileData`,
  async (_arg, { rejectWithValue, getState, extra }) => {
    const { api } = extra;
    const profileForm = getState().profile?.form;

    try {
      const { data } = await api.put<Profile>('/profile', profileForm);
      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
