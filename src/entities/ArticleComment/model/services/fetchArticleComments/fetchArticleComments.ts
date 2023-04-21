import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from 'app/providers/StoreProvider';
import { NAME } from '../../slice/articleCommentsSlice';
import { ArticleComment } from '../../types/articleCommentsSchema';

export const fetchArticleComments = createAsyncThunk<ArticleComment[], string, ThunkAPI<string>>(
  `${NAME}/fetchArticleComments`,
  async (articleId, { rejectWithValue, extra }) => {
    const { api } = extra;

    try {
      const { data } = await api.get<ArticleComment[]>(`/comments/${articleId}`);

      if (!data) {
        throw new Error();
      }

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
