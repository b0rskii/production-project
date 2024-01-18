import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { RepeatButton } from './RepeatButton';

export default {
  title: '6_shared/RepeatButton',
  component: RepeatButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RepeatButton>;

const Template: ComponentStory<typeof RepeatButton> = (args) => <RepeatButton {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
