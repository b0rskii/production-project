export { SLICE_NAME as ADD_COMMENT_SLICE } from './model/const';
export type { AddCommentSchema } from './model/types/addCommentSchema';
export { AddCommentForm } from './ui/AddCommentForm';
export { sendArticleComment } from './model/services/sendArticleComment/sendArticleComment';
export { addCommentReducer } from './model/slice/addCommentSlice';
