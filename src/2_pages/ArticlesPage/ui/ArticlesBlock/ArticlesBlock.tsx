import { PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  ARTICLES_LIMIT,
  ARTICLES_SLICE,
  ArticlesList,
  articlesActions,
  articlesReducer,
  articlesSelectors,
  fetchArticles,
} from '5_entities/Article';
import { getClassNames } from '6_shared/utils/classNames';
import { useAppDispatch, useAsyncReducer } from '6_shared/utils/redux';
import { LocalStorageKey } from '6_shared/const/localStorage';
import { I18nNameSpace } from '6_shared/utils/i18n/nameSpace';
import { ListView } from '6_shared/ui/ListViewSwitcher';
import { Text } from '6_shared/ui/Text';
import style from './ArticlesBlock.module.scss';

let isInit = true;

type ArticlesBlockProps = PropsWithChildren<{
  className?: string;
}>;

export const ArticlesBlock = (props: ArticlesBlockProps) => {
  const { className } = props;
  const { t } = useTranslation(I18nNameSpace.Article);
  const dispatch = useAppDispatch();

  useAsyncReducer(ARTICLES_SLICE, articlesReducer, false);

  const articles = useSelector(articlesSelectors.getArticles.selectAll);
  const view = useSelector(articlesSelectors.getView);
  const isLoading = useSelector(articlesSelectors.getIsLoading);
  const error = useSelector(articlesSelectors.getError);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      if (isInit) {
        const localArticlesView = localStorage.getItem(
          LocalStorageKey.ARTICLES_VIEW,
        ) as ListView | null;

        if (localArticlesView) dispatch(articlesActions.setView(localArticlesView));

        dispatch(fetchArticles());

        isInit = false;
      }
    }
  }, [dispatch]);

  if (!isLoading && !error && !articles.length) {
    return (
      <section className={getClassNames(style.articlesBlock, {}, [className])}>
        <Text title={t('Статьи не найдены')} align="center" />
      </section>
    );
  }

  return (
    <section className={getClassNames(style.articlesBlock, {}, [className])}>
      <ArticlesList
        articles={articles}
        view={view}
        isLoading={isLoading}
        error={error}
        skeletonsCount={ARTICLES_LIMIT}
      />
    </section>
  );
};
