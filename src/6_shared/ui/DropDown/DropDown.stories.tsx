import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '6_shared/config/storybook/ThemeDecorator';
import { Theme } from '6_shared/utils/theme';
import { DropDown } from './DropDown';

export default {
  title: '6_shared/DropDown',
  component: DropDown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DropDown>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof DropDown> = (args) => <DropDown {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
