import { fetchArticleComments } from '../services/fetchArticleComments/fetchArticleComments';
import { ArticleCommentsSchema } from '../types/articleCommentsSchema';
import { mockNormalizedArticleComments, mockArticleComments } from '../mocks';
import { articleCommentsReducer } from './articleCommentsSlice';

const { ids, entities } = mockNormalizedArticleComments(5);

describe('articleCommentsSlice', () => {
  it('fetchArticleComments pending', () => {
    const state: DeepPartial<ArticleCommentsSchema> = {
      ids,
      entities,
      isLoading: false,
      error: 'error',
    };

    expect(articleCommentsReducer(state as ArticleCommentsSchema, fetchArticleComments.pending))
      .toEqual({
        ids: [],
        entities: {},
        isLoading: true,
        error: null,
      });
  });

  it('fetchArticleComments fulfilled', () => {
    const state: DeepPartial<ArticleCommentsSchema> = {
      ids: [],
      entities: {},
      isLoading: true,
      error: 'error',
    };

    const payload = mockArticleComments(5);

    expect(articleCommentsReducer(
      state as ArticleCommentsSchema,
      { type: fetchArticleComments.fulfilled.type, payload },
    ))
      .toEqual({
        ids,
        entities,
        isLoading: false,
        error: null,
      });
  });

  it('fetchArticleComments rejected', () => {
    const state: DeepPartial<ArticleCommentsSchema> = {
      isLoading: true,
      error: null,
    };

    const payload = 'error';

    expect(articleCommentsReducer(
      state as ArticleCommentsSchema,
      { type: fetchArticleComments.rejected.type, payload },
    ))
      .toEqual({
        isLoading: false,
        error: payload,
      });
  });
});
