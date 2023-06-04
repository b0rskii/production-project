import { PropsWithChildren, memo, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { articleSelectors } from 'entities/Article';
import { I18nNameSpace } from 'shared/utils/i18n/nameSpace';
import { getClassNames } from 'shared/utils/classNames';
import { RoutePath } from 'shared/config/routing';
import { Page } from 'shared/ui/Page';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { ArticleDetailsBlock } from './ArticleDetailsBlock';
import { ArticleCommentsBlock } from './ArticleCommentsBlock';
import style from './ArticleDetailsPage.module.scss';

type ArticleDetailsPageProps = PropsWithChildren<{
  className?: string;
}>;

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const navigate = useNavigate();
  const { className } = props;
  const { id } = useParams();
  const { t } = useTranslation(I18nNameSpace.Article);
  const [isCommentsBlockShow, setIsCommentsBlockShow] = useState(false);

  const article = useSelector(articleSelectors.getArticle);

  const toArticlesListButtonHandler = useCallback(() => {
    navigate(RoutePath.ARTICLES);
  }, [navigate]);

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
      <Button
        theme={ButtonTheme.OUTLINE}
        onClick={toArticlesListButtonHandler}
      >
        {t('К списку статей')}
      </Button>
      <ArticleDetailsBlock articleId={id} />
      {isCommentsBlockShow && (
        <ArticleCommentsBlock className={style.block} articleId={id} />
      )}
    </Page>
  );
};

export default memo(ArticleDetailsPage);
