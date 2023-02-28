import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { StateSchema } from 'app/providers/StoreProvider';
import { User, userActions } from 'entities/User';
import { i18n } from 'shared/utils/i18n';
import { LocalStorageKey } from 'shared/const/localStorage';
import { NAME } from '../../slice/loginSlice';

type ThunkAPI = {
  state: StateSchema;
  rejectValue: string;
};

export const loginByUserName = createAsyncThunk<User, undefined, ThunkAPI>(
  `${NAME}/loginByUserName`,
  async (_args, { getState, rejectWithValue, dispatch }) => {
    const { username, password } = getState().login;

    try {
      const { data } = await axios.post<User>(
        'http://localhost:8000/login',
        { username, password },
      );

      if (!data) {
        throw new Error();
      }

      localStorage.setItem(LocalStorageKey.USER, JSON.stringify(data));
      dispatch(userActions.setAuthData(data));

      return data;
    } catch (error) {
      return rejectWithValue(i18n.t('Неверный логин или пароль'));
    }
  },
);
