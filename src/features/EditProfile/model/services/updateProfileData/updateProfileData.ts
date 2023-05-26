import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from 'app/providers/StoreProvider';
import { Profile, profileActions } from 'entities/Profile';
import { notificationsActions } from 'shared/utils/notifications';
import { ApiRoutes } from 'shared/api';
import { StatusMessage } from 'shared/types/common';
import { NAME, editProfileActions } from '../../slice/editProfileSlice';
import { validateProfileData } from '../validateProfile/validateProfile';

export const updateProfileData = createAsyncThunk<
  Profile,
  StatusMessage,
  ThunkAPI<string | null>
>(
  `${NAME}/updateProfileData`,
  async (statusMessage, { rejectWithValue, getState, extra, dispatch }) => {
    const { api } = extra;
    const profileForm = getState().editProfile?.profileForm;
    const userId = getState().user.authData?.id;
    const profileErrors = validateProfileData(profileForm);

    if (profileErrors.length) {
      dispatch(editProfileActions.setValidateError(profileErrors));
      return rejectWithValue(null);
    }

    try {
      const { data } = await api.put<Profile>(`${ApiRoutes.PROFILES}/${userId}`, profileForm);

      if (!data) {
        throw new Error();
      }

      dispatch(profileActions.setProfile(data));
      dispatch(notificationsActions.notify(statusMessage.success));

      return data;
    } catch (error) {
      dispatch(notificationsActions.notifyError(statusMessage.error));
      return rejectWithValue('error');
    }
  },
);
