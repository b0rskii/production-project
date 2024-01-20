import { testAsyncThunk } from '@/6_shared/utils/tests';
import { fetchArticleComments } from './fetchArticleComments';
import { ArticleComment } from '../../types/articleCommentsSchema';
import { mockArticleComments } from '../../mocks';

const ARTICLE_ID = '1';

describe('fetchArticleComments', () => {
  it('fulfilled', async () => {
    const RESPONSE_DATA: ArticleComment[] = mockArticleComments(5);

    const thunk = testAsyncThunk(fetchArticleComments);

    thunk.api.get.mockReturnValue(
      Promise.resolve({ data: RESPONSE_DATA }),
    );

    const result = await thunk.callThunk(ARTICLE_ID);

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(RESPONSE_DATA);
  });

  it('rejected', async () => {
    const thunk = testAsyncThunk(fetchArticleComments);

    thunk.api.get.mockReturnValue(
      Promise.resolve({ status: 403 }),
    );

    const result = await thunk.callThunk(ARTICLE_ID);

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });
});
