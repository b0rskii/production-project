import { PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from 'shared/utils/classNames';
import { Loader } from 'shared/ui/Loader';
import { Text, TextTheme } from 'shared/ui/Text';
import { TranslationNameSpace } from 'shared/utils/i18n';
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
  const { t } = useTranslation([TranslationNameSpace.Translation, TranslationNameSpace.Article]);

  if (isLoading) {
    return (
      <div className={getClassNames(style.articleDetails, {}, [className, style.loading])}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={getClassNames(style.articleDetails, {}, [className, style.error])}>
        <Text
          title={t('При загрузке статьи произошла ошибка', { ns: TranslationNameSpace.Article })}
          text={t('Попробуйте обновить страницу')}
          theme={TextTheme.ERROR}
          align="center"
        />
      </div>
    );
  }

  return (
    <div className={getClassNames(style.articleDetails, {}, [className])}>
      {article?.title}
    </div>
  );
});
