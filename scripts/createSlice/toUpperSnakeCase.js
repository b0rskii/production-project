module.exports = (str) => {
  const newStrArr = [];

  str.split('').forEach((char, i) => {
    if (i > 0 && char.toUpperCase() === char) {
      newStrArr.push('_');
    }

    newStrArr.push(char);
  });

  return newStrArr.join('').toUpperCase();
};
