import { ChangeEvent, InputHTMLAttributes, memo, useState } from 'react';
import { getClassNames } from '6_shared/utils/classNames/getClassNames';
import style from './Field.module.scss';

export const FieldMode = {
  DEFAULT: 'default',
  OUTLINE: 'outline',
} as const;

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>
type Mode = typeof FieldMode.DEFAULT | typeof FieldMode.OUTLINE;

interface Props extends HTMLInputProps {
  className?: string;
  initialValue?: string | number;
  mode?: Mode;
  isContentSize?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string, name?: string) => void;
  'data-testid'?: string;
}

export const Field = memo((props: Props) => {
  const {
    className,
    initialValue = '',
    type = 'text',
    mode = 'default',
    isContentSize = true,
    onChange,
    'data-testid': dataTestid = 'Field',
    ...otherProps
  } = props;

  const [value, setValue] = useState(initialValue);

  const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
    onChange?.(evt.target.value, evt.target.name);
  };

  return (
    <input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      className={getClassNames(style.field, {}, [className, style[mode]])}
      type={type}
      value={value}
      size={isContentSize ? String(value).length : undefined}
      onChange={changeHandler}
      data-testid={dataTestid}
    />
  );
});
