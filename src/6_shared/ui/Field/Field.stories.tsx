import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/6_shared/config/storybook/ThemeDecorator';
import { Theme } from '@/6_shared/utils/theme';
import { Field } from './Field';

export default {
  title: '6_shared/Field',
  component: Field,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = (args) => <Field {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  initialValue: 'initial value',
};

export const Outline = Template.bind({});
Outline.args = {
  initialValue: 'initial value',
  mode: 'outline',
};

export const FixedSize = Template.bind({});
FixedSize.args = {
  initialValue: 'initial value',
  isContentSize: false,
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithInitialValueDark = Template.bind({});
WithInitialValueDark.args = {
  initialValue: 'initial value',
};
WithInitialValueDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OutlineDark = Template.bind({});
OutlineDark.args = {
  initialValue: 'initial value',
  mode: 'outline',
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const FixedSizeDark = Template.bind({});
FixedSizeDark.args = {
  initialValue: 'initial value',
  isContentSize: false,
};
FixedSizeDark.decorators = [ThemeDecorator(Theme.DARK)];
