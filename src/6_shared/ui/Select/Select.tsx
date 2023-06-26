import { ChangeEvent, SelectHTMLAttributes } from 'react';
import { getClassNames } from '6_shared/utils/classNames';
import style from './Select.module.scss';

export type SelectOption<T extends string> = {
  value: T;
  content: string;
};

export type HTMLSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'value' | 'onChange' | 'label'
>;

interface SelectProps<T extends string> extends HTMLSelectProps {
  options: SelectOption<T>[];
  className?: string;
  label?: string;
  value?: T;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: T) => void;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const {
    className,
    label,
    options,
    value,
    onChange,
    ...otherProps
  } = props;

  const changeHandler = (evt: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(evt.target.value as T);
  };

  return (
    <div className={getClassNames(style.wrapper, {}, [className])}>
      {label && (
        <span className={style.label}>
          {label}
          :
        </span>
      )}
      <select
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
        className={style.select}
        value={value}
        onChange={changeHandler}
      >
        {options.map(({ content, value }) => (
          <option
            className={style.option}
            value={value}
            key={value}
          >
            {content}
          </option>
        ))}
      </select>
    </div>
  );
};
