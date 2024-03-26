import {
  ImgHTMLAttributes,
  ReactElement,
  memo,
  useLayoutEffect,
  useState,
} from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  className?: string;
  fallback?: ReactElement;
  errorFallback?: ReactElement;
};

export const AppImage = memo((props: Props) => {
  const {
    className,
    fallback,
    errorFallback,
    src = '',
    alt = '',
    ...otherProps
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useLayoutEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [src]);

  if (isLoading && fallback) {
    return fallback;
  }

  if (hasError && errorFallback) {
    return errorFallback;
  }

  return (
    <img
      {...otherProps}
      className={getClassNames('', {}, [className])}
      src={src}
      alt={alt}
    />
  );
});
