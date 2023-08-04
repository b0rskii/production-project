const firstCharLowerCase = require('../firstCharLowerCase');

module.exports = (sliceName) => {
  const typeName = `${sliceName}Schema`;
  const sliceNameCamelCase = firstCharLowerCase(sliceName);

  return `import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ${typeName} } from '../types/${sliceName}Schema';
import { SLICE_NAME } from '../const';

export const initialState: ${typeName} = {
    
};

export const ${sliceNameCamelCase}Slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    template: (state, action: PayloadAction<string>) => {

    },
  },
});

export const {
  actions: ${sliceNameCamelCase}Actions,
  reducer: ${sliceNameCamelCase}Reducer,
} = ${sliceNameCamelCase}Slice;
`;
};
