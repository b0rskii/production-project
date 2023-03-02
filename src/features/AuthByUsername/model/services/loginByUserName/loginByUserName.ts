import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { StateSchema } from 'app/providers/StoreProvider';
import { User, userActions } from 'entities/User';
import { LocalStorageKey } from 'shared/const/localStorage';
import { NAME } from '../../slice/loginSlice';

type ThunkAPI = {
  state: StateSchema;
  rejectValue: string;
};

type LoginByUsernameArg = {
  username: string;
  password: string;
};

export const loginByUserName = createAsyncThunk<User, LoginByUsernameArg, ThunkAPI>(
  `${NAME}/loginByUserName`,
  async ({ username, password }, { rejectWithValue, dispatch }) => {
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
      return rejectWithValue('error');
    }
  },
);
