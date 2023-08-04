export { SLICE_NAME as ARTICLE_COMMENTS_SLICE } from './model/const';
export { ArticleComment, ArticleCommentsSchema } from './model/types/articleCommentsSchema';
export { fetchArticleComments } from './model/services/fetchArticleComments/fetchArticleComments';
export { articleCommentsSelectors } from './model/selectors';
export { mockArticleComments, mockNormalizedArticleComments } from './model/mocks';
export { articleCommentsReducer, articleCommentsActions } from './model/slice/articleCommentsSlice';
