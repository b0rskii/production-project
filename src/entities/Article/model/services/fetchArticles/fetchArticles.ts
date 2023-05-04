import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from 'app/providers/StoreProvider';
import { ApiRoutes } from 'shared/api';
import { NAME } from '../../slice/articleSlice';
import { Article } from '../../types/articleSchema';

export const fetchArticles = createAsyncThunk<Article[], number, ThunkAPI<string>>(
  `${NAME}/fetchArticles`,
  async (page, { rejectWithValue, extra, getState }) => {
    const { api } = extra;
    const state = getState();
    const limit = state.articles?.limit;

    if (!limit) {
      return rejectWithValue('error');
    }

    try {
      const { data } = await api.get<Article[]>(ApiRoutes.ARTICLES, { params: {
        _expand: 'user',
        _page: page,
        _limit: limit,
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
