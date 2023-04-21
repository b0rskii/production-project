export type ArticleComment = {
  id: string;
  text: string;
  articleId: string;
  userId: string;
};

export type ArticleCommentsSchema = {
  data: ArticleComment[];
  isLoading: boolean;
  error: string | null;
};
