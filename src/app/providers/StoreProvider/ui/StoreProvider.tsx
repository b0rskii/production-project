import { DeepPartial } from '@reduxjs/toolkit';
import { FC } from 'react';
import { Provider } from 'react-redux';
import { StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

export type StoreProviderProps = {
  initialState?: DeepPartial<StateSchema>;
};

export const StoreProvider: FC<StoreProviderProps> = (props) => {
  const { initialState, children } = props;

  const store = createReduxStore(initialState as StateSchema);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
