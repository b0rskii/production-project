import { User } from './types/userSchema';

export const mockUser = (avatar?: string): User => ({
  id: '1',
  username: 'user',
  avatar,
});
