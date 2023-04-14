import { PropsWithChildren, memo } from 'react';
import { getClassNames } from 'shared/utils/classNames';
// import style from './ArticleDetailsPage.module.scss';

type ArticleDetailsPageProps = PropsWithChildren<{
  className?: string;
}>;

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;

  return (
    // eslint-disable-next-line i18next/no-literal-string
    <div className={getClassNames('', {}, [className])}>
      Article Details Page
    </div>
  );
};

export default memo(ArticleDetailsPage);
