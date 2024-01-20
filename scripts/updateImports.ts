import { Project } from 'ts-morph';

const layers = ['1_app', '2_pages', '3_widgets', '4_features', '5_entities', '6_shared'];

const project = new Project();

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

files.forEach((file) => {
  file.getImportDeclarations().forEach((importNode) => {
    const value = importNode.getModuleSpecifierValue();

    if (isNeedUpdate(value)) {
      importNode.setModuleSpecifier(`@/${value}`);
    }
  });
});

function isNeedUpdate(value: string) {
  return layers.some((layer) => value.startsWith(layer));
}

project.save();
