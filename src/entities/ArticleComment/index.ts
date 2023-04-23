export { ArticleComment, ArticleCommentsSchema } from './model/types/articleCommentsSchema';
export { fetchArticleComments } from './model/services/fetchArticleComments/fetchArticleComments';
export { articleCommentsSelectors } from './model/selectors';
export { mockArticleComments } from './model/mocks';
export {
  NAME as ARTICLE_COMMENTS_SLICE,
  articleCommentsReducer,
} from './model/slice/articleCommentsSlice';
