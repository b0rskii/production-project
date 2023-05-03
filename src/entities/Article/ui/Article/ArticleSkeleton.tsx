import { PropsWithChildren } from 'react';
import { getClassNames } from 'shared/utils/classNames';
import { Skeleton } from 'shared/ui/Skeleton';
import { Card } from 'shared/ui/Card';
import { ListView } from 'shared/ui/ListViewSwitcher';
import style from './Article.module.scss';

type ArticleSkeletonProps = PropsWithChildren<{
  className?: string;
  view: ListView;
}>;

export const ArticleSkeleton = (props: ArticleSkeletonProps) => {
  const { className, view } = props;

  if (view === 'tiles') {
    return (
      <Card className={getClassNames(style.tileSkeleton, {}, [className])}>
        <Skeleton width={200} height={200} />
        <div className={style.infoWrapper}>
          <Skeleton width={130} height={20} />
          <Skeleton width={50} height={20} />
        </div>
        <Skeleton className={style.title} width={200} height={20} />
      </Card>
    );
  }

  return (
    <Card className={getClassNames(style.listSkeleton, {}, [className])}>
      <div className={style.header}>
        <Skeleton className={style.avatar} width={30} height={30} borderRadius="50%" />
        <Skeleton width={100} height={20} />
      </div>
      <Skeleton className={style.title} width={300} height={30} />
      <Skeleton className={style.types} width={200} height={20} />
      <Skeleton className={style.img} width="100%" height={250} />
      <Skeleton className={style.footer} width={200} height={30} />
    </Card>
  );
};
