import { PropsWithChildren, useMemo } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import style from './Stack.module.scss';

type Props = PropsWithChildren<{
  className?: string;
  Tag?: 'div' | 'section';
  mode?: 'v' | 'h';
  justify?: 'start' | 'center' | 'space-between' | 'end';
  align?: 'start' | 'center' | 'end';
  gap?: 's' | 'm' | 'l' | 'xl';
  maxWidth?: boolean;
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
    maxWidth,
  } = props;

  const modes = useMemo(() => ({
    [style.maxWidth]: maxWidth,
  }), [maxWidth]);

  const classes = useMemo(() => [
    className,
    style[mode],
    style[`justify-${justify}`],
    style[`align-${align}`],
    gap && style[`gap-${gap}`],
  ], [className, mode, justify, align, gap]);

  return (
    <Tag className={getClassNames(style.stack, modes, classes)}>
      {children}
    </Tag>
  );
};
