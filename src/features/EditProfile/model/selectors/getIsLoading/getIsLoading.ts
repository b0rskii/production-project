import { StateSchema } from 'app/providers/StoreProvider';
import { initialState } from '../../slice/editProfileSlice';

export const getIsLoading = (state: StateSchema) => (
  state.editProfile ? state.editProfile.isLoading : initialState.isLoading
);
