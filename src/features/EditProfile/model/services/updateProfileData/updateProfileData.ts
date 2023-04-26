import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from 'app/providers/StoreProvider';
import { Profile, profileActions } from 'entities/Profile';
import { NAME, editProfileActions } from '../../slice/editProfileSlice';
import { validateProfileData } from '../validateProfile/validateProfile';

export const updateProfileData = createAsyncThunk<
  Profile,
  undefined,
  ThunkAPI<string | null>
>(
  `${NAME}/updateProfileData`,
  async (_arg, { rejectWithValue, getState, extra, dispatch }) => {
    const { api } = extra;
    const profileForm = getState().editProfile?.profileForm;
    const userId = getState().user.authData?.id;
    const profileErrors = validateProfileData(profileForm);

    if (profileErrors.length) {
      dispatch(editProfileActions.setValidateError(profileErrors));
      return rejectWithValue(null);
    }

    try {
      const { data } = await api.put<Profile>(`/profiles/${userId}`, profileForm);

      if (!data) {
        throw new Error();
      }

      dispatch(profileActions.setProfile(data));

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
