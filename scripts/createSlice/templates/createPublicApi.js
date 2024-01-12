const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const firstCharUpperCase = require('../firstCharUpperCase');
const toUpperSnakeCase = require('../toUpperSnakeCase');

module.exports = async (layer, sliceName) => {
  const componentName = firstCharUpperCase(sliceName);
  const schemaName = `${sliceName}Schema`;

  try {
    await fs.writeFile(
      resolveRoot('src', layer, sliceName, 'index.ts'),
      `export { SLICE_NAME as ${toUpperSnakeCase(sliceName)}_SLICE } from './model/const';
export type { ${firstCharUpperCase(schemaName)} } from './model/types/${schemaName}';
export { ${componentName} } from './ui/${componentName}/${componentName}';
`,
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Не удалось создать PUBLIC API');
  }
};
