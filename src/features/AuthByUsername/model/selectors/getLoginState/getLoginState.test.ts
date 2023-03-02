import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { LoginSchema } from '../../types/loginSchema';
import { getLoginState } from './getLoginState';

describe('getLoginState', () => {
  it('should return login slice state', () => {
    const LOGIN: LoginSchema = {
      username: 'gfhrtf',
      password: 'gfrghtr',
      isLoading: false,
      error: null,
    };

    const state: DeepPartial<StateSchema> = {
      login: LOGIN,
    };

    expect(getLoginState(state as StateSchema)).toEqual(LOGIN);
  });
});
