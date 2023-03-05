import { StateSchema } from 'app/providers/StoreProvider';
import { getCounterValue } from './getCounterValue';

describe('getCounterValue', () => {
  it('should return counter value', () => {
    const VALUE = 10;

    const state: DeepPartial<StateSchema> = {
      counter: { value: VALUE },
    };

    expect(getCounterValue(state as StateSchema)).toEqual(VALUE);
  });
});
