export type User = {
  id: string;
  name: string;
  password: string;
};

export type UserSchema = {
  authData?: User;
};
