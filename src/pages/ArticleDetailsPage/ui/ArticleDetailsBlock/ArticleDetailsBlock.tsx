import { PropsWithChildren, memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ARTICLE_SLICE, ArticleDetails, articleReducer, articleSelectors, fetchArticleById,
} from 'entities/Article';
import { getClassNames } from 'shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from 'shared/utils/redux';

type ArticleDetailsBlockProps = PropsWithChildren<{
  className?: string;
  articleId?: string;
}>;

export const ArticleDetailsBlock = memo((props: ArticleDetailsBlockProps) => {
  const { className, articleId } = props;
  const dispatch = useAppDispatch();

  const article = useSelector(articleSelectors.getArticle);
  const isLoading = useSelector(articleSelectors.getIsLoading);
  const error = useSelector(articleSelectors.getError);

  useAsyncReducer(ARTICLE_SLICE, articleReducer);

  useEffect(() => {
    if (articleId && __PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(articleId));
    }
  }, [dispatch, articleId]);

  return (
    <div className={getClassNames('', {}, [className])}>
      <ArticleDetails
        article={article}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
});
