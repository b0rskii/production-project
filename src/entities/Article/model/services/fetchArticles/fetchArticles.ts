import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from 'app/providers/StoreProvider';
import { ApiRoutes } from 'shared/api';
import { NAME } from '../../slice/articleSlice';
import { Article } from '../../types/articleSchema';
import { articlesActions } from '../../slice/articlesSlice';

export const fetchArticles = createAsyncThunk<Article[], undefined, ThunkAPI<string>>(
  `${NAME}/fetchArticles`,
  async (_, { rejectWithValue, extra, getState, dispatch }) => {
    const { api } = extra;
    const state = getState();
    const page = state.articles?.page;
    const limit = state.articles?.limit;

    if (page === undefined || !limit) {
      return rejectWithValue('error');
    }

    const currentPage = page + 1;

    try {
      const { data } = await api.get<Article[]>(ApiRoutes.ARTICLES, { params: {
        _expand: 'user',
        _page: currentPage,
        _limit: limit,
      } });

      if (!data) {
        throw new Error();
      }

      dispatch(articlesActions.setPage(currentPage));

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
