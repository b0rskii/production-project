import { PropsWithChildren, memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRateArticle } from '@/4_features/RateArticle';
import { userSelectors } from '@/5_entities/User';
import { RatingCard, useGetArticleRating } from '@/5_entities/Rating';
import { Skeleton } from '@/6_shared/ui/Skeleton';
import { getClassNames } from '@/6_shared/utils/classNames';
import { I18nNameSpace } from '@/6_shared/utils/i18n/nameSpace';

type Props = PropsWithChildren<{
  className?: string;
  articleId: string;
}>;

export const RatingBlock = memo((props: Props) => {
  const { className, articleId } = props;
  const { t } = useTranslation([I18nNameSpace.Translation, I18nNameSpace.Article]);
  const userId = useSelector(userSelectors.getUserId);

  const { data, isLoading } = useGetArticleRating({
    userId: userId ?? '',
    articleId,
  });

  const [rateArticle] = useRateArticle();

  const handleAcceptRate = (rate: number, feedback?: string) => {
    rateArticle({
      userId: userId ?? '',
      articleId,
      rate,
      feedback,
    });
  };

  if (isLoading) {
    return <Skeleton className={getClassNames('', {}, [className])} height={100} />;
  }

  const rating = data?.[0];

  return (
    <RatingCard
      className={getClassNames('', {}, [className])}
      rate={rating?.rate}
      title={t('Как вам эта статья?', { ns: I18nNameSpace.Article })}
      feedbackTitle={t('Оставьте свой отзыв')}
      feedbackPlaceholder={t('Ваш отзыв')}
      hasFeedback
      onAccept={handleAcceptRate}
    />
  );
});
