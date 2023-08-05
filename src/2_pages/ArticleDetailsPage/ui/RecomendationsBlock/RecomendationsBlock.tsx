import { PropsWithChildren, memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  ArticlesList, RECOMMENDED_ARTICLES_SLICE,
  recommendedArticlesReducer,
  recommendedArticlesSelectors,
  useGetRecommendedArticles,
} from '5_entities/Article';

import { getClassNames } from '6_shared/utils/classNames';
import { useAsyncReducer } from '6_shared/utils/redux';
import { Text } from '6_shared/ui/Text';
import style from './RecomendationsBlock.module.scss';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const RecomendationsBlock = memo((props: Props) => {
  const { className } = props;
  const { t } = useTranslation();

  useAsyncReducer(RECOMMENDED_ARTICLES_SLICE, recommendedArticlesReducer);
  const limit = useSelector(recommendedArticlesSelectors.getLimit);

  const { data: articles, isLoading, isError } = useGetRecommendedArticles(limit);

  return (
    <section className={getClassNames('', {}, [className])}>
      <Text title={t('Рекомендуем')} TitleTag="h3" />
      <ArticlesList
        className={style.list}
        articles={articles}
        isLoading={isLoading}
        error={isError ? 'error' : null}
        skeletonsCount={limit}
        target="_blank"
      />
    </section>
  );
});
