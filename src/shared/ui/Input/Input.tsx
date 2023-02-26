import { FC, InputHTMLAttributes, memo } from 'react';
import { getClassNames } from 'shared/utils/classNames/getClassNames';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const Input: FC<InputProps> = memo((props: InputProps) => {
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
      className={getClassNames('', {}, [className])}
      type={type}
      value={value}
      onChange={(evt) => onChange?.(evt.target.value)}
    />
  );
});
