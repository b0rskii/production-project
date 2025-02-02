import { ChangeEvent } from 'react';
import {
  useDisplayedValue,
  getFormattedValueOnChange,
  getFormattedValueOnBlur,
} from './model';

type Props = {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  decimalScale?: number;
  minValue?: number;
  maxValue?: number;
};

export const NumberInput = ({
  value,
  onChange,
  decimalScale,
  minValue = Number.MIN_SAFE_INTEGER,
  maxValue = Number.MAX_SAFE_INTEGER,
}: Props) => {
  const displayedValue = useDisplayedValue({
    value,
    minValue,
    maxValue,
    decimalScale,
  });

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const formatedValue = getFormattedValueOnChange({
      newValue: evt.target.value,
      currentValue: value,
      minValue,
      maxValue,
    });
    onChange(formatedValue);
  };

  const handleBlur = () => {
    const formatedValue = getFormattedValueOnBlur({
      currentValue: value,
      minValue,
      maxValue,
      decimalScale,
    });
    onChange(formatedValue);
  };

  return (
    <input value={displayedValue} onChange={handleChange} onBlur={handleBlur} />
  );
};
