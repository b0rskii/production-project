import { InputHTMLAttributes, PropsWithRef, useId } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames/getClassNames';
import style from './RadioGroup.module.scss';

export type RadioGroupItem<T extends string> = {
  label?: string;
  value: T;
};

type Props = {
  className?: string;
  data: RadioGroupItem<string>[];
  label?: string;
  defaultValue?: RadioGroupItem<string>;
  inputsProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>;
};

export const RadioGroup = ({
  className,
  data,
  label,
  defaultValue,
  inputsProps,
}: Props) => {
  const id = useId();

  return (
    <fieldset
      className={getClassNames(style.radioGroup, {}, [className])}
      id={id}
    >
      {label && (
        <label className={style.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={style.options}>
        {data.map(({ label, value }, i) => (
          <label className={style.option} htmlFor={id + i} key={value}>
            {label}
            <input
              {...inputsProps}
              id={id + i}
              type="radio"
              value={value}
              defaultChecked={
                defaultValue ? defaultValue.value === value : i === 0
              }
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
};
