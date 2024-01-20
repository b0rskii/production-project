import { ArticleType } from '@/5_entities/Article';
import { filterArticlesReducer, filterArticlesActions } from './filterArticlesSlice';
import { FilterArticlesSchema } from '../types/filterArticlesSchema';

describe('filterArticlesSlice', () => {
  it('setSearch action', () => {
    const state: DeepPartial<FilterArticlesSchema> = { search: '' };
    const payload = 'A';

    expect(filterArticlesReducer(state as FilterArticlesSchema, filterArticlesActions.setSearch(payload)))
      .toEqual({
        ...state,
        search: payload,
      });
  });

  it('setCurrentSearch action', () => {
    const state: DeepPartial<FilterArticlesSchema> = { currentSearch: '' };
    const payload = 'Aaaaa';

    expect(filterArticlesReducer(state as FilterArticlesSchema, filterArticlesActions.setCurrentSearch(payload)))
      .toEqual({
        ...state,
        currentSearch: payload,
      });
  });

  it('setType action', () => {
    const state: DeepPartial<FilterArticlesSchema> = { type: ArticleType.ALL };
    const payload = ArticleType.IT;

    expect(filterArticlesReducer(state as FilterArticlesSchema, filterArticlesActions.setType(payload)))
      .toEqual({
        ...state,
        type: payload,
      });
  });
});
