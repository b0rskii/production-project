import { ChangeEvent, memo, PropsWithChildren } from 'react';
import { getClassNames } from 'shared/utils/classNames';
import style from './Select.module.scss';

export type SelectOption = {
  value: string;
  content: string;
};

type SelectProps = PropsWithChildren<{
  options: SelectOption[];
  className?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}>;

export const Select = memo((props: SelectProps) => {
  const { className, label, options, value, onChange } = props;

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
