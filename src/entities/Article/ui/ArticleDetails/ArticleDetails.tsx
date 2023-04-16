import { PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from 'shared/utils/classNames';
import { useAsyncReducer } from 'shared/utils/redux';
import { Loader } from 'shared/ui/Loader';
import { Text, TextTheme } from 'shared/ui/Text';
import { Article } from '../../model/types/articleSchema';
import { NAME, articleReducer } from '../../model/slice/articleSlice';
import style from './ArticleDetails.module.scss';

type ArticleDetailsProps = PropsWithChildren<{
  article: Article | null;
  isLoading: boolean;
  error: string | null;
  className?: string;
}>;

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { article, isLoading, error, className } = props;
  const { t } = useTranslation();

  useAsyncReducer(NAME, articleReducer);

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
          title={t('При загрузке статьи произошла ошибка', { context: 'article' })}
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
