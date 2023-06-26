import { StateSchema } from '1_app/providers/StoreProvider';
import { initialState } from '../../slice/editProfileSlice';

export const getProfileForm = (state: StateSchema) => (
  state.editProfile ? state.editProfile.profileForm : initialState.profileForm
);
