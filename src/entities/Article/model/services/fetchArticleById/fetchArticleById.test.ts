import { testAsyncThunk } from 'shared/utils/tests';
import { fetchArticleById } from './fetchArticleById';
import { Article } from '../../types/articleSchema';
import { mockArticle } from '../../mocks';

const ARTICLE_ID = '1';

describe('fetchArticleById', () => {
  it('fulfilled', async () => {
    const RESPONSE_DATA: Article = mockArticle;

    const thunk = testAsyncThunk(fetchArticleById);

    thunk.api.get.mockReturnValue(
      Promise.resolve({ data: RESPONSE_DATA }),
    );

    const result = await thunk.callThunk(ARTICLE_ID);

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(RESPONSE_DATA);
  });

  it('rejected', async () => {
    const thunk = testAsyncThunk(fetchArticleById);

    thunk.api.get.mockReturnValue(
      Promise.resolve({ status: 403 }),
    );

    const result = await thunk.callThunk(ARTICLE_ID);

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });
});
