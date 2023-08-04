import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from '1_app/providers/StoreProvider';
import { Profile, profileActions } from '5_entities/Profile';
import { notificationsActions } from '6_shared/utils/notifications';
import { ApiRoutes } from '6_shared/api';
import { StatusMessage } from '6_shared/types/common';
import { editProfileActions } from '../../slice/editProfileSlice';
import { validateProfileData } from '../validateProfile/validateProfile';
import { SLICE_NAME } from '../../const';

export const updateProfileData = createAsyncThunk<
  Profile,
  StatusMessage,
  ThunkAPI<string | null>
>(
  `${SLICE_NAME}/updateProfileData`,
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
