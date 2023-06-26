import { ChangeEvent, memo, SelectHTMLAttributes } from 'react';
import { getClassNames } from '6_shared/utils/classNames';
import style from './Select.module.scss';

export type SelectOption = {
  value: string;
  content: string;
};

export type HTMLSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'value' | 'onChange' | 'label'
>;

interface SelectProps extends HTMLSelectProps {
  options: SelectOption[];
  className?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const Select = memo((props: SelectProps) => {
  const {
    className,
    label,
    options,
    value,
    onChange,
    ...otherProps
  } = props;

  const changeHandler = (evt: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(evt.target.value);
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
});
