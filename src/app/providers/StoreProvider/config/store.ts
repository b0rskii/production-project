import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer, COUNTER_SLICE } from 'entities/Counter';
import { userReducer, USER_SLICE } from 'entities/User';
import { createReducerManager } from './reducerManager';
import { StateSchema } from './StateSchema';

export const createReduxStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) => {
  const rootReducer: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    [COUNTER_SLICE]: counterReducer,
    [USER_SLICE]: userReducer,
  };

  const reducerManager = createReducerManager(rootReducer);
  const store = configureStore<StateSchema>({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};
