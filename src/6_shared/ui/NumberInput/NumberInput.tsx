import { ChangeEvent } from 'react';
import {
  useFormattedValueOnMount,
  getFormattedValueOnChange,
  getFormattedValueOnEditingEnd,
} from './model';

type Props = {
  minValue?: number;
  maxValue?: number;
  decimalRound?: number;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
};

export const NumberInput = ({
  minValue,
  maxValue,
  decimalRound,
  value,
  onChange,
}: Props) => {
  const currentValue = useFormattedValueOnMount({
    value,
    minValue,
    maxValue,
    decimalRound,
  });

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const formatedValue = getFormattedValueOnChange({
      newValue: evt.target.value,
      currentValue,
      minValue,
      maxValue,
      decimalRound,
    });
    onChange(formatedValue);
  };

  const handleBlur = () => {
    const formatedValue = getFormattedValueOnEditingEnd({
      currentValue,
      minValue,
      maxValue,
      decimalRound,
    });
    onChange(formatedValue);
  };

  return (
    <input value={currentValue} onChange={handleChange} onBlur={handleBlur} />
  );
};
