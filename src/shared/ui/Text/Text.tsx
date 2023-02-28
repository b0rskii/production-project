import { FC } from 'react';
import { getClassNames } from 'shared/utils/classNames/getClassNames';
import style from './Text.module.scss';

export enum TextTheme {
  DEFAULT = 'default',
  ERROR = 'error',
}

type TextProps = {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
};

export const Text: FC<TextProps> = (props) => {
  const {
    className,
    title,
    text,
    theme = TextTheme.DEFAULT,
  } = props;

  return (
    <div className={getClassNames(style.text, {}, [className, style[theme]])}>
      {title && <p className={style.title}>{title}</p>}
      {text && <p className={style.text}>{text}</p>}
    </div>
  );
};
