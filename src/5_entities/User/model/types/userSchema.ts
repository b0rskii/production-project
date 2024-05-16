import { FeatureFlags } from '@/6_shared/utils/featureFlags';
import { Theme } from '@/6_shared/utils/theme';

export type UserRole = 'ADMIN' | 'USER' | 'MANAGER';

export type JsonSettings = {
  isFirstVesit?: boolean;
  theme?: Theme;
};

export type User = {
  id: string;
  username: string;
  roles: UserRole[];
  avatar?: string;
  features?: FeatureFlags;
  jsonSettings?: JsonSettings;
};

export type UserSchema = {
  authData: User | null;
  isInited: boolean;
};
