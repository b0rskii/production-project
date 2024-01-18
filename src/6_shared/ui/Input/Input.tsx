import { InputHTMLAttributes, memo } from 'react';
import { getClassNames } from '6_shared/utils/classNames/getClassNames';
import style from './Input.module.scss';

export const InputMode = {
  DEFAULT: 'default',
  OUTLINE: 'outline',
} as const;

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>
type Mode = typeof InputMode.DEFAULT | typeof InputMode.OUTLINE;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  mode?: Mode;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string, name?: string) => void;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    mode = 'default',
    ...otherProps
  } = props;

  return (
    <input
      {...otherProps}
      className={getClassNames(style.input, {}, [className, style[mode]])}
      type={type}
      value={value}
      onChange={(evt) => onChange?.(evt.target.value, evt.target.name)}
    />
  );
});
