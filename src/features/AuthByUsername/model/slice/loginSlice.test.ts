import { loginByUserName } from '../services/loginByUserName/loginByUserName';
import { LoginSchema } from '../types/loginSchema';
import { loginReducer, loginActions } from './loginSlice';

const loginState: LoginSchema = {
  username: '',
  password: '',
  isLoading: false,
  error: null,
};

describe('loginSlice', () => {
  it('setUsername action', () => {
    expect(loginReducer(loginState, loginActions.setUsername('123')))
      .toEqual({
        ...loginState,
        username: '123',
      });
  });

  it('setPassword action', () => {
    expect(loginReducer(loginState, loginActions.setPassword('123')))
      .toEqual({
        ...loginState,
        password: '123',
      });
  });

  it('should work with empty state', () => {
    expect(loginReducer(undefined, loginActions.setUsername('123')))
      .toEqual({
        ...loginState,
        username: '123',
      });
  });

  it('loginByUserName pending', () => {
    const state: LoginSchema = {
      ...loginState,
      isLoading: false,
      error: 'error',
    };

    expect(loginReducer(loginState, loginByUserName.pending))
      .toEqual({
        ...state,
        isLoading: true,
        error: null,
      });
  });

  it('loginByUserName fulfilled', () => {
    const state: LoginSchema = {
      ...loginState,
      isLoading: true,
      error: 'error',
    };

    expect(loginReducer(loginState, loginByUserName.fulfilled))
      .toEqual({
        ...state,
        isLoading: false,
        error: null,
      });
  });

  it('loginByUserName rejected', () => {
    const payload = 'error';

    const state: LoginSchema = {
      ...loginState,
      isLoading: true,
      error: null,
    };

    expect(loginReducer(loginState, { type: loginByUserName.rejected.type, payload }))
      .toEqual({
        ...state,
        isLoading: false,
        error: payload,
      });
  });
});
