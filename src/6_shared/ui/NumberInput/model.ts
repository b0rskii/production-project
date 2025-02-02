import { useRef } from 'react';
import {
  decimalSeparatorToNumber,
  decimalSeparatorToString,
  roundNumber,
} from './utils';

type FormattedValueOnMountProps = {
  value: string;
  minValue: number;
  maxValue: number;
  decimalScale?: number;
};

export const useFormattedValueOnMount = ({
  value,
  minValue,
  maxValue,
  decimalScale,
}: FormattedValueOnMountProps) => {
  const isInitialRenderRef = useRef(true);

  if (isInitialRenderRef.current) {
    isInitialRenderRef.current = false;

    const numValue = Number(decimalSeparatorToNumber(value));

    if (numValue < minValue) {
      return decimalSeparatorToString(minValue.toString());
    }

    if (numValue > maxValue) {
      return decimalSeparatorToString(maxValue.toString());
    }

    return decimalSeparatorToString(
      roundNumber(numValue, decimalScale).toString(),
    );
  }

  return value;
};

type OnChangeFormatterProps = {
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
}: OnChangeFormatterProps) => {
  const newNumValue = Number(decimalSeparatorToNumber(newValue));
  const allowNegative = minValue < 0;

  // Если новое значение не число и не минус, оставляем текущее значение без изменений.
  // Если новое значение минус и отрицательные числа допустимы, возвращаем минус.
  if (Number.isNaN(newNumValue)) {
    return newValue === '-' && allowNegative ? '-' : currentValue;
  }

  // Если отрицательные значения недопустимы, блокируем их ввод.
  if (newNumValue < 0 && !allowNegative) {
    return currentValue;
  }

  // Автоматическая подстановка запятой при вводе X, если минимальное значение X,(...)
  if (!Number.isInteger(minValue)) {
    const integerStrMinValue = Math.trunc(minValue).toString();
    const integerStrMinValueWithSeparator = `${integerStrMinValue},`;

    if (
      newValue === integerStrMinValue &&
      currentValue !== integerStrMinValueWithSeparator
    ) {
      return integerStrMinValueWithSeparator;
    }
  }

  if (newNumValue >= maxValue) {
    return decimalSeparatorToString(maxValue.toString());
  }

  return decimalSeparatorToString(newValue);
};

type OnBlurFormatterProps = {
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
}: OnBlurFormatterProps) => {
  if (currentValue === '-' || currentValue === '') {
    return '';
  }

  const currentNumValue = Number(decimalSeparatorToNumber(currentValue));

  if (currentNumValue <= minValue) {
    return decimalSeparatorToString(minValue.toString());
  }

  if (currentNumValue >= maxValue) {
    return decimalSeparatorToString(maxValue.toString());
  }

  const formatedValue = roundNumber(currentNumValue, decimalScale).toString();
  return decimalSeparatorToString(formatedValue);
};
