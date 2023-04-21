import { User } from 'entities/User';

export type ArticleComment = {
  id: string;
  text: string;
  articleId: string;
  userId: string;
  user: User;
};

export type ArticleCommentsSchema = {
  data: ArticleComment[];
  isLoading: boolean;
  error: string | null;
};
