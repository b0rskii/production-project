import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph';
import { ObjValues } from '../src/6_shared/types/utils';

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

const FeatureTogglerName = {
  FUNCTION: 'toggleFeature',
  COMPONENT: 'ToggleFeature',
} as const;

type TFeatureTogglerName = ObjValues<typeof FeatureTogglerName>;

const project = new Project();

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

files.forEach((file) => {
  file.forEachDescendant((node: Node) => {
    replaceFunctionToggler(node);
    replaceComponentToggler(node);
  });
});

function replaceFunctionToggler(node: Node) {
  if (
    node.isKind(SyntaxKind.CallExpression) &&
    isFeatureToggler(node, FeatureTogglerName.FUNCTION)
  ) {
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

    const onFnReturnValue = onFnProperty
      ?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)
      ?.getBody()
      .getText();

    const offFnReturnValue = offFnProperty
      ?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)
      ?.getBody()
      .getText();

    if (featureStatus === 'on' && onFnReturnValue) {
      node.replaceWithText(onFnReturnValue);
      return;
    }

    if (offFnReturnValue) {
      node.replaceWithText(offFnReturnValue);
    }
  }
}

function replaceComponentToggler(node: Node) {
  if (
    node.isKind(SyntaxKind.JsxSelfClosingElement) &&
    isFeatureToggler(node, FeatureTogglerName.COMPONENT)
  ) {
    const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

    if (!attributes) return;

    const featureNameAttr = getAttributeByName(attributes, 'featureName');

    const name = featureNameAttr
      ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
      ?.getText()
      .slice(1, -1);

    if (featureName !== name) return;

    const onAttr = getAttributeByName(attributes, 'on');
    const offAttr = getAttributeByName(attributes, 'off');

    const onComponent = getComponent(onAttr);
    const offComponent = getComponent(offAttr);

    if (featureStatus === 'on' && onComponent) {
      node.replaceWithText(onComponent);
      return;
    }

    if (offComponent) {
      node.replaceWithText(offComponent);
    }
  }
}

function isFeatureToggler(node: Node, toggler: TFeatureTogglerName) {
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);
  return identifier?.getText() === toggler;
}

function getAttributeByName(jsxAttributes: JsxAttribute[], name: string) {
  return jsxAttributes.find((attr) => attr.getName() === name);
}

function getComponent(attr?: JsxAttribute) {
  const component = attr
    ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
    ?.getExpression()
    ?.getText();

  if (component && component.startsWith('(')) {
    return component.slice(1, -1);
  }

  return component;
}

project.save();
