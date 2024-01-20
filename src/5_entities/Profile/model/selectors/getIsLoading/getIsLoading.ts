import { StateSchema } from '@/1_app/providers/StoreProvider';
import { initialState } from '../../slice/profileSlice';

export const getIsLoading = (state: StateSchema) => (
  state.profile?.isLoading || initialState.isLoading
);
