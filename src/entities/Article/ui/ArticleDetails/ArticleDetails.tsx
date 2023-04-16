import { PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from 'shared/utils/classNames';
import { Text, TextTheme } from 'shared/ui/Text';
import { Skeleton } from 'shared/ui/Skeleton';
import { I18nNameSpace } from 'shared/utils/i18n/nameSpace';
import { Article } from '../../model/types/articleSchema';
import style from './ArticleDetails.module.scss';

type ArticleDetailsProps = PropsWithChildren<{
  article: Article | null;
  isLoading: boolean;
  error: string | null;
  className?: string;
}>;

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { article, isLoading, error, className } = props;
  const { t } = useTranslation([I18nNameSpace.Translation, I18nNameSpace.Article]);

  if (isLoading) {
    return (
      <div className={getClassNames('', {}, [className])}>
        <Skeleton className={style.avatar} width={200} height={200} borderRadius="50%" />
        <Skeleton className={style.title} width={300} height={32} />
        <Skeleton className={style.skeleton} width={600} height={24} />
        <Skeleton className={style.skeleton} width="100%" height={200} />
        <Skeleton className={style.skeleton} width="100%" height={200} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={getClassNames('', {}, [className, style.error])}>
        <Text
          title={t('При загрузке статьи произошла ошибка', { ns: I18nNameSpace.Article })}
          text={t('Попробуйте обновить страницу')}
          theme={TextTheme.ERROR}
          align="center"
        />
      </div>
    );
  }

  return (
    <div className={getClassNames('', {}, [className])}>
      {article?.title}
    </div>
  );
});
