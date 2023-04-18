import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/utils/theme';
import { Code } from './Code';

export default {
  title: 'shared/Code',
  component: Code,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Default = Template.bind({});
Default.args = {
  code: 'import { ComponentStory, ComponentMeta } from \'@storybook/react\';\n'
  + 'import { ThemeDecorator } from \'shared/config/storybook/ThemeDecorator\';\n'
  + 'import { Theme } from \'shared/utils/theme\';\n'
  + 'import { Code } from \'./Code\';\n'
  + '\n'
  + 'export default {\n'
  + '  title: \'shared/Code\',\n'
  + '  component: Code,\n'
  + '  argTypes: {\n'
  + '    backgroundColor: { control: \'color\' },\n'
  + '  },\n'
  + '} as ComponentMeta<typeof Code>;\n'
  + '\n'
  + 'const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;\n',
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {
  code: 'import { ComponentStory, ComponentMeta } from \'@storybook/react\';\n'
  + 'import { ThemeDecorator } from \'shared/config/storybook/ThemeDecorator\';\n'
  + 'import { Theme } from \'shared/utils/theme\';\n'
  + 'import { Code } from \'./Code\';\n'
  + '\n'
  + 'export default {\n'
  + '  title: \'shared/Code\',\n'
  + '  component: Code,\n'
  + '  argTypes: {\n'
  + '    backgroundColor: { control: \'color\' },\n'
  + '  },\n'
  + '} as ComponentMeta<typeof Code>;\n'
  + '\n'
  + 'const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;\n',
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
