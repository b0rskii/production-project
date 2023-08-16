import { StateSchema } from '1_app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

export const getIsInited = (state: StateSchema) => state.user.isInited;
export const getUserAuthData = (state: StateSchema) => state.user.authData;
export const getUserId = (state: StateSchema) => state.user.authData?.id;
export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const isUser = createSelector(
  getUserRoles,
  (roles) => Boolean(roles?.includes('USER')),
);

export const isAdmin = createSelector(
  getUserRoles,
  (roles) => Boolean(roles?.includes('ADMIN')),
);

export const isManager = createSelector(
  getUserRoles,
  (roles) => Boolean(roles?.includes('MANAGER')),
);
