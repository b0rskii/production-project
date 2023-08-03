const createTemplate = require('./templates/createTemplate');

const layer = process.argv[2];
const sliceName = process.argv[3];

const layers = ['2_pages', '3_widgets', '4_features', '5_entities'];

if (!layer || !layers.includes(layer)) {
  throw new Error(`Укажите слой ${layers.join(' или ')}`);
}

if (!sliceName) {
  throw new Error('Укажите название слайса');
}

createTemplate(layer, sliceName);
