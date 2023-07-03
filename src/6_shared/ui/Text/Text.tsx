/* eslint-disable no-unused-vars */
import { memo } from 'react';
import { getClassNames } from '6_shared/utils/classNames/getClassNames';
import style from './Text.module.scss';

export enum TextTheme {
  DEFAULT = 'default',
  BG_COLOR = 'bgColor',
  ERROR = 'error',
}

type TextAlign = 'start' | 'center' | 'end';
type TextSize = 'm' | 'l';

type TextProps = {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
};

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    theme = TextTheme.DEFAULT,
    align = 'left',
    size = 'm',
  } = props;

  return (
    <div className={getClassNames(
      style.text,
      {},
      [className, style[theme], style[align], style[`size_${size}`]],
    )}
    >
      {title && <p className={style.title}>{title}</p>}
      {text && <p className={style.text}>{text}</p>}
    </div>
  );
});
