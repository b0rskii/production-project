import { StateSchema } from 'app/providers/StoreProvider';
import { getProfile } from './getProfile';
import { mockProfile } from '../../mocks';

describe('getProfile', () => {
  it('should return profile data', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        profile: mockProfile,
      },
    };

    expect(getProfile(state as StateSchema)).toEqual(mockProfile);
  });
});
