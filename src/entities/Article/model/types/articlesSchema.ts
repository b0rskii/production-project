import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticlesView } from './articleSchema';

export interface ArticlesSchema extends EntityState<Article> {
  isLoading: boolean;
  error: string | null;
  view: ArticlesView;
}
