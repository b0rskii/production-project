import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { FC } from 'react';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

export type StoreProviderProps = {
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
};

export const StoreProvider: FC<StoreProviderProps> = (props) => {
  const { initialState, asyncReducers, children } = props;
  const navigate = useNavigate();

  const store = createReduxStore(
    initialState as StateSchema,
    asyncReducers as ReducersMapObject<StateSchema>,
    navigate,
  );

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
