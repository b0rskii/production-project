import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from '1_app/providers/StoreProvider';
import { ApiRoutes } from '6_shared/api';
import { Article } from '../../types/articleSchema';
import { articlesActions } from '../../slice/articlesSlice';
import { ARTICLES_SLICE_NAME, ArticleType } from '../../const';

type Returned = {
  data: Article[];
  totalCount: string;
};

export const fetchArticles = createAsyncThunk<Returned, undefined, ThunkAPI<string>>(
  `${ARTICLES_SLICE_NAME}/fetchArticles`,
  async (_, { rejectWithValue, extra, getState, dispatch }) => {
    const { api } = extra;
    const state = getState();
    const page = state.articles?.page;
    const limit = state.articles?.limit;
    const sortingType = state.sortArticles?.sortingType;
    const sortingOrder = state.sortArticles?.sortingOrder;
    const currentSearch = state.filterArticles?.currentSearch;
    const type = state.filterArticles?.type;

    if (page === undefined || !limit) {
      return rejectWithValue('error');
    }

    const currentPage = page + 1;

    try {
      const { data, headers } = await api.get<Article[]>(ApiRoutes.ARTICLES, { params: {
        _expand: 'user',
        _page: currentPage,
        _limit: limit,
        _sort: sortingType,
        _order: sortingOrder,
        q: currentSearch,
        type: type !== ArticleType.ALL ? type : undefined,
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
