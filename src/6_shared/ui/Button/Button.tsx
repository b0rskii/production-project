/* eslint-disable no-unused-vars */
import { ButtonHTMLAttributes, memo } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import style from './Button.module.scss';

export enum ButtonTheme {
  DEFAULT = 'default',
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outlineRed',
  OUTLINE_INVERTED = 'outlineInverted',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  hasHover?: boolean;
  size?: 'm' | 'l' | 'xl';
  'data-testid'?: string;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    theme = ButtonTheme.DEFAULT,
    square,
    hasHover = true,
    size = 'm',
    type = 'button',
    'data-testid': dataTestid = 'Button',
    ...otherProps
  } = props;

  const modes = {
    [style.square]: square,
    [style.hasHover]: hasHover,
  };

  return (
    <button
      {...otherProps}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={getClassNames(
        style.button,
        modes,
        [className, style[theme], style[`size_${size}`]],
      )}
      data-testid={dataTestid}
    >
      {children}
    </button>
  );
});
