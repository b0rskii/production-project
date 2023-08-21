import { PropsWithChildren, memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  ARTICLE_SLICE, ArticleDetails, articleReducer, articleSelectors, fetchArticleById,
} from '5_entities/Article';
import { getClassNames } from '6_shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from '6_shared/utils/redux';
import style from './ArticleDetailsBlock.module.scss';

type ArticleDetailsBlockProps = PropsWithChildren<{
  className?: string;
  articleId?: string;
}>;

export const ArticleDetailsBlock = memo((props: ArticleDetailsBlockProps) => {
  const { className, articleId } = props;
  const dispatch = useAppDispatch();

  useAsyncReducer(ARTICLE_SLICE, articleReducer);

  const article = useSelector(articleSelectors.getArticle);
  const isLoading = useSelector(articleSelectors.getIsLoading);
  const error = useSelector(articleSelectors.getError);

  const fetchArticle = useCallback(() => {
    if (!articleId) return;
    dispatch(fetchArticleById(articleId));
  }, [articleId, dispatch]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  return (
    <section className={getClassNames(style.articleDetailsBlock, {}, [className])}>
      <ArticleDetails
        article={article}
        isLoading={isLoading}
        error={error}
        onRepeatFetch={fetchArticle}
      />
    </section>
  );
});
