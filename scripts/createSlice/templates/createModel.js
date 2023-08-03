/* eslint-disable no-console */
const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const reduxSliceTemplate = require('./reduxSliceTemplate');
const schemaTypeTemplate = require('./schemaTypeTemplate');
const selectorsTemplate = require('./selectorsTemplate');
const selectorsIndexTemplate = require('./selectorsIndexTemplate');
const firstCharLowerCase = require('../firstCharLowerCase');

module.exports = async (layer, sliceName) => {
  const resolveModelPath = (...segments) => (
    resolveRoot('src', layer, sliceName, 'model', ...segments)
  );

  const createModelStructure = async () => {
    try {
      await fs.mkdir(resolveModelPath());
      await fs.mkdir(resolveModelPath('types'));
      await fs.mkdir(resolveModelPath('slice'));
      await fs.mkdir(resolveModelPath('selectors'));
      await fs.mkdir(resolveModelPath('services'));
    } catch (e) {
      console.log(`Не удалось создать model сегмент для слайса ${sliceName}`, e);
    }
  };

  const createReduxSlice = async () => {
    try {
      await fs.writeFile(
        resolveModelPath('slice', `${firstCharLowerCase(sliceName)}Slice.ts`),
        reduxSliceTemplate(sliceName),
      );
    } catch (e) {
      console.log('Не удалось создать редакс слайс', e);
    }
  };

  const createSchemaType = async () => {
    try {
      await fs.writeFile(
        resolveModelPath('types', `${sliceName}Schema.ts`),
        schemaTypeTemplate(sliceName),
      );
    } catch (e) {
      console.log('Не удалось создать тип схемы стейта', e);
    }
  };

  const createSelectors = async () => {
    try {
      await fs.writeFile(
        resolveModelPath('selectors', 'selectors.ts'),
        selectorsTemplate(firstCharLowerCase(sliceName)),
      );
      await fs.writeFile(
        resolveModelPath('selectors', 'index.ts'),
        selectorsIndexTemplate(firstCharLowerCase(sliceName)),
      );
    } catch (e) {
      console.log('Не удалось создать тип схемы стейта', e);
    }
  };

  await createModelStructure();
  await createReduxSlice();
  await createSchemaType();
  await createSelectors();
};
