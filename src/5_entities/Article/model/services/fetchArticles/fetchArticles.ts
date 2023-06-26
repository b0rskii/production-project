import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from '1_app/providers/StoreProvider';
import { ApiRoutes } from '6_shared/api';
import { NAME } from '../../slice/articleSlice';
import { Article } from '../../types/articleSchema';
import { articlesActions } from '../../slice/articlesSlice';

type Returned = {
  data: Article[];
  totalCount: string;
};

export const fetchArticles = createAsyncThunk<Returned, undefined, ThunkAPI<string>>(
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
      const { data, headers } = await api.get<Article[]>(ApiRoutes.ARTICLES, { params: {
        _expand: 'user',
        _page: currentPage,
        _limit: limit,
      } });

      if (!data) {
        throw new Error();
      }

      dispatch(articlesActions.setPage(currentPage));

      return {
        data,
        totalCount: headers['x-total-count'],
      };
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
