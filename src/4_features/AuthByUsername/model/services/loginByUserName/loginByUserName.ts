import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from '@/1_app/providers/StoreProvider';
import { User, userActions } from '@/5_entities/User';
import { LocalStorageKey } from '@/6_shared/const/localStorage';
import { ApiRoutes } from '@/6_shared/api';
import { SLICE_NAME } from '../../const';

type LoginByUsernameArg = {
  username: string;
  password: string;
};

export const loginByUserName = createAsyncThunk<User, LoginByUsernameArg, ThunkAPI<string>>(
  `${SLICE_NAME}/loginByUserName`,
  async (authData, { rejectWithValue, dispatch, extra }) => {
    const { api } = extra;

    try {
      const { data } = await api.post<User>(ApiRoutes.LOGIN, authData);

      if (!data) {
        throw new Error();
      }

      localStorage.setItem(LocalStorageKey.USER, JSON.stringify(data));
      dispatch(userActions.setAuthData(data));

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
