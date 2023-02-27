import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer, COUNTER_SLICE } from 'entities/Counter';
import { userReducer, USER_SLICE } from 'entities/User';
import { loginReducer, LOGIN_SLICE } from 'features/AuthByUsername';
import { StateSchema } from './StateSchema';

export const createReduxStore = (initialState?: StateSchema) => {
  const rootReducer: ReducersMapObject<StateSchema> = {
    [COUNTER_SLICE]: counterReducer,
    [USER_SLICE]: userReducer,
    [LOGIN_SLICE]: loginReducer,
  };

  return configureStore<StateSchema>({
    reducer: rootReducer,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });
};
