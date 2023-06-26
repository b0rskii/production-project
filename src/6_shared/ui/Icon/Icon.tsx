import { PropsWithChildren } from 'react';
import { getClassNames } from '6_shared/utils/classNames';
import style from './Icon.module.scss';

type IconProps = PropsWithChildren<{
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}>;

export const Icon = (props: IconProps) => {
  const { className, Svg } = props;

  return (
    <Svg className={getClassNames(style.icon, {}, [className])} />
  );
};
