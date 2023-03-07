import { StateSchema } from 'app/providers/StoreProvider';
import { initialState } from '../../slice/editProfileSlice';

export const getIsReadonly = (state: StateSchema) => (
  state.editProfile ? state.editProfile.isReadonly : initialState.isReadonly
);
