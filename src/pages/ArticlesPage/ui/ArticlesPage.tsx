import { PropsWithChildren, memo } from 'react';
import { getClassNames } from 'shared/utils/classNames';
import { Page } from 'shared/ui/Page';
import { Header } from './Header';
import { ArticlesBlock } from './ArticlesBlock';

type ArticlesPageProps = PropsWithChildren<{
  className?: string;
}>;

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;

  return (
    <Page className={getClassNames('', {}, [className])}>
      <Header />
      <ArticlesBlock />
    </Page>
  );
};

export default memo(ArticlesPage);
