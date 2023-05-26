import { testAsyncThunk } from 'shared/utils/tests';
import { Profile, mockProfile, profileActions } from 'entities/Profile';
import { mockUser } from 'entities/User';
import { notificationsActions } from 'shared/utils/notifications';
import { StatusMessage } from 'shared/const/mocks';
import { updateProfileData } from './updateProfileData';
import { editProfileActions } from '../../slice/editProfileSlice';
import { validateProfileData } from '../validateProfile/validateProfile';

const USER_DATA = mockUser();

describe('updateProfileData', () => {
  it('fulfilled', async () => {
    const RESPONSE_DATA: Profile = mockProfile;

    const thunk = testAsyncThunk(updateProfileData, {
      editProfile: { profileForm: mockProfile },
      user: { authData: USER_DATA },
    });

    thunk.api.put.mockReturnValue(
      Promise.resolve({ data: RESPONSE_DATA }),
    );

    const result = await thunk.callThunk(StatusMessage);

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(thunk.dispatch).toHaveBeenCalledWith(profileActions.setProfile(RESPONSE_DATA));
    expect(thunk.dispatch).toHaveBeenCalledWith(notificationsActions.notify(StatusMessage.success));
    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    expect(result.payload).toEqual(RESPONSE_DATA);
  });

  it('rejected', async () => {
    const thunk = testAsyncThunk(updateProfileData, {
      editProfile: { profileForm: mockProfile },
      user: { authData: USER_DATA },
    });

    thunk.api.put.mockReturnValue(
      Promise.resolve({ status: 403 }),
    );

    const result = await thunk.callThunk(StatusMessage);

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(thunk.dispatch).toHaveBeenCalledWith(notificationsActions.notifyError(StatusMessage.error));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(result.payload).toBe('error');
  });

  it('if data invalid', async () => {
    const invalidProfileData = { ...mockProfile, firstname: '' };

    const thunk = testAsyncThunk(updateProfileData, {
      editProfile: { profileForm: invalidProfileData },
      user: { authData: USER_DATA },
    });

    const result = await thunk.callThunk(StatusMessage);

    expect(thunk.api.put).not.toHaveBeenCalled();

    expect(thunk.dispatch)
      .toHaveBeenCalledWith(
        editProfileActions.setValidateError(validateProfileData(invalidProfileData)),
      );

    expect(result.meta.requestStatus).toBe('rejected');
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(result.payload).toBe(null);
  });
});
