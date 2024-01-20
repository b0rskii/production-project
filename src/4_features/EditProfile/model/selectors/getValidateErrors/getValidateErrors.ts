import { StateSchema } from '@/1_app/providers/StoreProvider';
import { initialState } from '../../slice/editProfileSlice';

export const getValidateErrors = (state: StateSchema) => (
  state.editProfile ? state.editProfile.validateErrors : initialState.validateErrors
);
