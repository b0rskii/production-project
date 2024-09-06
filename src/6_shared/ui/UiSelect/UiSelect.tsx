import { PropsWithRef, SelectHTMLAttributes, useId } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import style from './UiSelect.module.scss';

export type SelectOption<T extends string> = {
  value: T;
  content: string;
};

type Props<T extends string> = {
  className?: string;
  label?: string;
  options: SelectOption<T>[];
  defaultValue?: SelectOption<T>;
  selectProps?: PropsWithRef<SelectHTMLAttributes<HTMLSelectElement>>;
};

export const UiSelect = <T extends string>({
  className,
  label,
  options,
  defaultValue,
  selectProps,
}: Props<T>) => {
  const id = useId();
  const initialValue = defaultValue ? defaultValue.value : options[0].value;

  return (
    <div className={getClassNames(style.wrapper, {}, [className])}>
      {label && (
        <label className={style.label} htmlFor={id}>
          {label}
        </label>
      )}
      <select
        {...selectProps}
        className={style.select}
        id={id}
        defaultValue={initialValue}
      >
        {options.map(({ content, value }) => {
          return (
            <option className={style.option} value={value} key={value}>
              {content}
            </option>
          );
        })}
      </select>
    </div>
  );
};
