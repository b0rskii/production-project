import { EntityState } from '@reduxjs/toolkit';
import { Article } from './articleSchema';

export interface RecommendedArticlesSchema extends EntityState<Article> {
  isLoading: boolean;
  error: string | null;
  limit: number;
}
