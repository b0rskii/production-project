import { getClassNames } from './getClassNames';

describe('getClassNames', () => {
  it('with one class', () => {
    expect(getClassNames('class')).toBe('class');
  });

  it('with additional classes', () => {
    expect(getClassNames('class', {}, ['add-class1', 'add-class2']))
      .toBe('class add-class1 add-class2');
  });

  it('with additional classes and true modes', () => {
    expect(getClassNames('class', { active: true, hidden: true }, ['add-class1', 'add-class2']))
      .toBe('class add-class1 add-class2 active hidden');
  });

  it('with additional classes and true and false modes', () => {
    expect(getClassNames('class', { active: true, hidden: false }, ['add-class1', 'add-class2']))
      .toBe('class add-class1 add-class2 active');
  });

  it('with additional classes and undefined mode', () => {
    expect(getClassNames('class', { active: undefined }, ['add-class1', 'add-class2']))
      .toBe('class add-class1 add-class2');
  });
});
