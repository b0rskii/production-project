import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from '1_app/providers/StoreProvider';
import { Profile, profileActions } from '5_entities/Profile';
import { toastifyActions } from '6_shared/ui/Toastify';
import { ApiRoutes } from '6_shared/api';
import { StatusMessage } from '6_shared/types/common';
import { validateProfileData } from '../validateProfile/validateProfile';
import { SLICE_NAME, ValidateProfileError } from '../../const';

export const updateProfileData = createAsyncThunk<
  Profile,
  StatusMessage,
  ThunkAPI<{
    validateError: ValidateProfileError[] | null,
    serverError: string | null,
  }>
>(
  `${SLICE_NAME}/updateProfileData`,
  async (statusMessage, { rejectWithValue, getState, extra, dispatch }) => {
    const { api } = extra;
    const profileForm = getState().editProfile?.profileForm;
    const userId = getState().user.authData?.id;
    const profileErrors = validateProfileData(profileForm);

    if (profileErrors.length) {
      return rejectWithValue({ validateError: profileErrors, serverError: null });
    }

    try {
      const { data } = await api.put<Profile>(`${ApiRoutes.PROFILES}/${userId}`, profileForm);

      if (!data) {
        throw new Error();
      }

      dispatch(profileActions.setProfile(data));
      dispatch(toastifyActions.notify(statusMessage.success));

      return data;
    } catch (error) {
      dispatch(toastifyActions.notifyError(statusMessage.error));
      return rejectWithValue({ validateError: null, serverError: 'error' });
    }
  },
);
