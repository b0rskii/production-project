// eslint-disable-next-line max-len
module.exports = (layer, componentName) => `import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { ${componentName} } from './${componentName}';

export default {
  title: '${layer}/${componentName}',
  component: ${componentName},
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ${componentName}>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ${componentName}> = (args) => <${componentName} {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
`;
