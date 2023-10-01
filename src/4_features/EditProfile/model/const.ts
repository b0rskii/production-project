/* eslint-disable no-unused-vars */
export const SLICE_NAME = 'editProfile';

export const AgeLimit = {
  MIN: 18,
  MAX: 100,
} as const;

export enum ValidateProfileError {
  INCORRECT_FIRST_NAME = 'INCORRECT_FIRST_NAME',
  INCORRECT_LAST_NAME = 'INCORRECT_LAST_NAME',
  INCORRECT_USER_NAME = 'INCORRECT_USER_NAME',
  INCORRECT_AGE = 'INCORRECT_AGE',
  NO_DATA = 'NO_DATA',
}
