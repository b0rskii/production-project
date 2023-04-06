import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { ProfileSchema } from '../types/profileSchema';
import { mockProfile } from '../mocks';
import { profileReducer, profileActions } from './profileSlice';

describe('profileSlice', () => {
  it('setProfile action', () => {
    expect(
      profileReducer({ profile: null } as ProfileSchema, profileActions.setProfile(mockProfile)),
    )
      .toEqual({ profile: mockProfile });
  });

  it('fetchProfileData pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      error: 'error',
    };

    expect(profileReducer(state as ProfileSchema, fetchProfileData.pending))
      .toEqual({
        isLoading: true,
        error: null,
      });
  });

  it('fetchProfileData fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      profile: null,
      isLoading: true,
      error: 'error',
    };

    const payload = mockProfile;

    expect(profileReducer(state as ProfileSchema, { type: fetchProfileData.fulfilled.type, payload }))
      .toEqual({
        profile: payload,
        isLoading: false,
        error: null,
      });
  });

  it('fetchProfileData rejected', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
      error: null,
    };

    const payload = 'error';

    expect(profileReducer(state as ProfileSchema, { type: fetchProfileData.rejected.type, payload }))
      .toEqual({
        isLoading: false,
        error: payload,
      });
  });
});
