import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from '@/1_app/providers/StoreProvider';
import { ApiRoutes } from '@/6_shared/api';
import { Article } from '../../types/articleSchema';
import { RECOMMENDATIONS_SLICE_NAME } from '../../const';

export const fetchRecommendedArticles = createAsyncThunk<Article[], undefined, ThunkAPI<string>>(
  `${RECOMMENDATIONS_SLICE_NAME}/fetchRecommendedArticles`,
  async (_, { rejectWithValue, extra, getState }) => {
    const { api } = extra;
    const state = getState();
    const limit = state.recommendedArticles?.limit;

    if (!limit) {
      return rejectWithValue('error');
    }

    try {
      const { data } = await api.get<Article[]>(ApiRoutes.ARTICLES, { params: {
        _expand: 'user',
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
