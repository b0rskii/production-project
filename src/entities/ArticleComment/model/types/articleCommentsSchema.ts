import { EntityState } from '@reduxjs/toolkit';
import { User } from 'entities/User';
import { Comment } from 'shared/types/comment';

export interface ArticleComment extends Comment {
  id: string;
  text: string;
  articleId: string;
  userId: string;
  user: User;
}

export interface ArticleCommentsSchema extends EntityState<ArticleComment> {
  isLoading: boolean;
  error: string | null;
}
