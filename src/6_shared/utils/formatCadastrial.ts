let prevValue = '';

export const formatCadastrial = (value: string) => {
  const currentValue = value.replace(/[^0-9:]/, '');

  let formatedValue = null;

  if (currentValue.length === 2 && currentValue.length > prevValue.length) {
    formatedValue = `${currentValue}:`;
  }

  if (currentValue.length === 5 && currentValue.length > prevValue.length) {
    formatedValue = `${currentValue}:`;
  }

  if (!formatedValue) {
    formatedValue = currentValue;
  }

  prevValue = currentValue;

  return formatedValue;
};
