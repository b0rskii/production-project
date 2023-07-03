import { PropsWithChildren, memo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Page } from '3_widgets/Page';
import { articleSelectors } from '5_entities/Article';
import { getClassNames } from '6_shared/utils/classNames';
import { Header } from './Header';
import { ArticleDetailsBlock } from './ArticleDetailsBlock';
import { RecomendationsBlock } from './RecomendationsBlock';
import { ArticleCommentsBlock } from './ArticleCommentsBlock';
import style from './ArticleDetailsPage.module.scss';

type ArticleDetailsPageProps = PropsWithChildren<{
  className?: string;
}>;

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { id } = useParams();

  const [isCommentsBlockShow, setIsCommentsBlockShow] = useState(false);

  const article = useSelector(articleSelectors.getArticle);

  const scrollToPageBottomHandler = () => {
    if (!isCommentsBlockShow && article && __PROJECT__ !== 'storybook') {
      setIsCommentsBlockShow(true);
    }
  };

  return (
    <Page
      className={getClassNames('', {}, [className])}
      onScrollToPageBottom={scrollToPageBottomHandler}
    >
      <Header />
      <ArticleDetailsBlock articleId={id} />
      <RecomendationsBlock className={style.block} />

      {isCommentsBlockShow && (
        <ArticleCommentsBlock className={style.block} articleId={id} />
      )}
    </Page>
  );
};

export default memo(ArticleDetailsPage);
