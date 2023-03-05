import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from 'app/providers/StoreProvider';
import { NAME } from '../../slice/profileSlice';
import { Profile } from '../../types/profileSchema';

export const fetchProfileData = createAsyncThunk<Profile, undefined, ThunkAPI<string>>(
  `${NAME}/fetchProfileData`,
  async (_arg, { rejectWithValue, extra }) => {
    const { api } = extra;

    try {
      const { data } = await api.get<Profile>('/profile');

      if (!data) {
        throw new Error();
      }

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
