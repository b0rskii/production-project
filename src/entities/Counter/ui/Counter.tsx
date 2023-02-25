import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { counterActions } from '../model/slice/counterSlice';

export const Counter: FC = () => {
  const dispatch = useDispatch();
  const value = useSelector(getCounterValue);

  const onIncrementClick = () => {
    dispatch(counterActions.increment());
  };

  const onDecrementClick = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <div data-testid="counter">
      <h1 data-testid="counter-value">{value}</h1>
      <Button data-testid="counter-increment-button" onClick={onIncrementClick}>+</Button>
      <Button data-testid="counter-decrement-button" onClick={onDecrementClick}>-</Button>
    </div>
  );
};
