import { StateSchema } from '@/1_app/providers/StoreProvider';
import { initialState } from '../../slice/profileSlice';

export const getProfile = (state: StateSchema) => state.profile?.profile || initialState.profile;
