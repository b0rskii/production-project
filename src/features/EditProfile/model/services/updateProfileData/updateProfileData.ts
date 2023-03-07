import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from 'app/providers/StoreProvider';
import { Profile, profileActions } from 'entities/Profile';
import { NAME } from '../../slice/editProfileSlice';

export const updateProfileData = createAsyncThunk<Profile, undefined, ThunkAPI<string>>(
  `${NAME}/updateProfileData`,
  async (_arg, { rejectWithValue, getState, extra, dispatch }) => {
    const { api } = extra;
    const profileForm = getState().editProfile?.profileForm;

    try {
      const { data } = await api.put<Profile>('/profile', profileForm);

      dispatch(profileActions.setProfile(data));

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
