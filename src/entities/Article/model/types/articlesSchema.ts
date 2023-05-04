import { EntityState } from '@reduxjs/toolkit';
import { ListView } from 'shared/ui/ListViewSwitcher';
import { Article } from './articleSchema';

export interface ArticlesSchema extends EntityState<Article> {
  isLoading: boolean;
  error: string | null;
  view: ListView;
  page: number;
  limit: number;
  isHasMore: boolean;
}
