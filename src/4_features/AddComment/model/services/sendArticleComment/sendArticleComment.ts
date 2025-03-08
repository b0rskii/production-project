import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from '@/1_app/providers/StoreProvider';
import { userStore } from '@/5_entities/User';
import {
  ArticleComment,
  articleCommentsActions,
} from '@/5_entities/ArticleComment';
import { toastifyActions } from '@/6_shared/ui/Toastify';
import { StatusMessage } from '@/6_shared/types/common';
import { ApiRoutes } from '@/6_shared/api';
import { SLICE_NAME } from '../../const';

export const sendArticleComment = createAsyncThunk<
  ArticleComment,
  StatusMessage,
  ThunkAPI<string | null>
>(
  `${SLICE_NAME}/sendArticleComment`,
  async (statusMessage, { rejectWithValue, getState, extra, dispatch }) => {
    const { api } = extra;
    const state = getState();

    const text = state.addComment?.text;
    const articleId = state.article?.data?.id;
    const { authData } = userStore;

    if (!text || !articleId || !authData) {
      return rejectWithValue('no data');
    }

    const newCommentData = {
      text,
      articleId,
      userId: authData.id,
    };

    try {
      const { data } = await api.post<ArticleComment>(
        ApiRoutes.COMMENTS,
        newCommentData,
      );

      if (!data) {
        throw new Error();
      }

      const addedComment: ArticleComment = {
        ...data,
        user: authData,
      };

      dispatch(articleCommentsActions.addComment(addedComment));
      dispatch(toastifyActions.notify(statusMessage.success));

      return addedComment;
    } catch (error) {
      dispatch(toastifyActions.notifyError(statusMessage.error));
      return rejectWithValue('error');
    }
  },
);
