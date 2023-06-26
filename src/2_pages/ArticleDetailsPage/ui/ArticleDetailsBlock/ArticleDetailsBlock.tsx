import { PropsWithChildren, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  ARTICLE_SLICE, ArticleDetails, articleReducer, articleSelectors, fetchArticleById,
} from '5_entities/Article';
import { getClassNames } from '6_shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from '6_shared/utils/redux';

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

  useEffect(() => {
    if (articleId && __PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(articleId));
    }
  }, [dispatch, articleId]);

  return (
    <section className={getClassNames('', {}, [className])}>
      <ArticleDetails
        article={article}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
});
