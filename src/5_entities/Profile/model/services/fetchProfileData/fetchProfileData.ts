import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from '1_app/providers/StoreProvider';
import { ApiRoutes } from '6_shared/api';
import { SLICE_NAME } from '../../const';
import { Profile } from '../../types/profileSchema';

export const fetchProfileData = createAsyncThunk<Profile, string, ThunkAPI<string>>(
  `${SLICE_NAME}/fetchProfileData`,
  async (profileId, { rejectWithValue, extra }) => {
    const { api } = extra;

    try {
      const { data } = await api.get<Profile>(`${ApiRoutes.PROFILES}/${profileId}`);

      if (!data) {
        throw new Error();
      }

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
