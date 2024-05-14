import { Node, Project, SyntaxKind } from 'ts-morph';

const featureName = process.argv[2];
const featureStatus = process.argv[3];

if (!featureName) {
  throw new Error('Не передано название фичи');
}

if (!featureStatus) {
  throw new Error('Не передан статус фичи (on/off)');
}

if (featureStatus !== 'on' && featureStatus !== 'off') {
  throw new Error(
    'Передан некорректный статус фичи, допустимые значения: "on" или "off"'
  );
}

const project = new Project();

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

files.forEach((file) => {
  file.forEachDescendant((node: Node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFeatureFn(node)) {
      const objectOptions = node.getFirstDescendantByKind(
        SyntaxKind.ObjectLiteralExpression
      );

      if (!objectOptions) return;

      const nameProperty = objectOptions.getProperty('name');
      const onFnProperty = objectOptions.getProperty('on');
      const offFnProperty = objectOptions.getProperty('off');

      const name = nameProperty
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1);

      if (name !== featureName) {
        return;
      }

      const onFnReturnValue = getFunctionnReturnValue(
        onFnProperty
          ?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)
          ?.getBody()
      );
      const offFnReturnValue = getFunctionnReturnValue(
        offFnProperty
          ?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)
          ?.getBody()
      );

      if (featureStatus === 'on' && onFnReturnValue) {
        node.replaceWithText(onFnReturnValue);
        return;
      }

      if (offFnReturnValue) {
        node.replaceWithText(offFnReturnValue);
      }
    }
  });
});

function isToggleFeatureFn(node: Node) {
  let isTrue = false;

  node.forEachChild((childNode) => {
    if (
      childNode.isKind(SyntaxKind.Identifier) &&
      childNode.getText() === 'toggleFeature'
    ) {
      isTrue = true;
    }
  });

  return isTrue;
}

function getFunctionnReturnValue(fnBody?: Node): string | null {
  if (!fnBody) return null;

  const JSXElement = fnBody.getFirstDescendantByKind(
    SyntaxKind.JsxSelfClosingElement
  );

  if (JSXElement) {
    return JSXElement.getText();
  }

  return fnBody.getText();
}

project.save();
