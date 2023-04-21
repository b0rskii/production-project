import { PropsWithChildren, memo } from 'react';
import { useParams } from 'react-router-dom';
import { getClassNames } from 'shared/utils/classNames';
import { ArticleDetailsBlock } from './ArticleDetailsBlock';
import { ArticleCommentsBlock } from './ArticleCommentsBlock';
import style from './ArticleDetailsPage.module.scss';

type ArticleDetailsPageProps = PropsWithChildren<{
  className?: string;
}>;

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { id } = useParams();

  return (
    <div className={getClassNames('', {}, [className])}>
      <ArticleDetailsBlock articleId={id} />
      <ArticleCommentsBlock className={style.comments} articleId={id} />
    </div>
  );
};

export default memo(ArticleDetailsPage);
