import { Profile } from 'entities/Profile';

export enum ValidateProfileError {
  INCORRECT_FIRST_NAME = 'INCORRECT_FIRST_NAME',
  INCORRECT_LAST_NAME = 'INCORRECT_LAST_NAME',
  INCORRECT_AGE = 'INCORRECT_AGE',
  NO_DATA = 'NO_DATA',
}

export type EditProfileSchema = {
  profileForm: Profile | null;
  isReadonly: boolean;
  isLoading: boolean;
  error: string | null;
  validateErrors: ValidateProfileError[] | null;
};
