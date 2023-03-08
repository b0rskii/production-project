import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/utils/theme';
import { Select } from './Select';

export default {
  title: 'shared/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Выбери',
  options: [
    { value: 'content 1', content: 'content 1' },
    { value: 'content 2', content: 'content 2' },
    { value: 'content 3', content: 'content 3' },
  ],
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  label: 'Выбери',
  options: [
    { value: 'content 1', content: 'content 1' },
    { value: 'content 2', content: 'content 2' },
    { value: 'content 3', content: 'content 3' },
  ],
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
