import { Profile } from 'entities/Profile';
import { ValidateProfileError } from '../types/editProfileSchema';

export const validateProfileData = (profile?: Profile | null) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA];
  }

  const { firstname, lastname, age } = profile;
  const errors: ValidateProfileError[] = [];

  if (!firstname) {
    errors.push(ValidateProfileError.INCORRECT_FIRST_NAME);
  }

  if (!lastname) {
    errors.push(ValidateProfileError.INCORRECT_LAST_NAME);
  }

  if (!age || !Number.isInteger(age) || age < 18 || age > 100) {
    errors.push(ValidateProfileError.INCORRECT_AGE);
  }

  return errors;
};
