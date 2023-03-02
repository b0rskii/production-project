import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

export const testAsyncThunk = <Return, Arg, RejectedValue>(
  actionCreator: (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>,
) => {
  const dispatch: Dispatch = jest.fn();
  const getState: () => StateSchema = jest.fn();

  return {
    dispatch,
    getState,
    callThunk: async (arg: Arg) => {
      const action = actionCreator(arg);
      const result = await action(dispatch, getState, undefined);

      return result;
    },
  };
};
