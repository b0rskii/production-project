export const decimalSeparatorToNumber = (value: string) =>
  value.replace(',', '.');
export const decimalSeparatorToString = (value: string) =>
  value.replace('.', ',');

export const roundNumber = (number: number, digits?: number) => {
  if (digits === undefined) return number;

  const multiple = 10 ** digits;
  const roundedNum = Math.round(number * multiple) / multiple;

  return roundedNum;
};
