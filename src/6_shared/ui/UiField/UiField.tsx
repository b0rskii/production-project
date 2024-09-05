import { InputHTMLAttributes, PropsWithRef, useId } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import style from './UiField.module.scss';

type Props = {
  className?: string;
  label?: string;
  error?: string;
  inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>;
};

export const UiField = ({ className, label, error, inputProps }: Props) => {
  const id = useId();

  return (
    <div className={getClassNames(style.uiField, {}, [className])}>
      {label && (
        <label className={style.label} htmlFor={id}>
          {label}
        </label>
      )}

      <input
        {...inputProps}
        className={getClassNames(style.input, {}, [inputProps?.className])}
        id={id}
      />

      {error && <div className={style.error}>{error}</div>}
    </div>
  );
};
