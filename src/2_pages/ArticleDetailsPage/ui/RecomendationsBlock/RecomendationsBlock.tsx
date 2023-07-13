import { PropsWithChildren, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  ArticlesList, RECOMMENDED_ARTICLES_SLICE,
  fetchRecommendedArticles,
  recommendedArticlesReducer,
  recommendedArticlesSelectors,
} from '5_entities/Article';

import { getClassNames } from '6_shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from '6_shared/utils/redux';
import { Text } from '6_shared/ui/Text';
import style from './RecomendationsBlock.module.scss';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const RecomendationsBlock = memo((props: Props) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useAsyncReducer(RECOMMENDED_ARTICLES_SLICE, recommendedArticlesReducer);

  const articles = useSelector(recommendedArticlesSelectors.getRecommendedArticles.selectAll);
  const isLoading = useSelector(recommendedArticlesSelectors.getIsLoading);
  const error = useSelector(recommendedArticlesSelectors.getError);
  const limit = useSelector(recommendedArticlesSelectors.getLimit);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchRecommendedArticles());
    }
  }, [dispatch]);

  return (
    <section className={getClassNames('', {}, [className])}>
      <Text title={t('Рекомендуем')} TitleTag="h3" />
      <ArticlesList
        className={style.list}
        articles={articles}
        isLoading={isLoading}
        error={error}
        skeletonsCount={limit}
        target="_blank"
      />
    </section>
  );
});
