import { makeAutoObservable } from 'mobx';

import { setFeatureFlags } from '@/6_shared/utils/featureFlags';
import { Theme } from '@/6_shared/utils/theme';
import { LocalStorageKey } from '@/6_shared/const/localStorage';

import { User } from '../types/userSchema';
import { api, ApiRoutes } from '@/6_shared/api';

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  authData: User | null = null;
  isInited = false;

  get userId() {
    return this.authData?.id;
  }

  get userRoles() {
    return this.authData?.roles;
  }

  get userSettings() {
    return this.authData?.jsonSettings ?? {};
  }

  get theme() {
    return this.authData?.jsonSettings?.theme;
  }

  get isUser() {
    return Boolean(this.userRoles?.includes('USER'));
  }

  get isAdmin() {
    return Boolean(this.userRoles?.includes('ADMIN'));
  }

  get isManager() {
    return Boolean(this.userRoles?.includes('MANAGER'));
  }

  initUserData() {
    const userLocalData = localStorage.getItem(LocalStorageKey.USER);

    if (userLocalData) {
      this.setAuthData(JSON.parse(userLocalData));
    }

    this.isInited = true;
  }

  setAuthData(data: User | null) {
    this.authData = data;
    setFeatureFlags(data?.features);
  }

  logout() {
    this.authData = null;
  }

  toggleTheme() {
    if (!this.authData?.jsonSettings) return;

    const currentTheme = this.authData.jsonSettings.theme;

    this.authData.jsonSettings.theme =
      currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
  }

  async updateJsonSettings() {
    const userData = this.authData;

    if (!userData) {
      return;
    }

    localStorage.setItem(LocalStorageKey.USER, JSON.stringify(userData));

    const { id, jsonSettings } = userData;

    api.patch<User>(`${ApiRoutes.USERS}/${id}`, {
      jsonSettings,
    });
  }
}

export const userStore = new UserStore();
