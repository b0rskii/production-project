import { StateSchema } from '@/1_app/providers/StoreProvider';
import { articleCommentsAdapter } from '../slice/articleCommentsSlice';

export const getError = (state: StateSchema) => state.articleComments?.error || null;

export const getIsLoading = (state: StateSchema) => (
  state.articleComments?.isLoading || false
);

export const getArticleComments = articleCommentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleComments || articleCommentsAdapter.getInitialState(),
);
