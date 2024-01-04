import { fetchArticles } from '../services/fetchArticles/fetchArticles';
import { ArticlesSchema } from '../types/articlesSchema';
import { mockArticle, mockNormalizedArticles } from '../mocks';
import { articlesReducer, articlesActions, ARTICLES_LIMIT } from './articlesSlice';

const ARTICLES_COUNT = 10;
const normalizedArticles = mockNormalizedArticles(ARTICLES_COUNT);

describe('articlesSlice', () => {
  it('setView action', () => {
    const state: DeepPartial<ArticlesSchema> = {
      view: 'list',
      limit: ARTICLES_LIMIT,
    };

    expect(articlesReducer(state as ArticlesSchema, articlesActions.setView('tiles')))
      .toEqual({
        ...state,
        view: 'tiles',
        limit: ARTICLES_LIMIT,
      });
  });

  it('resetArticles action', () => {
    const state: DeepPartial<ArticlesSchema> = {
      ids: normalizedArticles.ids,
      entities: normalizedArticles.entities,
      page: 2,
      isHasMore: true,
    };

    expect(articlesReducer(state as ArticlesSchema, articlesActions.resetArticles()))
      .toEqual({
        ...state,
        ids: [],
        entities: {},
        page: 0,
        isHasMore: false,
      });
  });

  it('fetchArticles pending', () => {
    const state: DeepPartial<ArticlesSchema> = {
      isLoading: false,
      error: 'error',
    };

    expect(articlesReducer(state as ArticlesSchema, fetchArticles.pending))
      .toEqual({
        isLoading: true,
        error: null,
      });
  });

  it('fetchArticles fulfilled has no more', () => {
    const state: DeepPartial<ArticlesSchema> = {
      ids: normalizedArticles.ids,
      entities: normalizedArticles.entities,
      isLoading: true,
      error: 'error',
      page: 0,
      isHasMore: true,
    };

    const payload = {
      data: [mockArticle('11')],
      totalCount: '11',
    };

    expect(articlesReducer(state as ArticlesSchema, { type: fetchArticles.fulfilled.type, payload }))
      .toEqual({
        ids: [...normalizedArticles.ids, payload.data[0].id],
        entities: { ...normalizedArticles.entities, 11: payload.data[0] },
        isLoading: false,
        error: null,
        page: 1,
        isHasMore: false,
      });
  });

  it('fetchArticles fulfilled has more', () => {
    const state: DeepPartial<ArticlesSchema> = {
      ids: normalizedArticles.ids,
      entities: normalizedArticles.entities,
      isLoading: true,
      error: 'error',
      page: 0,
      isHasMore: true,
    };

    const payload = {
      data: [mockArticle('11')],
      totalCount: '12',
    };

    expect(articlesReducer(state as ArticlesSchema, { type: fetchArticles.fulfilled.type, payload }))
      .toEqual({
        ids: [...normalizedArticles.ids, payload.data[0].id],
        entities: { ...normalizedArticles.entities, 11: payload.data[0] },
        isLoading: false,
        error: null,
        page: 1,
        isHasMore: true,
      });
  });

  it('fetchArticles rejected', () => {
    const state: DeepPartial<ArticlesSchema> = {
      isLoading: true,
      error: null,
    };

    const payload = 'error';

    expect(articlesReducer(state as ArticlesSchema, { type: fetchArticles.rejected.type, payload }))
      .toEqual({
        isLoading: false,
        error: payload,
      });
  });
});
