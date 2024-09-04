import { RadioGroup as Radio } from '@headlessui/react';
import { getClassNames } from '@/6_shared/utils/classNames/getClassNames';
import style from './RadioGroup.module.scss';

export type RadioGroupItem = {
  id: string;
  name: string;
  value: string;
};

type Props = {
  className?: string;
  name: string;
  data: RadioGroupItem[];
  label?: string;
  defaultValue?: RadioGroupItem;
};

export const RadioGroup = ({
  className,
  data,
  label,
  name,
  defaultValue,
}: Props) => {
  return (
    <Radio
      className={getClassNames(style.radioGroup, {}, [className])}
      name={name}
      defaultValue={defaultValue ?? data[0]}
    >
      {label && <Radio.Label className={style.label}>{label}</Radio.Label>}
      <div className={style.options}>
        {data.map((item) => (
          <Radio.Option className={style.option} key={item.id} value={item}>
            {item.name}
          </Radio.Option>
        ))}
      </div>
    </Radio>
  );
};
