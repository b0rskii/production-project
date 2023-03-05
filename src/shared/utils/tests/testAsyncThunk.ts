import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { StateSchema } from 'app/providers/StoreProvider';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

export const testAsyncThunk = <Return, Arg, RejectedValue>(
  actionCreator: (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>,
) => {
  const dispatch: Dispatch = jest.fn();
  const getState: () => StateSchema = jest.fn();
  const api = mockedAxios;

  return {
    dispatch,
    getState,
    api,
    callThunk: async (arg: Arg) => {
      const action = actionCreator(arg);
      const result = await action(dispatch, getState, { api });

      return result;
    },
  };
};
