import { Profile } from 'entities/Profile';

export type EditProfileSchema = {
  profileForm: Profile | null;
  isReadonly: boolean;
  isLoading: boolean;
  error: string | null;
};
