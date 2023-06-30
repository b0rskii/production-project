export { Article, ArticleSchema, ArticleType } from './model/types/articleSchema';
export { NAME as ARTICLE_SLICE, articleReducer } from './model/slice/articleSlice';
export { fetchArticleById } from './model/services/fetchArticleById/fetchArticleById';
export { ArticleDetails } from './ui/ArticleDetails';

export { ArticlesSchema } from './model/types/articlesSchema';
export {
  SLICE_NAME as ARTICLES_SLICE,
  articlesReducer,
  articlesActions,
  ARTICLES_LIMIT,
} from './model/slice/articlesSlice';
export { fetchArticles } from './model/services/fetchArticles/fetchArticles';
export { ArticlesList } from './ui/ArticlesList';

export { RecommendedArticlesSchema } from './model/types/recommendedArticlesSchema';
export {
  SLICE_NAME as RECOMMENDED_ARTICLES_SLICE,
  recommendedArticlesReducer,
} from './model/slice/recommendedArticlesSlice';
export {
  fetchRecommendedArticles,
} from './model/services/fetchRecommendedArticles/fetchRecommendedArticles';

export {
  articleSelectors,
  articlesSelectors,
  recommendedArticlesSelectors,
} from './model/selectors';

export { mockArticle, mockArticles, mockNormalizedArticles } from './model/mocks';
