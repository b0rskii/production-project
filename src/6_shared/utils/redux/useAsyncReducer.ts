import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import { StoreWithManager, StateSchemaKey } from '@/1_app/providers/StoreProvider';
import { useAppDispatch } from './useAppDispatch';

export const useAsyncReducer = (
  key: StateSchemaKey,
  reducer: Reducer,
  removeAfterUnmount = true,
) => {
  const store = useStore() as StoreWithManager;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!store.getState()[key]) {
      store.reducerManager.add(key, reducer);
      dispatch({ type: `@INIT ${key} reducer` });
    }

    return () => {
      if (removeAfterUnmount) {
        store.reducerManager.remove(key);
        dispatch({ type: `@DESTROY ${key} reducer` });
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
