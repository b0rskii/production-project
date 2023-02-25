import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getCounter } from './getCounter';

describe('getCounter', () => {
  it('should return counter slice state', () => {
    const COUNTER = { value: 10 };

    const state: DeepPartial<StateSchema> = {
      counter: COUNTER,
    };

    expect(getCounter(state as StateSchema)).toEqual(COUNTER);
  });
});
