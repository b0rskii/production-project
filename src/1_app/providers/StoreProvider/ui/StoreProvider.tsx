import { ReactNode } from 'react';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

export type StoreProviderProps = {
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
  children: ReactNode;
};

export const StoreProvider = (props: StoreProviderProps) => {
  const { initialState, asyncReducers, children } = props;

  const store = createReduxStore(
    initialState as StateSchema,
    asyncReducers as ReducersMapObject<StateSchema>,
  );

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
