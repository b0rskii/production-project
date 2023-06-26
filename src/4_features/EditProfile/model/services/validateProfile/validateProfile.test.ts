import { mockProfile } from '5_entities/Profile';
import { ValidateProfileError } from '../../types/editProfileSchema';
import { validateProfileData } from './validateProfile';
import { AgeLimit } from '../../const';

describe('validateProfileData', () => {
  it('if no profile should return no data error', () => {
    expect(validateProfileData()).toEqual([ValidateProfileError.NO_DATA]);
  });

  it('if firstname emprty should return firstname invalid error', () => {
    expect(validateProfileData({ ...mockProfile, firstname: '' }))
      .toEqual([ValidateProfileError.INCORRECT_FIRST_NAME]);
  });

  it('if lastname emprty should return lastname invalid error', () => {
    expect(validateProfileData({ ...mockProfile, lastname: '' }))
      .toEqual([ValidateProfileError.INCORRECT_LAST_NAME]);
  });

  it('if age emprty should return age invalid error', () => {
    expect(validateProfileData({ ...mockProfile, age: undefined }))
      .toEqual([ValidateProfileError.INCORRECT_AGE]);
  });

  it('if age less than min age should return age invalid error', () => {
    expect(validateProfileData({ ...mockProfile, age: AgeLimit.MIN - 1 }))
      .toEqual([ValidateProfileError.INCORRECT_AGE]);
  });

  it('if age more than max age should return age invalid error', () => {
    expect(validateProfileData({ ...mockProfile, age: AgeLimit.MAX + 1 }))
      .toEqual([ValidateProfileError.INCORRECT_AGE]);
  });

  it('if age is not integer should return age invalid error', () => {
    expect(validateProfileData({ ...mockProfile, age: 55.5 }))
      .toEqual([ValidateProfileError.INCORRECT_AGE]);
  });

  it('if some data invalid should return invalid errors', () => {
    expect(validateProfileData({ ...mockProfile, firstname: '', age: 55.5 }))
      .toEqual([
        ValidateProfileError.INCORRECT_FIRST_NAME,
        ValidateProfileError.INCORRECT_AGE,
      ]);
  });

  it('if data valid should return empty array', () => {
    expect(validateProfileData(mockProfile)).toEqual([]);
  });
});
