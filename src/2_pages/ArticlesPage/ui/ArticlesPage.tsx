import { PropsWithChildren, memo } from 'react';
import { useSelector } from 'react-redux';
import { Page } from '3_widgets/Page';
import { articlesSelectors, fetchArticles } from '5_entities/Article';
import { useAppDispatch } from '6_shared/utils/redux';
import { getClassNames } from '6_shared/utils/classNames';
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
