/* eslint-disable react/no-array-index-key */
import { PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from 'shared/utils/classNames';
import { I18nNameSpace } from 'shared/utils/i18n/nameSpace';
import { Text, TextTheme } from 'shared/ui/Text';
import { ListView } from 'shared/ui/ListViewSwitcher';
import { Article as ArticleType } from '../../model/types/articleSchema';
import { Article } from '../Article';
import { ArticleSkeleton } from '../Article/ArticleSkeleton';
import style from './ArticlesList.module.scss';

const SkeletonsCount = {
  TILES: 18,
  LIST: 3,
} as const;

type ArticlesListProps = PropsWithChildren<{
  className?: string;
  articles: ArticleType[];
  isLoading: boolean;
  error: string | null;
  view?: ListView;
}>;

export const ArticlesList = memo((props: ArticlesListProps) => {
  const { className, articles, isLoading, error, view = 'tiles' } = props;
  const { t } = useTranslation([I18nNameSpace.Translation, I18nNameSpace.Article]);

  if (isLoading) {
    return (
      <div className={getClassNames(style[view], {}, [className])}>
        {
          new Array(view === 'tiles' ? SkeletonsCount.TILES : SkeletonsCount.LIST)
            .fill(0)
            .map((_, index) => <ArticleSkeleton view={view} key={index} />)
        }
      </div>
    );
  }

  if (error) {
    return (
      <div className={getClassNames('', {}, [className])}>
        <Text
          title={t('При загрузке статей произошла ошибка', { ns: I18nNameSpace.Article })}
          text={t('Попробуйте обновить страницу')}
          theme={TextTheme.ERROR}
          align="center"
        />
      </div>
    );
  }

  return (
    <div className={getClassNames(style[view], {}, [className])}>
      {articles.length
        ? articles.map((article) => (
          <Article data={article} view={view} key={article.id} />
        ))
        : null}
    </div>
  );
});
