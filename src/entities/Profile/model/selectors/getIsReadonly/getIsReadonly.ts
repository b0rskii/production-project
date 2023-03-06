import { StateSchema } from 'app/providers/StoreProvider';
import { initialState } from '../../slice/profileSlice';

export const getIsReadonly = (state: StateSchema) => (
  state.profile?.isReadonly === undefined ? initialState.isReadonly : state.profile.isReadonly
);
