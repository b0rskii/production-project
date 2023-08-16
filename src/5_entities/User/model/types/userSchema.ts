export type UserRole = 'ADMIN' | 'USER' | 'MANAGER';

export type User = {
  id: string;
  username: string;
  roles: UserRole[];
  avatar?: string;
};

export type UserSchema = {
  authData: User | null;
  isInited: boolean;
};
