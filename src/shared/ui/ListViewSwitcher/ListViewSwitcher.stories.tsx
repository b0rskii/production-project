import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/utils/theme';
import { ListViewSwitcher } from './ListViewSwitcher';

export default {
  title: 'entities/ListViewSwitcher',
  component: ListViewSwitcher,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ListViewSwitcher>;

const Template: ComponentStory<typeof ListViewSwitcher> = (args) => <ListViewSwitcher {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
