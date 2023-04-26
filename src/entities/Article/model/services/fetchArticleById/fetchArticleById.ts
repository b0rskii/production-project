import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from 'app/providers/StoreProvider';
import { ApiRoutes } from 'shared/api';
import { NAME } from '../../slice/articleSlice';
import { Article } from '../../types/articleSchema';

export const fetchArticleById = createAsyncThunk<Article, string, ThunkAPI<string>>(
  `${NAME}/fetchArticleById`,
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
