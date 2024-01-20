import { User } from '@/5_entities/User';

export interface Comment {
  id: string;
  text: string;
  user: User;
}
