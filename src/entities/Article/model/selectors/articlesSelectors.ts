import { StateSchema } from 'app/providers/StoreProvider';
import { initialState, articlesAdapter } from '../slice/articlesSlice';

export const getError = (state: StateSchema) => state.articles?.error || initialState.error;
export const getView = (state: StateSchema) => state.articles?.view || initialState.view;
export const getPage = (state: StateSchema) => state.articles?.page || initialState?.page;
export const getLimit = (state: StateSchema) => state.articles?.limit || initialState?.limit;

export const getIsHasMore = (state: StateSchema) => (
  state.articles?.isHasMore || initialState?.isHasMore
);

export const getIsLoading = (state: StateSchema) => (
  state.articles?.isLoading || initialState.isLoading
);

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articles || articlesAdapter.getInitialState(),
);
