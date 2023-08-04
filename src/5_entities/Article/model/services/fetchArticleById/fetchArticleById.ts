import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from '1_app/providers/StoreProvider';
import { ApiRoutes } from '6_shared/api';
import { Article } from '../../types/articleSchema';
import { ARTICLE_SLICE_NAME } from '../../const';

export const fetchArticleById = createAsyncThunk<Article, string, ThunkAPI<string>>(
  `${ARTICLE_SLICE_NAME}/fetchArticleById`,
  async (articleId, { rejectWithValue, extra }) => {
    const { api } = extra;

    try {
      const { data } = await api.get<Article>(`${ApiRoutes.ARTICLES}/${articleId}`);

      if (!data) {
        throw new Error();
      }

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
