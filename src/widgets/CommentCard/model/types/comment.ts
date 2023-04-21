import { User } from 'entities/User';

export type Comment = {
  id: string;
  user: User;
  text: string;
};
