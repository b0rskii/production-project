import { FeatureFlags } from '@/6_shared/utils/featureFlags';

export type UserRole = 'ADMIN' | 'USER' | 'MANAGER';

export type User = {
  id: string;
  username: string;
  roles: UserRole[];
  avatar?: string;
  features?: FeatureFlags;
};

export type UserSchema = {
  authData: User | null;
  isInited: boolean;
};
