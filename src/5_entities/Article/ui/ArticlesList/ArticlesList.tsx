/* eslint-disable react/no-array-index-key */
import { HTMLAttributeAnchorTarget, PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from '6_shared/utils/classNames';
import { I18nNameSpace } from '6_shared/utils/i18n/nameSpace';
import { Text, TextTheme } from '6_shared/ui/Text';
import { ListView } from '6_shared/ui/ListViewSwitcher';
import { Article as ArticleType } from '../../model/types/articleSchema';
import { Article } from '../Article';
import { ArticleSkeleton } from '../Article/ArticleSkeleton';
import style from './ArticlesList.module.scss';

type ArticlesListProps = PropsWithChildren<{
  className?: string;
  articles: ArticleType[];
  isLoading: boolean;
  error: string | null;
  skeletonsCount: number;
  view?: ListView;
  target?: HTMLAttributeAnchorTarget;
}>;

export const ArticlesList = memo((props: ArticlesListProps) => {
  const { className, articles, isLoading, error, skeletonsCount, target, view = 'tiles' } = props;
  const { t } = useTranslation([I18nNameSpace.Translation, I18nNameSpace.Article]);

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

  const getSkeletons = () => (
    new Array(skeletonsCount)
      .fill(0)
      .map((_, index) => <ArticleSkeleton view={view} key={index} />)
  );

  return (
    <div className={getClassNames(style[view], {}, [className])}>
      {articles.length
        ? articles.map((article) => (
          <Article
            data={article}
            view={view}
            target={target}
            key={article.id}
          />
        ))
        : null}
      {isLoading && getSkeletons()}
    </div>
  );
});
