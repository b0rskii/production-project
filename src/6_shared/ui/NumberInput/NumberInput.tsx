import { ChangeEvent } from 'react';
import {
  useFormattedValueOnMount,
  getFormattedValueOnChange,
  getFormattedValueOnBlur,
} from './model';

type Props = {
  minValue?: number;
  maxValue?: number;
  decimalScale?: number;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
};

export const NumberInput = ({
  decimalScale,
  value,
  onChange,
  minValue = Number.MIN_SAFE_INTEGER,
  maxValue = Number.MAX_SAFE_INTEGER,
}: Props) => {
  const currentValue = useFormattedValueOnMount({
    value,
    minValue,
    maxValue,
    decimalScale,
  });

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const formatedValue = getFormattedValueOnChange({
      newValue: evt.target.value,
      currentValue,
      minValue,
      maxValue,
    });
    onChange(formatedValue);
  };

  const handleBlur = () => {
    const formatedValue = getFormattedValueOnBlur({
      currentValue,
      minValue,
      maxValue,
      decimalScale,
    });
    onChange(formatedValue);
  };

  return (
    <input value={currentValue} onChange={handleChange} onBlur={handleBlur} />
  );
};
