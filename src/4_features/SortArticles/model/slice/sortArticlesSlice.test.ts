import { sortArticlesReducer, sortArticlesActions } from './sortArticlesSlice';
import { SortArticlesSchema } from '../types/sortArticlesSchema';
import { SortingOrder, SortingType } from '../const';

describe('sortArticlesSlice', () => {
  it('setSortingType action', () => {
    const state: DeepPartial<SortArticlesSchema> = { sortingType: SortingType.DATE };
    const payload = SortingType.VIEWS;

    expect(sortArticlesReducer(state as SortArticlesSchema, sortArticlesActions.setSortingType(payload)))
      .toEqual({
        ...state,
        sortingType: payload,
      });
  });

  it('setSortingOrder action', () => {
    const state: DeepPartial<SortArticlesSchema> = { sortingOrder: SortingOrder.ASC };
    const payload = SortingOrder.DESC;

    expect(sortArticlesReducer(state as SortArticlesSchema, sortArticlesActions.setSortingOrder(payload)))
      .toEqual({
        ...state,
        sortingOrder: payload,
      });
  });
});
