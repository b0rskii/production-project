import { StateSchema } from 'app/providers/StoreProvider';

export const getError = (state: StateSchema) => state.articleComments?.error || null;

export const getIsLoading = (state: StateSchema) => (
  state.articleComments?.isLoading || false
);
