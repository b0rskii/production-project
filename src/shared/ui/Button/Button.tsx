import { FC, ButtonHTMLAttributes } from 'react';
import { getClassNames } from 'shared/utils/classNames';
import style from './Button.module.scss';

export enum ButtonTheme {
  DEFAULT = 'default',
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_INVERTED = 'outlineInverted',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  size?: 'm' | 'l' | 'xl';
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    theme = ButtonTheme.DEFAULT,
    square,
    size = 'm',
    ...otherProps
  } = props;

  const modes = {
    [style.square]: square,
  };

  return (
    <button
      {...otherProps}
      type="button"
      className={getClassNames(
        style.button,
        modes,
        [className, style[theme], style[`size_${size}`]],
      )}
    >
      {children}
    </button>
  );
};
