import { InputHTMLAttributes, memo } from 'react';
import { getClassNames } from '6_shared/utils/classNames/getClassNames';
import style from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string, name?: string) => void;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    ...otherProps
  } = props;

  return (
    <input
      {...otherProps}
      className={getClassNames(style.input, {}, [className])}
      type={type}
      value={value}
      onChange={(evt) => onChange?.(evt.target.value, evt.target.name)}
    />
  );
});
