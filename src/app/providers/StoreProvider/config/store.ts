import { configureStore } from '@reduxjs/toolkit';
import { counterReducer, COUNTER_NAME } from 'entities/Counter';
import { StateSchema } from './stateSchema';

export const createReduxStore = (initialState?: StateSchema) => configureStore<StateSchema>({
  reducer: {
    [COUNTER_NAME]: counterReducer,
  },
  devTools: __IS_DEV__,
  preloadedState: initialState,
});
