import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { Input } from './Input';

export default {
  title: '6_shared/Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Input>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 'Some text',
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {
  value: 'Some text',
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
