import { Profile } from '5_entities/Profile';
import { ValidateProfileError } from '../../types/editProfileSchema';
import { AgeLimit } from '../../const';

export const validateProfileData = (profile?: Profile | null) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA];
  }

  const { firstname, lastname, username, age } = profile;
  const errors: ValidateProfileError[] = [];

  if (!firstname) {
    errors.push(ValidateProfileError.INCORRECT_FIRST_NAME);
  }

  if (!lastname) {
    errors.push(ValidateProfileError.INCORRECT_LAST_NAME);
  }

  if (!username) {
    errors.push(ValidateProfileError.INCORRECT_USER_NAME);
  }

  if (!age || !Number.isInteger(age) || age < AgeLimit.MIN || age > AgeLimit.MAX) {
    errors.push(ValidateProfileError.INCORRECT_AGE);
  }

  return errors;
};
