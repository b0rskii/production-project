import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from '1_app/providers/StoreProvider';
import { ApiRoutes } from '6_shared/api';
import { ArticleComment } from '../../types/articleCommentsSchema';
import { SLICE_NAME } from '../../const';

export const fetchArticleComments = createAsyncThunk<ArticleComment[], string, ThunkAPI<string>>(
  `${SLICE_NAME}/fetchArticleComments`,
  async (articleId, { rejectWithValue, extra }) => {
    const { api } = extra;

    try {
      const { data } = await api.get<ArticleComment[]>(
        `${ApiRoutes.ARTICLES}/${articleId}/comments`,
        {
          params: {
            _expand: 'user',
          },
        },
      );

      if (!data) {
        throw new Error();
      }

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
