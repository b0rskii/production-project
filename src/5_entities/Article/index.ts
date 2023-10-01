export {
  ARTICLE_SLICE_NAME as ARTICLE_SLICE,
  ARTICLES_SLICE_NAME as ARTICLES_SLICE,
  RECOMMENDATIONS_SLICE_NAME as RECOMMENDED_ARTICLES_SLICE,
} from './model/const';

export type { Article, ArticleSchema } from './model/types/articleSchema';
export { ArticleType } from './model/const';
export { articleReducer } from './model/slice/articleSlice';
export { fetchArticleById } from './model/services/fetchArticleById/fetchArticleById';
export { ArticleDetails } from './ui/ArticleDetails';

export type { ArticlesSchema } from './model/types/articlesSchema';
export {
  articlesReducer,
  articlesActions,
  ARTICLES_LIMIT,
} from './model/slice/articlesSlice';
export { fetchArticles } from './model/services/fetchArticles/fetchArticles';
export { ArticlesList } from './ui/ArticlesList';

export type { RecommendedArticlesSchema } from './model/types/recommendedArticlesSchema';
export { recommendedArticlesReducer } from './model/slice/recommendedArticlesSlice';
export {
  fetchRecommendedArticles,
} from './model/services/fetchRecommendedArticles/fetchRecommendedArticles';
export { useGetRecommendedArticles } from './api/recommendedArticlesApi';

export {
  articleSelectors,
  articlesSelectors,
  recommendedArticlesSelectors,
} from './model/selectors';

export { mockArticle, mockArticles, mockNormalizedArticles } from './model/mocks';
