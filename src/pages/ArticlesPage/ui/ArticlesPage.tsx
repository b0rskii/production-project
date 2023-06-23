import { PropsWithChildren, memo } from 'react';
import { useSelector } from 'react-redux';
import { Page } from 'widgets/Page';
import { articlesSelectors, fetchArticles } from 'entities/Article';
import { useAppDispatch } from 'shared/utils/redux';
import { getClassNames } from 'shared/utils/classNames';
import { Header } from './Header';
import { ArticlesBlock } from './ArticlesBlock';

type ArticlesPageProps = PropsWithChildren<{
  className?: string;
}>;

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const isHasMore = useSelector(articlesSelectors.getIsHasMore);
  const isLoading = useSelector(articlesSelectors.getIsLoading);

  const scrollToPageBottomHandler = () => {
    if (__PROJECT__ === 'storybook' || !isHasMore || isLoading) {
      return;
    }
    dispatch(fetchArticles());
  };

  return (
    <Page
      className={getClassNames('', {}, [className])}
      onScrollToPageBottom={scrollToPageBottomHandler}
    >
      <Header />
      <ArticlesBlock />
    </Page>
  );
};

export default memo(ArticlesPage);
