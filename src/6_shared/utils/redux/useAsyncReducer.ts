import { useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import {
  StoreWithManager,
  StateSchemaKey,
} from '@/1_app/providers/StoreProvider';
import { useAppDispatch } from './useAppDispatch';
import { useMountEffect } from '../react/lifeCycle';

export const useAsyncReducer = (
  key: StateSchemaKey,
  reducer: Reducer,
  removeAfterUnmount = true,
) => {
  const store = useStore() as StoreWithManager;
  const dispatch = useAppDispatch();

  useMountEffect(() => {
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
  });
};
