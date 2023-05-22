import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/utils/theme';
import { ListViewSwitcher } from './ListViewSwitcher';

export default {
  title: 'shared/ListViewSwitcher',
  component: ListViewSwitcher,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ListViewSwitcher>;

const Template: ComponentStory<typeof ListViewSwitcher> = (args) => <ListViewSwitcher {...args} />;

export const ListActive = Template.bind({});
ListActive.args = {
  activeControl: 'list',
};

export const TilesActive = Template.bind({});
TilesActive.args = {
  activeControl: 'tiles',
};

export const ListActiveDark = Template.bind({});
ListActiveDark.args = {
  activeControl: 'list',
};
ListActiveDark.decorators = [ThemeDecorator(Theme.DARK)];

export const TilesActiveDark = Template.bind({});
TilesActiveDark.args = {
  activeControl: 'tiles',
};
TilesActiveDark.decorators = [ThemeDecorator(Theme.DARK)];
