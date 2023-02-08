import { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { getClassNames } from 'shared/utils/classNames';
import style from './Button.module.scss';

export enum ThemeButton {
  CLEAR = 'clear',
  DEFAULT = 'default',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    theme = ThemeButton.DEFAULT,
    ...otherProps
  } = props;

  return (
    <button
      {...otherProps}
      className={getClassNames(style.button, {}, [className, style[theme]])}
    >
      {children}
    </button>
 );
}
