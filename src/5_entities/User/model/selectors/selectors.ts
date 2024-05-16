import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/1_app/providers/StoreProvider';
import { JsonSettings } from '../types/userSchema';

const defaultJsonSettings: JsonSettings = {};

export const getIsInited = (state: StateSchema) => state.user.isInited;
export const getUserAuthData = (state: StateSchema) => state.user.authData;
export const getUserId = (state: StateSchema) => state.user.authData?.id;
export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const getJsonSettings = (state: StateSchema) =>
  state.user.authData?.jsonSettings ?? defaultJsonSettings;

export const isUser = createSelector(getUserRoles, (roles) =>
  Boolean(roles?.includes('USER'))
);

export const isAdmin = createSelector(getUserRoles, (roles) =>
  Boolean(roles?.includes('ADMIN'))
);

export const isManager = createSelector(getUserRoles, (roles) =>
  Boolean(roles?.includes('MANAGER'))
);
