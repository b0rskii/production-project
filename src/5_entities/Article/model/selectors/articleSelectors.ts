import { StateSchema } from '1_app/providers/StoreProvider';
import { initialState } from '../slice/articleSlice';

export const getArticle = (state: StateSchema) => state.article?.data || initialState.data;
export const getError = (state: StateSchema) => state.article?.error || initialState.error;

export const getIsLoading = (state: StateSchema) => (
  state.article?.isLoading || initialState.isLoading
);
