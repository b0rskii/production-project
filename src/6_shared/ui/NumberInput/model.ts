import { useRef } from 'react';
import {
  decimalSeparatorToNumber,
  decimalSeparatorToString,
  roundNumber,
} from './utils';

const getDisplayedValue = (value: string, commaDecimalSeparator: boolean) =>
  commaDecimalSeparator ? decimalSeparatorToString(value) : value;

type UseDisplayedValueProps = {
  value: string;
  minValue: number;
  maxValue: number;
  commaDecimalSeparator: boolean;
  decimalScale?: number;
};

export const useDisplayedValue = ({
  value,
  minValue,
  maxValue,
  commaDecimalSeparator,
  decimalScale,
}: UseDisplayedValueProps) => {
  const isInitialRenderRef = useRef(true);

  if (isInitialRenderRef.current) {
    isInitialRenderRef.current = false;

    const numValue = Number(decimalSeparatorToNumber(value));

    if (numValue < minValue) {
      return getDisplayedValue(minValue.toString(), commaDecimalSeparator);
    }

    if (numValue > maxValue) {
      return getDisplayedValue(maxValue.toString(), commaDecimalSeparator);
    }

    return getDisplayedValue(
      roundNumber(numValue, decimalScale).toString(),
      commaDecimalSeparator,
    );
  }

  return getDisplayedValue(value, commaDecimalSeparator);
};

type GetFormattedValueOnChangeProps = {
  newValue: string;
  currentValue: string;
  minValue: number;
  maxValue: number;
};

export const getFormattedValueOnChange = ({
  newValue,
  currentValue,
  minValue,
  maxValue,
}: GetFormattedValueOnChangeProps) => {
  const newNumValue = Number(decimalSeparatorToNumber(newValue));
  const allowNegative = minValue < 0;

  // Если новое значение не число и не минус, оставляем текущее значение без изменений.
  // Если новое значение минус и отрицательные числа допустимы, возвращаем минус.
  if (Number.isNaN(newNumValue)) {
    return newValue === '-' && allowNegative
      ? '-'
      : decimalSeparatorToNumber(currentValue);
  }

  // Если отрицательные значения недопустимы, блокируем их ввод.
  if (newNumValue < 0 && !allowNegative) {
    return decimalSeparatorToNumber(currentValue);
  }

  // Автоматическая подстановка запятой при вводе X, если минимальное значение X,(...)
  if (!Number.isInteger(minValue)) {
    const integerStrMinValue = Math.trunc(minValue).toString();
    const integerStrMinValueWithSeparator = `${integerStrMinValue}.`;

    if (
      newValue === integerStrMinValue &&
      currentValue !== integerStrMinValueWithSeparator
    ) {
      return integerStrMinValueWithSeparator;
    }
  }

  if (newNumValue >= maxValue) {
    return maxValue.toString();
  }

  return decimalSeparatorToNumber(newValue);
};

type GetFormattedValueOnBlurProps = {
  currentValue: string;
  minValue: number;
  maxValue: number;
  decimalScale?: number;
};

export const getFormattedValueOnBlur = ({
  currentValue,
  minValue,
  maxValue,
  decimalScale,
}: GetFormattedValueOnBlurProps) => {
  if (currentValue === '-' || currentValue === '') {
    return '';
  }

  const currentNumValue = Number(decimalSeparatorToNumber(currentValue));

  if (currentNumValue <= minValue) {
    return minValue.toString();
  }

  if (currentNumValue >= maxValue) {
    return maxValue.toString();
  }

  const formatedValue = roundNumber(currentNumValue, decimalScale).toString();
  return decimalSeparatorToNumber(formatedValue);
};
