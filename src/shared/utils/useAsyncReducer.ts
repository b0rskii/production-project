import { Reducer } from '@reduxjs/toolkit';
import { StoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export const useAsyncReducer = (
  key: StateSchemaKey,
  reducer: Reducer,
  removeAfterUnmount = true,
) => {
  const store = useStore() as StoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    store.reducerManager.add(key, reducer);
    dispatch({ type: `@INIT ${key} reducer` });

    return () => {
      if (removeAfterUnmount) {
        store.reducerManager.remove(key);
        dispatch({ type: `@DESTROY ${key} reducer` });
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
