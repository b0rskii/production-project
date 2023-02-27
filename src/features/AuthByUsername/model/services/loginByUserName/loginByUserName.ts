import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { StateSchema } from 'app/providers/StoreProvider';
import { User } from 'entities/User';
import { NAME } from '../../slice/loginSlice';

type ThunkAPI = {
  state: StateSchema;
  rejectValue: string;
};

export const loginByUserName = createAsyncThunk<User, undefined, ThunkAPI>(
  `${NAME}/loginByUserName`,
  async (_args, { getState, rejectWithValue }) => {
    const { username, password } = getState().login;

    try {
      const { data } = await axios.post('http://localhost:8000/login', { username, password });

      if (!data) {
        throw new Error();
      }

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
