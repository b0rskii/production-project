import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { ArticleSchema } from '../types/articleSchema';
import { mockArticle } from '../mocks';
import { articleReducer } from './articleSlice';

describe('articleSlice', () => {
  it('fetchArticleById pending', () => {
    const state: DeepPartial<ArticleSchema> = {
      data: mockArticle,
      isLoading: false,
      error: 'error',
    };

    expect(articleReducer(state as ArticleSchema, fetchArticleById.pending))
      .toEqual({
        data: null,
        isLoading: true,
        error: null,
      });
  });

  it('fetchArticleById fulfilled', () => {
    const state: DeepPartial<ArticleSchema> = {
      data: null,
      isLoading: true,
      error: 'error',
    };

    const payload = mockArticle;

    expect(articleReducer(state as ArticleSchema, { type: fetchArticleById.fulfilled.type, payload }))
      .toEqual({
        data: payload,
        isLoading: false,
        error: null,
      });
  });

  it('fetchArticleById rejected', () => {
    const state: DeepPartial<ArticleSchema> = {
      isLoading: true,
      error: null,
    };

    const payload = 'error';

    expect(articleReducer(state as ArticleSchema, { type: fetchArticleById.rejected.type, payload }))
      .toEqual({
        isLoading: false,
        error: payload,
      });
  });
});
