import { testAsyncThunk } from '@/6_shared/utils/tests';
import { fetchProfileData } from './fetchProfileData';
import { Profile } from '../../types/profileSchema';
import { mockProfile } from '../../mocks';

const PROFILE_ID = '1';

describe('fetchProfileData', () => {
  it('fulfilled', async () => {
    const RESPONSE_DATA: Profile = mockProfile;

    const thunk = testAsyncThunk(fetchProfileData);

    thunk.api.get.mockReturnValue(
      Promise.resolve({ data: RESPONSE_DATA }),
    );

    const result = await thunk.callThunk(PROFILE_ID);

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(RESPONSE_DATA);
  });

  it('rejected', async () => {
    const thunk = testAsyncThunk(fetchProfileData);

    thunk.api.get.mockReturnValue(
      Promise.resolve({ status: 403 }),
    );

    const result = await thunk.callThunk(PROFILE_ID);

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });
});
