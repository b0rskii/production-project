import { PropsWithChildren, memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ArticleType, articlesActions, fetchArticles } from '5_entities/Article';
import { getClassNames } from '6_shared/utils/classNames';
import { useAppDispatch } from '6_shared/utils/redux';
import { Tab, Tabs } from '6_shared/ui/Tabs';
import { filterArticlesSelectors } from '../../model/selectors';
import { filterArticlesActions } from '../../model/slice/filterArticlesSlice';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const ArticlesFilterTabs = memo((props: Props) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const type = useSelector(filterArticlesSelectors.getType);

  const tabs: Tab[] = useMemo<Tab[]>(() => [
    { value: ArticleType.ALL, content: t('Все') },
    { value: ArticleType.IT, content: t('АйТи') },
    { value: ArticleType.SCIENCE, content: t('Наука') },
    { value: ArticleType.ECONOMY, content: t('Экономика') },
  ], [t]);

  const tabClickHandler = useCallback((tab: Tab) => {
    const tabValue = tab.value as ArticleType;

    dispatch(filterArticlesActions.setType(tabValue));
    dispatch(articlesActions.resetArticles());
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <Tabs
      className={getClassNames('', {}, [className])}
      tabs={tabs}
      activeTab={type}
      onTabClick={tabClickHandler}
    />
  );
});
