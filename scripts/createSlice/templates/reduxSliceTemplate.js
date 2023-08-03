const firstCharUpperCase = require('../firstCharUpperCase');
const firstCharLowerCase = require('../firstCharLowerCase');

module.exports = (sliceName) => {
  const typeName = `${firstCharUpperCase(sliceName)}Schema`;

  return `import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ${typeName} } from '../types/${sliceName}Schema';

export const initialState: ${typeName} = {
    
};

export const SLICE_NAME = '${firstCharLowerCase(sliceName)}';

export const ${sliceName}Slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    template: (state, action: PayloadAction<string>) => {

    },
  },
});

export const {
  actions: ${sliceName}Actions,
  reducer: ${sliceName}Reducer,
} = ${sliceName}Slice;
`;
};
