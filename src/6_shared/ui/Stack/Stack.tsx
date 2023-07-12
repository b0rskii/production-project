import { PropsWithChildren, useMemo } from 'react';
import { getClassNames } from '6_shared/utils/classNames';
import style from './Stack.module.scss';

type Props = PropsWithChildren<{
  className?: string;
  Tag: 'div' | 'section';
  mode: 'v' | 'h';
  justify: 'start' | 'center' | 'space-between' | 'end';
  align: 'start' | 'center' | 'end';
  gap: 's' | 'm' | 'l' | 'xl';
}>;

export const Stack = (props: Props) => {
  const {
    className,
    children,
    Tag = 'div',
    mode = 'h',
    justify = 'start',
    align = 'center',
    gap,
  } = props;

  const classes = useMemo(() => [
    className,
    style[mode],
    style[`justify-${justify}`],
    style[`align-${align}`],
    gap && style[`gap-${gap}`],
  ], [className, mode, justify, align, gap]);

  return (
    <Tag className={getClassNames(style.stack, {}, classes)}>
      {children}
    </Tag>
  );
};
