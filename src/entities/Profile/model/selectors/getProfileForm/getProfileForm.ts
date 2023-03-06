import { StateSchema } from 'app/providers/StoreProvider';
import { initialState } from '../../slice/profileSlice';

export const getProfileForm = (state: StateSchema) => state.profile?.form || initialState.form;
