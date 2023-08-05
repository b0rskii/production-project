import { configureStore, ReducersMapObject, Reducer, AnyAction } from '@reduxjs/toolkit';
import { UI_SLICE, uiReducer } from '3_widgets/Page';
import { userReducer, USER_SLICE } from '5_entities/User';
import { notificationsReducer, NOTIFICATION_SLICE } from '6_shared/utils/notifications';
import { api, rtkApi } from '6_shared/api';
import { createReducerManager } from './reducerManager';
import { StateSchema } from './StateSchema';

export const createReduxStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) => {
  const rootReducer: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    [rtkApi.reducerPath]: rtkApi.reducer,
    [USER_SLICE]: userReducer,
    [NOTIFICATION_SLICE]: notificationsReducer,
    [UI_SLICE]: uiReducer,
  };

  const reducerManager = createReducerManager(rootReducer);

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<StateSchema, AnyAction>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api,
        },
      },
    }).concat(rtkApi.middleware),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
