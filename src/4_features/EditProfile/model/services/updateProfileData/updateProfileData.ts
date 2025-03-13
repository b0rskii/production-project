import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from '@/1_app/providers/StoreProvider';
import { Profile, profileQuery } from '@/5_entities/Profile';
import { toastifyStore } from '@/6_shared/ui/Toastify';
import { ApiRoutes } from '@/6_shared/api';
import { StatusMessage } from '@/6_shared/types/common';
import { validateProfileData } from '../validateProfile/validateProfile';
import { SLICE_NAME, ValidateProfileError } from '../../const';
import { userStore } from '@/5_entities/User';

export const updateProfileData = createAsyncThunk<
  Profile,
  StatusMessage,
  ThunkAPI<{
    validateError: ValidateProfileError[] | null;
    serverError: string | null;
  }>
>(
  `${SLICE_NAME}/updateProfileData`,
  async (statusMessage, { rejectWithValue, getState, extra }) => {
    const { api } = extra;
    const { userId } = userStore;
    const profileForm = getState().editProfile?.profileForm;
    const profileErrors = validateProfileData(profileForm);

    if (profileErrors.length) {
      return rejectWithValue({
        validateError: profileErrors,
        serverError: null,
      });
    }

    try {
      const { data } = await api.put<Profile>(
        `${ApiRoutes.PROFILES}/${userId}`,
        profileForm,
      );

      if (!data) {
        throw new Error();
      }

      profileQuery.setData(data);
      toastifyStore.notify(statusMessage.success);

      return data;
    } catch (error) {
      toastifyStore.notifyError(statusMessage.error);
      return rejectWithValue({ validateError: null, serverError: 'error' });
    }
  },
);
