export type User = {
  id: string;
  name: string;
};

export type UserSchema = {
  authData: User | null;
  isInited: boolean;
};
