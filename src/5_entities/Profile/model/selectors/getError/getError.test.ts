import { StateSchema } from '@/1_app/providers/StoreProvider';
import { getError } from './getError';

describe('getProfileError', () => {
  it('should return profile error', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        error: 'error',
      },
    };

    expect(getError(state as StateSchema)).toBe('error');
  });
});
