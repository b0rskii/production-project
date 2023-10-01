import { Profile } from '5_entities/Profile';
import { ValidateProfileError } from '../const';

export type EditProfileSchema = {
  profileForm: Profile | null;
  isReadonly: boolean;
  isLoading: boolean;
  error: string | null;
  validateErrors: ValidateProfileError[] | null;
};
