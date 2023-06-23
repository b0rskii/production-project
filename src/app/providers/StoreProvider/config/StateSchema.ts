import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { UISchema, UI_SLICE } from 'widgets/Page';
import { LoginSchema, LOGIN_SLICE } from 'features/AuthByUsername';
import { EditProfileSchema, EDIT_PROFILE_SLICE } from 'features/EditProfile';
import { AddCommentSchema, ADD_COMMENT_SLICE } from 'features/AddComment';
import { ProfileSchema, PROFILE_SLICE } from 'entities/Profile';
import { UserSchema, USER_SLICE } from 'entities/User';
import { ArticleSchema, ARTICLE_SLICE, ArticlesSchema, ARTICLES_SLICE } from 'entities/Article';
import { ArticleCommentsSchema, ARTICLE_COMMENTS_SLICE } from 'entities/ArticleComment';
import { NOTIFICATION_SLICE, NotificationsSchema } from 'shared/utils/notifications';

export type StateSchema = {
  [USER_SLICE]: UserSchema;
  [NOTIFICATION_SLICE]: NotificationsSchema;
  [UI_SLICE]: UISchema;
  [LOGIN_SLICE]?: LoginSchema;
  [PROFILE_SLICE]?: ProfileSchema;
  [EDIT_PROFILE_SLICE]?: EditProfileSchema;
  [ARTICLE_SLICE]?: ArticleSchema;
  [ARTICLE_COMMENTS_SLICE]?: ArticleCommentsSchema;
  [ADD_COMMENT_SLICE]?: AddCommentSchema;
  [ARTICLES_SLICE]?: ArticlesSchema;
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
