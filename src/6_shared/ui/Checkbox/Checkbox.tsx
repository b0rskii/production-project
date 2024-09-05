import { InputHTMLAttributes, PropsWithRef, useId } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames/getClassNames';
import style from './Checkbox.module.scss';

type Props = {
  className?: string;
  label?: string;
  checkboxProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>;
};

export const Checkbox = (props: Props) => {
  const { className, label, checkboxProps } = props;
  const id = useId();

  return (
    <div className={getClassNames(style.checkbox, {}, [className])}>
      <input {...checkboxProps} id={id} type="checkbox" />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
};
