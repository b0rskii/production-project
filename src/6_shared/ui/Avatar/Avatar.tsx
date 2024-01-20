import { CSSProperties, PropsWithChildren, useMemo } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import cls from './Avatar.module.scss';

type AvatarProps = PropsWithChildren<{
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
}>;

export const Avatar = (props: AvatarProps) => {
  const {
    className,
    src,
    alt,
    size = 100,
  } = props;

  const style = useMemo<CSSProperties>(() => ({
    width: size,
    height: size,
  }), [size]);

  return (
    <img
      style={style}
      className={getClassNames(cls.avatar, {}, [className])}
      src={src}
      alt={alt}
    />
  );
};
