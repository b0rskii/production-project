import { createSlice } from '@reduxjs/toolkit';
import { UserSchema } from '../types/userSchema';

const initialState: UserSchema = {

};

export const NAME = 'user';

export const userSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
});

export const {
  actions: userActions,
  reducer: userReducer,
} = userSlice;
