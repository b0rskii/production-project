import { PropsWithChildren, memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CommentCardsList } from 'widgets/CommentCard';
import { AddCommentForm, sendArticleComment } from 'features/AddComment';
import { articleSelectors } from 'entities/Article';
import {
  ARTICLE_COMMENTS_SLICE,
  articleCommentsReducer,
  articleCommentsSelectors,
  fetchArticleComments,
} from 'entities/ArticleComment';
import { getClassNames } from 'shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from 'shared/utils/redux';
import { Text } from 'shared/ui/Text';

type ArticleCommentsBlockProps = PropsWithChildren<{
  className?: string;
  articleId?: string;
}>;

export const ArticleCommentsBlock = memo((props: ArticleCommentsBlockProps) => {
  const { className, articleId } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const article = useSelector(articleSelectors.getArticle);

  useAsyncReducer(ARTICLE_COMMENTS_SLICE, articleCommentsReducer);

  const comments = useSelector(articleCommentsSelectors.getArticleComments.selectAll);
  const isLoading = useSelector(articleCommentsSelectors.getIsLoading);
  const error = useSelector(articleCommentsSelectors.getError);

  useEffect(() => {
    if (articleId && article && __PROJECT__ !== 'storybook') {
      dispatch(fetchArticleComments(articleId));
    }
  }, [dispatch, articleId, article]);

  const sendCommentHandler = useCallback(() => {
    if (__PROJECT__ === 'storybook') {
      return;
    }

    dispatch(sendArticleComment({
      success: t('Комментарий добавлен'),
      error: t('Не удалось добавить комментарий'),
    }));
  }, [dispatch, t]);

  if (!article) {
    return null;
  }

  return (
    <section className={getClassNames('', {}, [className])}>
      <Text title={t('Комментарии')} />
      <AddCommentForm onSendComment={sendCommentHandler} />
      <CommentCardsList
        comments={comments}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
});
