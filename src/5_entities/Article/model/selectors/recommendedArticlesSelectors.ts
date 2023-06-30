import { StateSchema } from '1_app/providers/StoreProvider';
import { initialState, recommendedArticlesAdapter } from '../slice/recommendedArticlesSlice';

export const getError = (state: StateSchema) => (
  state.recommendedArticles?.error ?? initialState.error
);
export const getLimit = (state: StateSchema) => (
  state.recommendedArticles?.limit ?? initialState.limit
);
export const getIsLoading = (state: StateSchema) => (
  state.recommendedArticles?.isLoading ?? initialState.isLoading
);

export const getRecommendedArticles = recommendedArticlesAdapter.getSelectors<StateSchema>(
  (state) => state.recommendedArticles ?? recommendedArticlesAdapter.getInitialState(),
);
