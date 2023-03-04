import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { CounterSchema, COUNTER_SLICE } from 'entities/Counter';
import { UserSchema, USER_SLICE } from 'entities/User';
import { LoginSchema, LOGIN_SLICE } from 'features/AuthByUsername';

export type StateSchema = {
  [COUNTER_SLICE]: CounterSchema;
  [USER_SLICE]: UserSchema;
  [LOGIN_SLICE]?: LoginSchema;
};

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface StoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export type ThunkExtra = {
  api: AxiosInstance;
  navigate: NavigateFunction;
};

export type ThunkAPI<T> = {
  rejectValue: T;
  extra: ThunkExtra;
};
