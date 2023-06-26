import { addDecorator } from '@storybook/react';
import { StyleDecorator } from '../../src/6_shared/config/storybook/StyleDecorator';
import { ThemeDecorator } from '../../src/6_shared/config/storybook/ThemeDecorator';
import { RouterDecorator } from '../../src/6_shared/config/storybook/RouterDecorator';
import { Theme } from '../../src/6_shared/utils/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
