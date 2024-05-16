import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from '@/1_app/providers/StoreProvider';
import { ApiRoutes } from '@/6_shared/api';
import { LocalStorageKey } from '@/6_shared/const/localStorage';
import { SLICE_NAME } from '../const';
import { User } from '../types/userSchema';

export const updateJsonSettings = createAsyncThunk<
  undefined,
  undefined,
  ThunkAPI<string | null>
>(
  `${SLICE_NAME}/updateJsonSettings`,
  async (_, { rejectWithValue, getState, extra }) => {
    const { api } = extra;
    const state = getState();
    const userData = state.user.authData;

    if (!userData) {
      return rejectWithValue('error');
    }

    localStorage.setItem(LocalStorageKey.USER, JSON.stringify(userData));

    const { id, jsonSettings } = userData;

    try {
      const { data } = await api.patch<User>(`${ApiRoutes.USERS}/${id}`, {
        jsonSettings,
      });

      if (!data) {
        throw new Error();
      }

      return undefined;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);
