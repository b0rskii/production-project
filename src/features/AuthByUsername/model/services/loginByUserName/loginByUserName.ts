import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from 'app/providers/StoreProvider';
import { User, userActions } from 'entities/User';
import { LocalStorageKey } from 'shared/const/localStorage';
import { ApiRoutes } from 'shared/api';
import { NAME } from '../../slice/loginSlice';

type LoginByUsernameArg = {
  username: string;
  password: string;
};

export const loginByUserName = createAsyncThunk<User, LoginByUsernameArg, ThunkAPI<string>>(
  `${NAME}/loginByUserName`,
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
