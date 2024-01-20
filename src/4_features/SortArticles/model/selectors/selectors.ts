import { StateSchema } from '@/1_app/providers/StoreProvider';
import { initialState } from '../slice/sortArticlesSlice';

export const getSortingType = (state: StateSchema) => (
  state.sortArticles?.sortingType ?? initialState.sortingType
);
export const getSortingOrder = (state: StateSchema) => (
  state.sortArticles?.sortingOrder ?? initialState.sortingOrder
);
