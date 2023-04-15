import { PropsWithChildren, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getClassNames } from 'shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from 'shared/utils/redux';
import { NAME, articleReducer } from '../../model/slice/articleSlice';
import { articleSelectors } from '../../model/selectors';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import style from './ArticleDetails.module.scss';

type ArticleDetailsProps = PropsWithChildren<{
  className?: string;
}>;

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const { id } = useParams<string>();

  const article = useSelector(articleSelectors.getArticle);
  const isLoading = useSelector(articleSelectors.getIsLoading);
  const error = useSelector(articleSelectors.getError);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  useAsyncReducer(NAME, articleReducer);

  return (
    // eslint-disable-next-line i18next/no-literal-string
    <div className={getClassNames(style.articleDetails, {}, [className])}>
      {article?.id}
    </div>
  );
});
