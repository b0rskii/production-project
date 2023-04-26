import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from 'app/providers/StoreProvider';
import { fetchArticleComments } from 'entities/ArticleComment';
import { Comment } from 'shared/types/comment';
import { ApiRoutes } from 'shared/api';
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
    const userId = state.user.authData?.id;

    if (!text || !articleId || !userId) {
      return rejectWithValue('no data');
    }

    try {
      const { data } = await api.post<Comment>(ApiRoutes.COMMENTS, {
        text,
        articleId,
        userId,
      });

      if (!data) {
        throw new Error();
      }

      dispatch(fetchArticleComments(articleId));

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
