export const formatPrice = (value: string) => {
  const formatedValue = value.replace(/\D/g, '').replace(/^0/, '');

  const valueArray = formatedValue.split('').reverse();
  const valueArrayWithSpaces: string[] = [];

  valueArray.forEach((digit, i) => {
    const index = i + 1;

    valueArrayWithSpaces.push(digit);

    if (index % 3 === 0 && valueArray.length > index) {
      valueArrayWithSpaces.push(' ');
    }
  });

  return valueArrayWithSpaces.reverse().join('');
};
