import { testAsyncThunk } from '6_shared/utils/tests';
import { fetchArticles } from './fetchArticles';
import { Article } from '../../types/articleSchema';
import { articlesActions } from '../../slice/articlesSlice';
import { mockArticles } from '../../mocks';

const PAGE = 1;
const LIMIT = 5;
const HEADERS = { 'x-total-count': 10 };

describe('fetchArticles', () => {
  it('fulfilled', async () => {
    const RESPONSE_DATA: Article[] = mockArticles(LIMIT);

    const thunk = testAsyncThunk(fetchArticles, {
      articles: {
        page: PAGE,
        limit: LIMIT,
      },
    });

    thunk.api.get.mockReturnValue(
      Promise.resolve({ data: RESPONSE_DATA, headers: HEADERS }),
    );

    const result = await thunk.callThunk(undefined);

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(thunk.dispatch).toHaveBeenCalledWith(articlesActions.setPage(PAGE + 1));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(result.payload).toEqual({ data: RESPONSE_DATA, totalCount: HEADERS['x-total-count'] });
  });

  it('rejected', async () => {
    const thunk = testAsyncThunk(fetchArticles, {
      articles: {
        page: PAGE,
        limit: LIMIT,
      },
    });

    thunk.api.get.mockReturnValue(
      Promise.resolve({ status: 403 }),
    );

    const result = await thunk.callThunk(undefined);

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.payload).toBe('error');
  });
});
