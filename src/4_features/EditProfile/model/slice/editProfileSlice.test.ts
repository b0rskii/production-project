import { mockProfile } from '5_entities/Profile';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { EditProfileSchema } from '../types/editProfileSchema';
import { ValidateProfileError } from '../const';
import { editProfileReducer, editProfileActions } from './editProfileSlice';

describe('editProfileSlice', () => {
  it('startEdit action', () => {
    expect(
      editProfileReducer(
        { profileForm: null, isReadonly: true } as EditProfileSchema,
        editProfileActions.startEdit(mockProfile),
      ),
    )
      .toEqual({ profileForm: mockProfile, isReadonly: false });
  });

  it('cancelEdit action', () => {
    expect(
      editProfileReducer(
        {
          validateErrors: [ValidateProfileError.INCORRECT_FIRST_NAME],
          isReadonly: false,
        } as EditProfileSchema,
        editProfileActions.cancelEdit(),
      ),
    )
      .toEqual({ validateErrors: null, isReadonly: true });
  });

  it('updateProfileForm action', () => {
    const UPDATED_FORM = { ...mockProfile, firstname: 'new name' };

    expect(
      editProfileReducer(
        { profileForm: mockProfile } as EditProfileSchema,
        editProfileActions.updateProfileForm(UPDATED_FORM),
      ),
    )
      .toEqual({ profileForm: UPDATED_FORM });
  });

  it('updateProfileForm action', () => {
    expect(
      editProfileReducer(
        { validateErrors: null } as EditProfileSchema,
        editProfileActions.setValidateError([ValidateProfileError.INCORRECT_FIRST_NAME]),
      ),
    )
      .toEqual({ validateErrors: [ValidateProfileError.INCORRECT_FIRST_NAME] });
  });

  it('updateProfileData pending', () => {
    expect(editProfileReducer(
      {
        isLoading: false,
        error: 'error',
        validateErrors: [ValidateProfileError.INCORRECT_FIRST_NAME],
      } as EditProfileSchema,
      updateProfileData.pending,
    ))
      .toEqual({
        isLoading: true,
        error: null,
        validateErrors: null,
      });
  });

  it('updateProfileData fulfilled', () => {
    const payload = mockProfile;

    expect(editProfileReducer(
      {
        error: 'error',
        isLoading: true,
        profileForm: null,
        isReadonly: false,
      } as EditProfileSchema,
      { type: updateProfileData.fulfilled.type, payload },
    ))
      .toEqual({
        error: null,
        isLoading: false,
        profileForm: payload,
        isReadonly: true,
      });
  });

  it('updateProfileData rejected', () => {
    const payload = 'error';

    expect(editProfileReducer(
      {
        error: null,
        isLoading: true,
      } as EditProfileSchema,
      { type: updateProfileData.rejected.type, payload },
    ))
      .toEqual({
        isLoading: false,
        error: payload,
      });
  });
});
