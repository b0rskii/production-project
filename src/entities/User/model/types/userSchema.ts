export type User = {
  id: string;
  name: string;
  avatar?: string;
};

export type UserSchema = {
  authData: User | null;
  isInited: boolean;
};
