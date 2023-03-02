import axios from 'axios';
import { testAsyncThunk } from 'shared/utils/tests';
import { User, userActions } from 'entities/User';
import { loginByUserName } from './loginByUserName';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

describe('loginByUserName', () => {
  it('fulfilled', async () => {
    const RESPONSE_DATA: User = { id: '1', name: 'user' };

    mockedAxios.post.mockReturnValue(
      Promise.resolve({ data: RESPONSE_DATA }),
    );

    const thunk = testAsyncThunk(loginByUserName);
    const result = await thunk.callThunk({ username: '123', password: '123' });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(RESPONSE_DATA));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(result.payload).toEqual(RESPONSE_DATA);
  });

  it('rejected', async () => {
    mockedAxios.post.mockReturnValue(
      Promise.resolve({ status: 403 }),
    );

    const thunk = testAsyncThunk(loginByUserName);
    const result = await thunk.callThunk({ username: '123', password: '123' });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.payload).toBe('error');
  });
});
