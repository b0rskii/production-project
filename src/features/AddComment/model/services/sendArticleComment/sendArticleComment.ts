import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from 'app/providers/StoreProvider';
import { ArticleComment, articleCommentsActions } from 'entities/ArticleComment';
import { notificationsActions } from 'shared/ui/Notifications';
import { Comment } from 'shared/types/comment';
import { ApiRoutes } from 'shared/api';
import { i18n } from 'shared/utils/i18n';
import { SLICE_NAME } from '../../slice/addCommentSlice';

export const sendArticleComment = createAsyncThunk<
  Comment,
  undefined,
  ThunkAPI<string | null>
>(
  `${SLICE_NAME}/sendArticleComment`,
  async (_arg, { rejectWithValue, getState, extra, dispatch }) => {
    const { api } = extra;
    const state = getState();

    const text = state.addComment?.text;
    const articleId = state.article?.data?.id;
    const user = state.user.authData;

    if (!text || !articleId || !user) {
      return rejectWithValue('no data');
    }

    const newCommentData = {
      text,
      articleId,
      userId: user.id,
    };

    try {
      const { data } = await api.post<ArticleComment>(ApiRoutes.COMMENTS, newCommentData);

      if (!data) {
        throw new Error();
      }

      const addedComment: ArticleComment = {
        ...data,
        user,
      };

      dispatch(articleCommentsActions.addComment(addedComment));
      dispatch(notificationsActions.notify(i18n.t('Комментарий добавлен')));

      return addedComment;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
