import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ListView } from '6_shared/ui/ListViewSwitcher';
import { ArticlesSchema } from '../types/articlesSchema';
import { Article } from '../types/articleSchema';
import { fetchArticles } from '../services/fetchArticles/fetchArticles';

export const ARTICLES_LIMIT = 12;

export const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article: Article) => article.id,
});

export const initialState = articlesAdapter.getInitialState<ArticlesSchema>({
  ids: [],
  entities: {},
  isLoading: false,
  error: null,
  view: 'tiles',
  page: 0,
  limit: ARTICLES_LIMIT,
  isHasMore: false,
});

export const SLICE_NAME = 'articles';

export const articlesSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<ListView>) => {
      const view = action.payload;
      state.view = view;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetArticles: (state) => {
      articlesAdapter.removeAll(state);
      state.page = 0;
      state.isHasMore = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        const { data, totalCount } = action.payload;
        state.error = null;
        state.isLoading = false;
        articlesAdapter.addMany(state, data);
        state.isHasMore = state.ids.length < Number(totalCount);
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.error = action.payload || null;
        state.isLoading = false;
      });
  },
});

export const {
  actions: articlesActions,
  reducer: articlesReducer,
} = articlesSlice;
