import { StateSchema } from '@/1_app/providers/StoreProvider';
import { getIsLoading } from './getIsLoading';

describe('getProfileIsLoading', () => {
  it('should return profile loading status', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        isLoading: true,
      },
    };

    expect(getIsLoading(state as StateSchema)).toBe(true);
  });
});
