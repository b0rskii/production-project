export type ArticleComment = {
  id: string;
  text: string;
  articleId: string;
  userId: string;
};

export type ArticleCommentsSchema = {
  comments: ArticleComment[];
  isLoading: boolean;
  error: string | null;
};
