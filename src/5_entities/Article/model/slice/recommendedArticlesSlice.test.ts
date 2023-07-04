import { fetchRecommendedArticles } from '../services/fetchRecommendedArticles/fetchRecommendedArticles';
import { RecommendedArticlesSchema } from '../types/recommendedArticlesSchema';
import { mockArticles, mockNormalizedArticles } from '../mocks';
import { recommendedArticlesReducer, ARTICLES_LIMIT } from './recommendedArticlesSlice';

const articles = mockArticles(ARTICLES_LIMIT);
const normalizedArticles = mockNormalizedArticles(ARTICLES_LIMIT);

describe('recommendedArticlesSlice', () => {
  it('fetchRecommendedArticles pending', () => {
    const state: DeepPartial<RecommendedArticlesSchema> = {
      isLoading: false,
      error: 'error',
    };

    expect(recommendedArticlesReducer(state as RecommendedArticlesSchema, fetchRecommendedArticles.pending))
      .toEqual({
        isLoading: true,
        error: null,
      });
  });

  it('fetchRecommendedArticles fulfilled', () => {
    const state: DeepPartial<RecommendedArticlesSchema> = {
      ids: [],
      entities: {},
      isLoading: true,
      error: 'error',
    };

    const payload = articles;

    expect(recommendedArticlesReducer(state as RecommendedArticlesSchema, { type: fetchRecommendedArticles.fulfilled.type, payload }))
      .toEqual({
        ids: normalizedArticles.ids,
        entities: normalizedArticles.entities,
        isLoading: false,
        error: null,
      });
  });

  it('fetchRecommendedArticles rejected', () => {
    const state: DeepPartial<RecommendedArticlesSchema> = {
      isLoading: true,
      error: null,
    };

    const payload = 'error';

    expect(recommendedArticlesReducer(state as RecommendedArticlesSchema, { type: fetchRecommendedArticles.rejected.type, payload }))
      .toEqual({
        isLoading: false,
        error: payload,
      });
  });
});
