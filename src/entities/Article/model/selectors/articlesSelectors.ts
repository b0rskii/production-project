import { StateSchema } from 'app/providers/StoreProvider';
import { initialState, articlesAdapter } from '../slice/articlesSlice';

export const getError = (state: StateSchema) => state.articles?.error || initialState.error;
export const getView = (state: StateSchema) => state.articles?.view || initialState.view;

export const getIsLoading = (state: StateSchema) => (
  state.articles?.isLoading || initialState.isLoading
);

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articles || articlesAdapter.getInitialState(),
);
