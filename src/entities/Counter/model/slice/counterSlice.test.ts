import { CounterSchema } from '../types/counterSchema';
import { counterReducer, counterActions } from './counterSlice';

const VALUE = 10;
const counterState: CounterSchema = { value: VALUE };

describe('counterSlice', () => {
  it('increment', () => {
    expect(counterReducer(counterState, counterActions.increment))
      .toEqual({ value: VALUE + 1 });
  });

  it('decrement', () => {
    expect(counterReducer(counterState, counterActions.decrement))
      .toEqual({ value: VALUE - 1 });
  });

  it('should work with empty state', () => {
    expect(counterReducer(undefined, counterActions.increment))
      .toEqual({ value: 1 });
  });
});
