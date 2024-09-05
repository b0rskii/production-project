import { ReactNode, useId } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames/getClassNames';
import style from './CheckboxGroup.module.scss';

export type CheckboxGroupItem<T extends string> = {
  name: T;
  label?: string;
  checked?: boolean;
};

type Props = {
  className?: string;
  label?: string;
  children: ReactNode;
};

export const CheckboxGroup = ({ className, label, children }: Props) => {
  const id = useId();

  return (
    <fieldset
      className={getClassNames(style.checkboxGroup, {}, [className])}
      id={id}
    >
      {label && (
        <label className={style.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={style.checkboxes}>{children}</div>
    </fieldset>
  );
};
