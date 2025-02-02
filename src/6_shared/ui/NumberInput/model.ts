import { useRef } from 'react';
import {
  fixLeadingZeros,
  decimalSeparatorToNumber,
  decimalSeparatorToString,
  roundNumber,
} from './utils';

type FormattedValueOnMountProps = {
  value: string;
  minValue?: number;
  maxValue?: number;
  decimalRound?: number;
};

export const useFormattedValueOnMount = ({
  value,
  minValue,
  maxValue,
  decimalRound,
}: FormattedValueOnMountProps) => {
  const isInitialRenderRef = useRef(true);

  if (isInitialRenderRef.current) {
    isInitialRenderRef.current = false;

    const numValue = Number(decimalSeparatorToNumber(value));

    if (minValue !== undefined && numValue < minValue) {
      return decimalSeparatorToString(minValue.toString());
    }

    if (maxValue !== undefined && numValue > maxValue) {
      return decimalSeparatorToString(maxValue.toString());
    }

    return roundNumber(numValue, decimalRound).toString();
  }

  return value;
};

type OnChangeFormatterProps = {
  newValue: string;
  currentValue: string;
  minValue?: number;
  maxValue?: number;
};

export const getFormattedValueOnChange = ({
  newValue,
  currentValue,
  minValue,
  maxValue,
}: OnChangeFormatterProps) => {
  const newNumValue = Number(decimalSeparatorToNumber(newValue));

  // Если новое значение не число, оставляем текущее значение без изменений
  if (Number.isNaN(newNumValue)) {
    return currentValue;
  }

  let formatedValue = fixLeadingZeros(newValue);

  if (minValue !== undefined) {
    const isMinValueFractionalZero = minValue > 0 && minValue < 1;

    // Автоматическое подставление запятой при вводе нуля, если минимальное значение 0,(...)
    if (isMinValueFractionalZero && newValue === '0' && currentValue !== '0,') {
      formatedValue = '0,';
    }

    if (
      !isMinValueFractionalZero &&
      newNumValue < minValue &&
      newValue !== ''
    ) {
      formatedValue = minValue.toString();
    }
  }

  if (maxValue !== undefined && newNumValue >= maxValue) {
    formatedValue = maxValue.toString();
  }

  return decimalSeparatorToString(formatedValue);
};

type OnBlurFormatterProps = {
  currentValue: string;
  minValue?: number;
  maxValue?: number;
  decimalRound?: number;
};

export const getFormattedValueOnBlur = ({
  currentValue,
  minValue,
  maxValue,
  decimalRound,
}: OnBlurFormatterProps) => {
  const currentNumValue = Number(decimalSeparatorToNumber(currentValue));
  let formatedNumValue = currentNumValue;

  if (minValue !== undefined && currentNumValue <= minValue) {
    formatedNumValue = minValue;
  }

  if (maxValue !== undefined && currentNumValue >= maxValue) {
    formatedNumValue = maxValue;
  }

  const formatedValue = roundNumber(formatedNumValue, decimalRound).toString();

  return decimalSeparatorToString(formatedValue);
};
