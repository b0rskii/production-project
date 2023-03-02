import { DeepPartial } from '@reduxjs/toolkit';
import { loginByUserName } from '../services/loginByUserName/loginByUserName';
import { LoginSchema } from '../types/loginSchema';
import { loginReducer, loginActions } from './loginSlice';

describe('loginSlice', () => {
  it('setUsername action', () => {
    expect(loginReducer({ username: '' } as LoginSchema, loginActions.setUsername('123')))
      .toEqual({ username: '123' });
  });

  it('setPassword action', () => {
    expect(loginReducer({ password: '' } as LoginSchema, loginActions.setPassword('123')))
      .toEqual({ password: '123' });
  });

  it('loginByUserName pending', () => {
    const state: DeepPartial<LoginSchema> = {
      isLoading: false,
      error: 'error',
    };

    expect(loginReducer(state as LoginSchema, loginByUserName.pending))
      .toEqual({
        isLoading: true,
        error: null,
      });
  });

  it('loginByUserName fulfilled', () => {
    const state: DeepPartial<LoginSchema> = {
      isLoading: true,
      error: 'error',
    };

    expect(loginReducer(state as LoginSchema, loginByUserName.fulfilled))
      .toEqual({
        isLoading: false,
        error: null,
      });
  });

  it('loginByUserName rejected', () => {
    const payload = 'error';

    const state: DeepPartial<LoginSchema> = {
      isLoading: true,
      error: null,
    };

    expect(loginReducer(state as LoginSchema, { type: loginByUserName.rejected.type, payload }))
      .toEqual({
        isLoading: false,
        error: payload,
      });
  });
});
