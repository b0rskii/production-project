import { StateSchema } from 'app/providers/StoreProvider';
import { initialState } from '../slice/articleCommentsSlice';

export const getArticleComments = (state: StateSchema) => (
  state.articleComments?.data || initialState?.data
);

export const getError = (state: StateSchema) => state.articleComments?.error || initialState.error;

export const getIsLoading = (state: StateSchema) => (
  state.articleComments?.isLoading || initialState.isLoading
);
