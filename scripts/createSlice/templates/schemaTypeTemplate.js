const firstCharUpperCase = require('../firstCharUpperCase');

module.exports = (sliceName) => `export type ${firstCharUpperCase(sliceName)}Schema = {
    
};
`;
