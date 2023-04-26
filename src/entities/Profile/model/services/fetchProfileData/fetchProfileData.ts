import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from 'app/providers/StoreProvider';
import { NAME } from '../../slice/profileSlice';
import { Profile } from '../../types/profileSchema';

export const fetchProfileData = createAsyncThunk<Profile, string, ThunkAPI<string>>(
  `${NAME}/fetchProfileData`,
  async (profileId, { rejectWithValue, extra }) => {
    const { api } = extra;

    try {
      const { data } = await api.get<Profile>(`/profiles/${profileId}`);

      if (!data) {
        throw new Error();
      }

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
