const firstCharLowerCase = require('../firstCharLowerCase');

module.exports = (sliceName) => `export const SLICE_NAME = '${firstCharLowerCase(sliceName)}';
`;
