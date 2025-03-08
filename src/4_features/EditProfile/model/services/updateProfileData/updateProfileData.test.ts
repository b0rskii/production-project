import { testAsyncThunk } from '@/6_shared/utils/tests';
import { Profile, mockProfile, profileActions } from '@/5_entities/Profile';
import { toastifyActions } from '@/6_shared/ui/Toastify';
import { StatusMessage } from '@/6_shared/const/mocks';
import { updateProfileData } from './updateProfileData';
import { validateProfileData } from '../validateProfile/validateProfile';

describe('updateProfileData', () => {
  it('fulfilled', async () => {
    const RESPONSE_DATA: Profile = mockProfile;

    const thunk = testAsyncThunk(updateProfileData, {
      editProfile: { profileForm: mockProfile },
    });

    thunk.api.put.mockReturnValue(Promise.resolve({ data: RESPONSE_DATA }));

    const result = await thunk.callThunk(StatusMessage);

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(thunk.dispatch).toHaveBeenCalledWith(
      profileActions.setProfile(RESPONSE_DATA),
    );
    expect(thunk.dispatch).toHaveBeenCalledWith(
      toastifyActions.notify(StatusMessage.success),
    );
    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    expect(result.payload).toEqual(RESPONSE_DATA);
  });

  it('rejected', async () => {
    const thunk = testAsyncThunk(updateProfileData, {
      editProfile: { profileForm: mockProfile },
    });

    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk(StatusMessage);

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(thunk.dispatch).toHaveBeenCalledWith(
      toastifyActions.notifyError(StatusMessage.error),
    );
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(result.payload).toEqual({
      validateError: null,
      serverError: 'error',
    });
  });

  it('if data invalid', async () => {
    const invalidProfileData = { ...mockProfile, firstname: '' };
    const validationErrors = validateProfileData(invalidProfileData);

    const thunk = testAsyncThunk(updateProfileData, {
      editProfile: { profileForm: invalidProfileData },
    });

    const result = await thunk.callThunk(StatusMessage);

    expect(thunk.api.put).not.toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.payload).toEqual({
      validateError: validationErrors,
      serverError: null,
    });
  });
});
