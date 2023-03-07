import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { LoginSchema, LOGIN_SLICE } from 'features/AuthByUsername';
import { EditProfileSchema, EDIT_PROFILE_SLICE } from 'features/EditProfile';
import { CounterSchema, COUNTER_SLICE } from 'entities/Counter';
import { ProfileSchema, PROFILE_SLICE } from 'entities/Profile';
import { UserSchema, USER_SLICE } from 'entities/User';

export type StateSchema = {
  [COUNTER_SLICE]: CounterSchema;
  [USER_SLICE]: UserSchema;
  [LOGIN_SLICE]?: LoginSchema;
  [PROFILE_SLICE]?: ProfileSchema;
  [EDIT_PROFILE_SLICE]?: EditProfileSchema;
};

export type StateSchemaKey = keyof StateSchema;

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
};

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
};

export type ThunkAPI<T> = {
  rejectValue: T;
  state: StateSchema;
  extra: ThunkExtra;
};
