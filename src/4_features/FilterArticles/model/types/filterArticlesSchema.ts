import { ArticleType } from '5_entities/Article';

export type FilterArticlesSchema = {
  search: string;
  type: ArticleType;
};
