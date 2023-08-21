import { PropsWithChildren, memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CommentCardsList } from '3_widgets/CommentCard';
import { AddCommentForm, sendArticleComment } from '4_features/AddComment';
import {
  ARTICLE_COMMENTS_SLICE,
  articleCommentsReducer,
  articleCommentsSelectors,
  fetchArticleComments,
} from '5_entities/ArticleComment';
import { getClassNames } from '6_shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from '6_shared/utils/redux';
import { Text } from '6_shared/ui/Text';
import style from './ArticleCommentsBlock.module.scss';

type ArticleCommentsBlockProps = PropsWithChildren<{
  className?: string;
  articleId?: string;
}>;

const ArticleCommentsBlock = memo((props: ArticleCommentsBlockProps) => {
  const { className, articleId } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useAsyncReducer(ARTICLE_COMMENTS_SLICE, articleCommentsReducer);

  const comments = useSelector(articleCommentsSelectors.getArticleComments.selectAll);
  const isLoading = useSelector(articleCommentsSelectors.getIsLoading);
  const error = useSelector(articleCommentsSelectors.getError);

  const fetchComments = useCallback(() => {
    if (!articleId) return;
    dispatch(fetchArticleComments(articleId));
  }, [dispatch, articleId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const sendCommentHandler = useCallback(() => {
    dispatch(sendArticleComment({
      success: t('Комментарий добавлен'),
      error: t('Не удалось добавить комментарий'),
    }));
  }, [dispatch, t]);

  return (
    <section className={getClassNames('', {}, [className])}>
      <Text title={t('Комментарии')} TitleTag="h3" />
      <AddCommentForm
        className={style.addCommentForm}
        onSendComment={sendCommentHandler}
      />
      <CommentCardsList
        className={style.comments}
        comments={comments}
        isLoading={isLoading}
        error={error}
        onRepeatFetch={fetchComments}
      />
    </section>
  );
});

export default ArticleCommentsBlock;
