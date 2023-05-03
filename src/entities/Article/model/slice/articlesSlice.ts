import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ListView } from 'shared/ui/ListViewSwitcher';
import { LocalStorageKey } from 'shared/const/localStorage';
import { ArticlesSchema } from '../types/articlesSchema';
import { Article } from '../types/articleSchema';
import { fetchArticles } from '../services/fetchArticles/fetchArticles';

export const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article: Article) => article.id,
});

export const initialState = articlesAdapter.getInitialState<ArticlesSchema>({
  ids: [],
  entities: {},
  isLoading: false,
  error: null,
  view: 'tiles',
});

export const SLICE_NAME = 'articles';

export const articlesSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    initState: (state) => {
      const localViewValue = localStorage.getItem(LocalStorageKey.ARTICLES_VIEW) as ListView | null;
      if (localViewValue) state.view = localViewValue;
    },
    setView: (state, action: PayloadAction<ListView>) => {
      const newValue = action.payload;
      state.view = newValue;
      localStorage.setItem(LocalStorageKey.ARTICLES_VIEW, newValue);
    },
    resetArticles: (state) => {
      articlesAdapter.removeAll(state);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.error = null;
        articlesAdapter.removeAll(state);
        state.isLoading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        articlesAdapter.setAll(state, action.payload);
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
