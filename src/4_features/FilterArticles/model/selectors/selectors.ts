import { StateSchema } from '@/1_app/providers/StoreProvider';
import { initialState } from '../slice/filterArticlesSlice';

export const getSearch = (state: StateSchema) => (
  state.filterArticles?.search ?? initialState.search
);
export const getCurrentSearch = (state: StateSchema) => (
  state.filterArticles?.currentSearch ?? initialState.currentSearch
);
export const getType = (state: StateSchema) => (
  state.filterArticles?.type ?? initialState.type
);
