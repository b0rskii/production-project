import { PropsWithChildren, memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ARTICLE_SLICE, ArticleDetails, articleReducer, articleSelectors, fetchArticleById,
} from 'entities/Article';
import { getClassNames } from 'shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from 'shared/utils/redux';
// import style from './ArticleDetailsBlock.module.scss';

type ArticleDetailsBlockProps = PropsWithChildren<{
  className?: string;
}>;

export const ArticleDetailsBlock = memo((props: ArticleDetailsBlockProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const article = useSelector(articleSelectors.getArticle);
  const isLoading = useSelector(articleSelectors.getIsLoading);
  const error = useSelector(articleSelectors.getError);

  useAsyncReducer(ARTICLE_SLICE, articleReducer);

  useEffect(() => {
    if (id && __PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

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
