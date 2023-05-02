import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from 'app/providers/StoreProvider';
import { ApiRoutes } from 'shared/api';
import { NAME } from '../../slice/articleSlice';
import { Article } from '../../types/articleSchema';

export const fetchArticles = createAsyncThunk<Article[], undefined, ThunkAPI<string>>(
  `${NAME}/fetchArticles`,
  async (_, { rejectWithValue, extra }) => {
    const { api } = extra;

    try {
      const { data } = await api.get<Article[]>(ApiRoutes.ARTICLES, { params: {
        _expand: 'user',
      } });

      if (!data) {
        throw new Error();
      }

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
