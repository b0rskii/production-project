import { testAsyncThunk } from '@/6_shared/utils/tests';
import { articleCommentsActions } from '@/5_entities/ArticleComment';
import { mockArticle } from '@/5_entities/Article';
import { mockUser } from '@/5_entities/User';
import { toastifyActions } from '@/6_shared/ui/Toastify';
import { StatusMessage } from '@/6_shared/const/mocks';
import { sendArticleComment } from './sendArticleComment';

const USER_DATA = mockUser(
  'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
);

describe('sendArticleComment', () => {
  it('fulfilled', async () => {
    const RESPONSE_DATA = {
      id: '55',
      text: 'comment text',
      articleId: mockArticle().id,
      userId: USER_DATA.id,
    };

    const thunk = testAsyncThunk(sendArticleComment, {
      addComment: { text: 'comment text' },
      article: { data: mockArticle() },
      user: { authData: USER_DATA },
    });

    thunk.api.post.mockReturnValue(
      Promise.resolve({ data: RESPONSE_DATA }),
    );

    const result = await thunk.callThunk(StatusMessage);

    const addedComment = { ...RESPONSE_DATA, user: USER_DATA };

    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(thunk.dispatch).toHaveBeenCalledWith(articleCommentsActions.addComment(addedComment));
    expect(thunk.dispatch).toHaveBeenCalledWith(toastifyActions.notify(StatusMessage.success));
    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    expect(result.payload).toEqual(addedComment);
  });

  it('rejected', async () => {
    const thunk = testAsyncThunk(sendArticleComment, {
      addComment: { text: 'comment text' },
      article: { data: mockArticle() },
      user: { authData: USER_DATA },
    });

    thunk.api.post.mockReturnValue(
      Promise.resolve({ status: 403 }),
    );

    const result = await thunk.callThunk(StatusMessage);

    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(thunk.dispatch).toHaveBeenCalledWith(toastifyActions.notifyError(StatusMessage.error));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(result.payload).toBe('error');
  });
});
