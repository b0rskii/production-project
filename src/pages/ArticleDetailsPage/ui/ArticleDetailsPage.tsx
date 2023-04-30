import { PropsWithChildren, memo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { I18nNameSpace } from 'shared/utils/i18n/nameSpace';
import { getClassNames } from 'shared/utils/classNames';
import { RoutePath } from 'shared/config/routing';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { ArticleDetailsBlock } from './ArticleDetailsBlock';
import { ArticleCommentsBlock } from './ArticleCommentsBlock';
import style from './ArticleDetailsPage.module.scss';

type ArticleDetailsPageProps = PropsWithChildren<{
  className?: string;
}>;

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { id } = useParams();
  const { t } = useTranslation(I18nNameSpace.Article);
  const navigate = useNavigate();

  const toArticlesListButtonHandler = useCallback(() => {
    navigate(RoutePath.ARTICLES);
  }, [navigate]);

  return (
    <div className={getClassNames('', {}, [className])}>
      <Button
        theme={ButtonTheme.OUTLINE}
        onClick={toArticlesListButtonHandler}
      >
        {t('К списку статей')}
      </Button>
      <ArticleDetailsBlock articleId={id} />
      <ArticleCommentsBlock className={style.block} articleId={id} />
    </div>
  );
};

export default memo(ArticleDetailsPage);
