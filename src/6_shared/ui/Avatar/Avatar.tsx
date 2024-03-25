import { CSSProperties, PropsWithChildren, useMemo } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import { Image } from '@/6_shared/ui/Image';
import { Skeleton } from '@/6_shared/ui/Skeleton';
import cls from './Avatar.module.scss';

type AvatarProps = PropsWithChildren<{
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
}>;

export const Avatar = (props: AvatarProps) => {
  const { className, src, alt, size = 100 } = props;

  const style = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size]
  );

  return (
    <Image
      style={style}
      className={getClassNames(cls.avatar, {}, [className])}
      fallback={
        <Skeleton
          width={size}
          height={size}
          borderRadius="100%"
        />
      }
      src={src}
      alt={alt}
    />
  );
};
