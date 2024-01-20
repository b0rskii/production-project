import { StateSchema } from '@/1_app/providers/StoreProvider';
import { initialState } from '../slice/addCommentSlice';

export const getText = (state: StateSchema) => state.addComment?.text || initialState.text;

export const getIsLoading = (state: StateSchema) => (
  state.addComment?.isLoading || initialState.isLoading
);

export const getError = (state: StateSchema) => state.addComment?.error || initialState.error;
