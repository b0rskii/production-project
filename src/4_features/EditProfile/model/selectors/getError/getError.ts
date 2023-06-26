import { StateSchema } from '1_app/providers/StoreProvider';
import { initialState } from '../../slice/editProfileSlice';

export const getError = (state: StateSchema) => (
  state.editProfile ? state.editProfile.error : initialState.error
);
