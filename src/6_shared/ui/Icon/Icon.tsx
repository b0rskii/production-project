import { PropsWithChildren, SVGProps } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import style from './Icon.module.scss';

type IconProps = PropsWithChildren<{
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
  inverted?: boolean;
}> & SVGProps<SVGSVGElement>;

export const Icon = (props: IconProps) => {
  const { className, Svg, inverted, ...otherProps } = props;

  return (
    <Svg
      {...otherProps}
      className={getClassNames(style.icon, { [style.inverted]: inverted }, [className])}
    />
  );
};
