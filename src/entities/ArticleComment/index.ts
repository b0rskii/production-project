export { ArticleComment, ArticleCommentsSchema } from './model/types/articleCommentsSchema';
export { fetchArticleComments } from './model/services/fetchArticleComments/fetchArticleComments';
export { articleCommentsSelectors } from './model/selectors';
export {
  NAME as ARTICLE_COMMENTS_SLICE,
  articleCommentsReducer,
} from './model/slice/articleCommentsSlice';
