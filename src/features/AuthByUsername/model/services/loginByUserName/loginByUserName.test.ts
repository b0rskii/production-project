import { testAsyncThunk } from 'shared/utils/tests';
import { User, userActions } from 'entities/User';
import { loginByUserName } from './loginByUserName';

describe('loginByUserName', () => {
  it('fulfilled', async () => {
    const RESPONSE_DATA: User = { id: '1', name: 'user' };

    const thunk = testAsyncThunk(loginByUserName);

    thunk.api.post.mockReturnValue(
      Promise.resolve({ data: RESPONSE_DATA }),
    );

    const result = await thunk.callThunk({ username: '123', password: '123' });

    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(RESPONSE_DATA));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(result.payload).toEqual(RESPONSE_DATA);
  });

  it('rejected', async () => {
    const thunk = testAsyncThunk(loginByUserName);

    thunk.api.post.mockReturnValue(
      Promise.resolve({ status: 403 }),
    );

    const result = await thunk.callThunk({ username: '123', password: '123' });

    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.payload).toBe('error');
  });
});
