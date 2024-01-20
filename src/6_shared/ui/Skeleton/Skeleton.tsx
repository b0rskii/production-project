import { CSSProperties, PropsWithChildren } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import style from './Skeleton.module.scss';

type SkeletonProps = PropsWithChildren<{
  className?: string;
  height?: string | number;
  width?: string | number;
  borderRadius?: string;
}>;

export const Skeleton = (props: SkeletonProps) => {
  const { className, height, width, borderRadius } = props;

  const styles: CSSProperties = {
    width,
    height,
    borderRadius,
  };

  return (
    <div
      className={getClassNames(style.skeleton, {}, [className])}
      style={styles}
    />
  );
};
