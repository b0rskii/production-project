import { StateSchema } from '@/1_app/providers/StoreProvider';
import { initialState } from '../../slice/profileSlice';

export const getError = (state: StateSchema) => state.profile?.error || initialState.error;
